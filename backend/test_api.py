"""
GrainVision AI — Backend API Test Suite
Phase 7: Backend & Prediction API

Executes automated verification testing on Flask REST endpoints using the Flask test client:
1. GET /api/health endpoint status check
2. POST /api/predict with real test image from dataset
3. POST /api/predict without image file error handling
4. POST /api/predict with unsupported file format error handling
Exports audit results to backend/results/api_verification_report.json.
"""

import os
import sys
import io
import json
import time
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app import create_app
from config import Config
from services.model_service import model_service


def run_api_tests():
    """
    Runs automated Flask REST API test suite.
    """
    print("==================================================")
    print("GRAINVISION AI — PHASE 7: API VERIFICATION SUITE")
    print("==================================================")

    app = create_app()
    client = app.test_client()

    results = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "phase": Config.CURRENT_PHASE,
        "passed_tests": 0,
        "total_tests": 4,
        "tests": [],
    }

    # Find a real test image from ml/dataset/processed/test/Arborio
    project_root = Path(__file__).resolve().parents[1]
    test_img_dir = project_root / "ml" / "dataset" / "processed" / "test" / "Arborio"
    sample_images = list(test_img_dir.glob("*.*"))

    if not sample_images:
        sample_img_path = None
        print(f"[!] Warning: Sample test image directory empty: {test_img_dir}")
    else:
        sample_img_path = sample_images[0]
        print(f"[*] Using real test image: {sample_img_path}")

    print("==================================================\n")

    # Test 1: GET /api/health
    print("[1/4] Testing GET /api/health...")
    res1 = client.get("/api/health")
    data1 = res1.get_json()
    status1 = (res1.status_code == 200 and data1.get("status") == "ok")
    print(f"      HTTP Status: {res1.status_code}")
    print(f"      Payload    : {data1}")
    results["tests"].append({
        "test_name": "GET /api/health",
        "status_code": res1.status_code,
        "passed": status1,
        "response": data1,
    })
    if status1:
        results["passed_tests"] += 1
    print(f"      Result     : {'[OK] PASSED' if status1 else '[FAILED] FAIL'}\n")

    # Test 2: POST /api/predict with REAL image
    print("[2/4] Testing POST /api/predict with real image payload...")
    if sample_img_path and sample_img_path.exists():
        with open(sample_img_path, "rb") as f:
            img_bytes = f.read()

        data_payload = {
            "image": (io.BytesIO(img_bytes), sample_img_path.name)
        }
        res2 = client.post("/api/predict", data=data_payload, content_type="multipart/form-data")
        data2 = res2.get_json()
        
        has_pred = (
            res2.status_code == 200
            and data2.get("success") is True
            and "prediction" in data2
            and data2["prediction"].get("class") in Config.RICE_CLASSES
            and isinstance(data2["prediction"].get("confidence"), float)
            and len(data2.get("probabilities", {})) == 5
        )
        print(f"      HTTP Status  : {res2.status_code}")
        print(f"      Predicted    : {data2.get('prediction')}")
        print(f"      Probabilities: {data2.get('probabilities')}")
        results["tests"].append({
            "test_name": "POST /api/predict (Valid Real Image)",
            "status_code": res2.status_code,
            "passed": has_pred,
            "test_image_used": str(sample_img_path),
            "response": data2,
        })
        if has_pred:
            results["passed_tests"] += 1
        print(f"      Result       : {'[OK] PASSED' if has_pred else '[FAILED] FAIL'}\n")
    else:
        results["tests"].append({
            "test_name": "POST /api/predict (Valid Real Image)",
            "passed": False,
            "error": "Sample test image not found",
        })
        print("      Result       : [FAILED] Sample image missing\n")

    # Test 3: POST /api/predict without image file
    print("[3/4] Testing POST /api/predict without image file (Error Handling)...")
    res3 = client.post("/api/predict", data={}, content_type="multipart/form-data")
    data3 = res3.get_json()
    status3 = (res3.status_code == 400 and data3.get("success") is False and "error" in data3)
    print(f"      HTTP Status: {res3.status_code}")
    print(f"      Error MSG  : {data3.get('error')}")
    results["tests"].append({
        "test_name": "POST /api/predict (Missing Image Error)",
        "status_code": res3.status_code,
        "passed": status3,
        "response": data3,
    })
    if status3:
        results["passed_tests"] += 1
    print(f"      Result     : {'[OK] PASSED' if status3 else '[FAILED] FAIL'}\n")

    # Test 4: POST /api/predict with unsupported file format (.txt)
    print("[4/4] Testing POST /api/predict with invalid file format (.txt)...")
    invalid_payload = {
        "image": (io.BytesIO(b"Not an image file contents"), "invalid_file.txt")
    }
    res4 = client.post("/api/predict", data=invalid_payload, content_type="multipart/form-data")
    data4 = res4.get_json()
    status4 = (res4.status_code in (400, 415) and data4.get("success") is False and "error" in data4)
    print(f"      HTTP Status: {res4.status_code}")
    print(f"      Error MSG  : {data4.get('error')}")
    results["tests"].append({
        "test_name": "POST /api/predict (Unsupported Format Error)",
        "status_code": res4.status_code,
        "passed": status4,
        "response": data4,
    })
    if status4:
        results["passed_tests"] += 1
    print(f"      Result     : {'[OK] PASSED' if status4 else '[FAILED] FAIL'}\n")

    # Save API verification report
    results_dir = backend_dir / "results"
    results_dir.mkdir(parents=True, exist_ok=True)
    report_file = results_dir / "api_verification_report.json"

    with open(report_file, "w") as f:
        json.dump(results, f, indent=2)

    print("--------------------------------------------------")
    print(f"TEST SUMMARY: {results['passed_tests']} / {results['total_tests']} API Tests Passed")
    print(f"Report Saved : {report_file}")
    print("==================================================\n")

    return results


if __name__ == "__main__":
    run_api_tests()
