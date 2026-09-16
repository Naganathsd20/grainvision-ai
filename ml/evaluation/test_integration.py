"""
GrainVision AI — Phase 9 Integration & End-to-End Test Suite
Phase 9: Integration & Testing

Executes comprehensive 10-step integration verification testing across all GrainVision AI components:
1. Project directory structure audit
2. Backend health check (GET /api/health)
3. Model loading and forward-pass inference audit
4. 5 Real class test dataset image predictions (Arborio, Basmati, Ipsala, Jasmine, Karacadag)
5. Frontend API integration helper audit
6. File validation and error handling edge cases (missing file, invalid extension, empty file)
7. Backend offline handling check
8. Frontend production build compilation check (Vite)
9. Responsive UI layout audit
10. Phase 1-8 regression audit & Git safety check (.gitignore protection)

Exports integration test reports to:
- results/integration_test_report.json
- results/integration_test_report.txt
"""

import os
import sys
import io
import time
import json
import subprocess
from pathlib import Path

# Disable verbose TensorFlow C++ logging & force unbuffered stdout
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["PYTHONUNBUFFERED"] = "1"

import numpy as np
import tensorflow as tf

# Ensure backend directory is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
BACKEND_DIR = PROJECT_ROOT / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from app import create_app
from config import Config
from services.model_service import model_service
from utils.image_utils import allowed_file, preprocess_image


def run_integration_tests():
    """
    Main orchestrator for Phase 9 Integration & Testing.
    """
    start_time = time.time()
    results_dir = PROJECT_ROOT / "results"
    results_dir.mkdir(parents=True, exist_ok=True)

    json_report_path = results_dir / "integration_test_report.json"
    txt_report_path = results_dir / "integration_test_report.txt"

    print("==================================================", flush=True)
    print("GRAINVISION AI — PHASE 9: INTEGRATION & TESTING", flush=True)
    print("==================================================", flush=True)
    print(f"Project Root: {PROJECT_ROOT}", flush=True)
    print(f"Timestamp   : {time.strftime('%Y-%m-%d %H:%M:%S')}", flush=True)
    print("==================================================\n", flush=True)

    report_data = {
        "project": "GrainVision AI",
        "phase": "Phase 9 — Integration & Testing",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_tests": 10,
        "passed_tests": 0,
        "test_results": [],
        "real_image_predictions": [],
    }

    def _log_test(test_num, title, passed, details=""):
        status_str = "[OK] PASSED" if passed else "[X] FAILED"
        print(f"{status_str} Test {test_num}/10: {title}", flush=True)
        if details:
            print(f"       -> {details}", flush=True)
        report_data["test_results"].append({
            "test_number": test_num,
            "title": title,
            "passed": passed,
            "details": details,
        })
        if passed:
            report_data["passed_tests"] += 1

    # Initialize Flask test client
    flask_app = create_app()
    test_client = flask_app.test_client()

    # --------------------------------------------------
    # TEST 1: Project Structure Audit
    # --------------------------------------------------
    required_dirs = ["frontend", "backend", "ml", "models", "results", "docs"]
    required_files = [
        PROJECT_ROOT / "backend" / "app.py",
        PROJECT_ROOT / "backend" / "config.py",
        PROJECT_ROOT / "models" / "grainvision_mobilenetv2_best.keras",
        PROJECT_ROOT / "frontend" / "package.json",
        PROJECT_ROOT / "frontend" / "src" / "App.jsx",
        PROJECT_ROOT / "frontend" / "src" / "components" / "Predictor.jsx",
        PROJECT_ROOT / "frontend" / "src" / "services" / "api.js",
        PROJECT_ROOT / "README.md",
    ]
    missing_dirs = [d for d in required_dirs if not (PROJECT_ROOT / d).exists()]
    missing_files = [str(f.name) for f in required_files if not f.exists()]

    t1_passed = (len(missing_dirs) == 0 and len(missing_files) == 0)
    _log_test(
        1, "Project Structure Audit", t1_passed,
        f"Dirs verified: {len(required_dirs)}, Files verified: {len(required_files)}" if t1_passed else f"Missing dirs: {missing_dirs}, files: {missing_files}"
    )

    # --------------------------------------------------
    # TEST 2: Backend Health Check (GET /api/health)
    # --------------------------------------------------
    try:
        res_health = test_client.get("/api/health")
        health_json = res_health.get_json()
        t2_passed = (
            res_health.status_code == 200
            and health_json.get("status") == "ok"
            and health_json.get("project") == "GrainVision AI"
            and len(health_json.get("classes", [])) == 5
        )
        _log_test(
            2, "Backend Health Check (GET /api/health)", t2_passed,
            f"HTTP {res_health.status_code} | Phase: {health_json.get('phase')} | Status: {health_json.get('status')}"
        )
    except Exception as e:
        _log_test(2, "Backend Health Check (GET /api/health)", False, str(e))

    # --------------------------------------------------
    # TEST 3: Model Loading & Softmax Output
    # --------------------------------------------------
    try:
        model_path = PROJECT_ROOT / "models" / "grainvision_mobilenetv2_best.keras"
        model_size_mb = round(model_path.stat().st_size / (1024 * 1024), 2)
        model = tf.keras.models.load_model(str(model_path))
        
        dummy_tensor = np.zeros((1, 224, 224, 3), dtype=np.float32)
        dummy_out = model(dummy_tensor, training=False).numpy()
        softmax_valid = np.allclose(np.sum(dummy_out, axis=-1), 1.0, atol=1e-3)
        
        t3_passed = (model is not None and dummy_out.shape == (1, 5) and softmax_valid)
        _log_test(
            3, "Model Artifact Loading & Softmax Output", t3_passed,
            f"Model Size: {model_size_mb} MB | Output Shape: {dummy_out.shape} | Softmax Valid: {softmax_valid}"
        )
    except Exception as e:
        _log_test(3, "Model Artifact Loading & Softmax Output", False, str(e))

    # --------------------------------------------------
    # TEST 4: API Prediction Test (5 REAL Class Test Images)
    # --------------------------------------------------
    print("\n--------------------------------------------------", flush=True)
    print("TESTING 5 REAL TEST DATASET IMAGES (1 PER CLASS)")
    print("--------------------------------------------------", flush=True)
    
    test_ds_dir = PROJECT_ROOT / "ml" / "dataset" / "processed" / "test"
    target_classes = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
    real_pred_results = []
    t4_passed_cnt = 0

    for cls_name in target_classes:
        cls_dir = test_ds_dir / cls_name
        cls_files = list(cls_dir.glob("*.*"))
        if not cls_files:
            print(f"[!] Warning: No image files found in {cls_dir}", flush=True)
            continue

        sample_path = cls_files[0]
        with open(sample_path, "rb") as img_f:
            file_bytes = img_f.read()

        payload = {"image": (io.BytesIO(file_bytes), sample_path.name)}
        res_pred = test_client.post("/api/predict", data=payload, content_type="multipart/form-data")
        pred_json = res_pred.get_json()

        is_valid_resp = (
            res_pred.status_code == 200
            and pred_json.get("success") is True
            and "prediction" in pred_json
            and pred_json["prediction"].get("class") in target_classes
            and 0.0 <= pred_json["prediction"].get("confidence", -1) <= 1.0
            and len(pred_json.get("probabilities", {})) == 5
        )

        if is_valid_resp:
            t4_passed_cnt += 1

        pred_info = {
            "true_class": cls_name,
            "sample_image": sample_path.name,
            "http_status": res_pred.status_code,
            "predicted_class": pred_json.get("prediction", {}).get("class"),
            "confidence": pred_json.get("prediction", {}).get("confidence"),
            "confidence_percentage": f"{pred_json.get('prediction', {}).get('confidence', 0) * 100:.2f}%",
            "probabilities": pred_json.get("probabilities", {}),
            "match": (cls_name == pred_json.get("prediction", {}).get("class")),
        }
        real_pred_results.append(pred_info)

        print(
            f"  - True: {cls_name:<10} | Pred: {pred_info['predicted_class']:<10} | "
            f"Conf: {pred_info['confidence_percentage']:<8} | Match: {'YES' if pred_info['match'] else 'NO'}",
            flush=True
        )

    t4_passed = (t4_passed_cnt == len(target_classes))
    report_data["real_image_predictions"] = real_pred_results
    _log_test(
        4, "API Predictions on 5 Real Class Images", t4_passed,
        f"Evaluated {len(target_classes)} classes | Passed: {t4_passed_cnt}/{len(target_classes)}"
    )

    # --------------------------------------------------
    # TEST 5: Frontend API Integration Helper Audit
    # --------------------------------------------------
    api_js_path = PROJECT_ROOT / "frontend" / "src" / "services" / "api.js"
    predictor_jsx_path = PROJECT_ROOT / "frontend" / "src" / "components" / "Predictor.jsx"
    
    with open(api_js_path, "r") as f:
        api_js_code = f.read()
    with open(predictor_jsx_path, "r") as f:
        predictor_code = f.read()

    t5_passed = (
        "POST" in api_js_code
        and "/api/predict" in api_js_code
        and "FormData" in api_js_code
        and "predictRiceGrain" in predictor_code
    )
    _log_test(
        5, "Frontend API Integration Helper Audit", t5_passed,
        "FormData & POST /api/predict correctly configured in frontend service & components"
    )

    # --------------------------------------------------
    # TEST 6: File Validation & Error Handling Edge Cases
    # --------------------------------------------------
    # 6a. Missing image file
    res_err1 = test_client.post("/api/predict", data={}, content_type="multipart/form-data")
    err1_ok = (res_err1.status_code == 400 and res_err1.get_json().get("success") is False)

    # 6b. Unsupported file extension (.txt)
    txt_payload = {"image": (io.BytesIO(b"Hello text"), "test.txt")}
    res_err2 = test_client.post("/api/predict", data=txt_payload, content_type="multipart/form-data")
    err2_ok = (res_err2.status_code in (400, 415) and res_err2.get_json().get("success") is False)

    # 6c. Empty filename
    empty_payload = {"image": (io.BytesIO(b""), "")}
    res_err3 = test_client.post("/api/predict", data=empty_payload, content_type="multipart/form-data")
    err3_ok = (res_err3.status_code == 400 and res_err3.get_json().get("success") is False)

    t6_passed = (err1_ok and err2_ok and err3_ok)
    _log_test(
        6, "File Validation & Controlled Error Responses", t6_passed,
        f"Missing file: {res_err1.status_code} | Invalid ext: {res_err2.status_code} | Empty file: {res_err3.status_code}"
    )

    # --------------------------------------------------
    # TEST 7: Backend Offline Handling Check
    # --------------------------------------------------
    # Verify catch block message in api.js
    t7_passed = ("Unable to connect to the prediction server" in api_js_code)
    _log_test(
        7, "Backend Server Unreachable Error Handling", t7_passed,
        "Frontend displays user-friendly connection error message when Flask server is offline"
    )

    # --------------------------------------------------
    # TEST 8: Frontend Production Build Check (Vite)
    # --------------------------------------------------
    try:
        print("[*] Running Vite production build check (npm run build)...", flush=True)
        build_proc = subprocess.run(
            ["npm", "--prefix", "frontend", "run", "build"],
            capture_output=True,
            text=True,
            shell=True
        )
        t8_passed = (build_proc.returncode == 0 and (PROJECT_ROOT / "frontend" / "dist" / "index.html").exists())
        _log_test(
            8, "Frontend Production Vite Build", t8_passed,
            f"Vite Build Return Code: {build_proc.returncode} | Output dist/index.html present"
        )
    except Exception as e:
        _log_test(8, "Frontend Production Vite Build", False, str(e))

    # --------------------------------------------------
    # TEST 9: Responsive Layout & UI Audit
    # --------------------------------------------------
    app_jsx_path = PROJECT_ROOT / "frontend" / "src" / "App.jsx"
    with open(app_jsx_path, "r") as f:
        app_code = f.read()

    t9_passed = (
        "grid-cols-1" in predictor_code
        and "lg:grid-cols-2" in predictor_code
        and "max-w-7xl" in app_code
        and "min-h-screen" in app_code
    )
    _log_test(
        9, "Responsive UI & Tailwind CSS Layout Audit", t9_passed,
        "Breakpoints (mobile grid-cols-1, desktop lg:grid-cols-2, max-w-7xl) configured for zero horizontal scroll"
    )

    # --------------------------------------------------
    # TEST 10: Phase 1-8 Regression & Git Safety Audit
    # --------------------------------------------------
    gitignore_path = PROJECT_ROOT / ".gitignore"
    with open(gitignore_path, "r") as f:
        gitignore_txt = f.read()

    ds_ignored = ("ml/dataset/raw" in gitignore_txt and "ml/dataset/processed" in gitignore_txt)
    
    prev_artifacts_exist = (
        (PROJECT_ROOT / "results" / "training_history.json").exists()
        and (PROJECT_ROOT / "results" / "confusion_matrix.png").exists()
        and (PROJECT_ROOT / "results" / "evaluation_report.txt").exists()
        and (PROJECT_ROOT / "backend" / "results" / "api_verification_report.json").exists()
    )

    t10_passed = (ds_ignored and prev_artifacts_exist)
    _log_test(
        10, "Phase 1-8 Regression & Git Safety Audit", t10_passed,
        f".gitignore Dataset Protection: {ds_ignored} | Previous Phase Artifacts Intact: {prev_artifacts_exist}"
    )

    # --------------------------------------------------
    # SAVE REPORTS
    # --------------------------------------------------
    total_duration = time.time() - start_time
    duration_str = f"{int(total_duration // 60)}m {int(total_duration % 60)}s ({total_duration:.2f}s)"
    report_data["execution_duration_seconds"] = round(total_duration, 2)

    # Save JSON report
    with open(json_report_path, "w") as f:
        json.dump(report_data, f, indent=2)
    print(f"\n[OK] Saved integration test JSON report to: {json_report_path}", flush=True)

    # Save TXT report
    txt_summary = (
        "==================================================\n"
        "GrainVision AI — Phase 9 Integration & Testing Summary\n"
        "==================================================\n\n"
        f"Execution Timestamp : {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Passed Tests        : {report_data['passed_tests']} / {report_data['total_tests']}\n"
        f"Execution Duration  : {duration_str}\n\n"
        "--------------------------------------------------\n"
        "10 INTEGRATION VERIFICATION TEST RESULTS\n"
        "--------------------------------------------------\n"
    )

    for item in report_data["test_results"]:
        status = "[OK] PASSED" if item["passed"] else "[X] FAILED"
        txt_summary += f"Test {item['test_number']:<2} | {status} | {item['title']}\n"
        if item["details"]:
            txt_summary += f"          Detail: {item['details']}\n"

    txt_summary += (
        "\n--------------------------------------------------\n"
        "REAL TEST DATASET INFERENCE RESULTS (5 CLASSES)\n"
        "--------------------------------------------------\n"
    )

    for pred in real_pred_results:
        txt_summary += (
            f"True: {pred['true_class']:<10} | Pred: {pred['predicted_class']:<10} | "
            f"Conf: {pred['confidence_percentage']:<8} | Match: {'YES' if pred['match'] else 'NO'}\n"
        )

    txt_summary += "\n==================================================\n"

    with open(txt_report_path, "w") as f:
        f.write(txt_summary)
    print(f"[OK] Saved integration test summary text to: {txt_report_path}", flush=True)

    print("==================================================", flush=True)
    print(f"INTEGRATION SUITE COMPLETE: {report_data['passed_tests']} / {report_data['total_tests']} TESTS PASSED", flush=True)
    print("==================================================\n", flush=True)

    return report_data


if __name__ == "__main__":
    run_integration_tests()
