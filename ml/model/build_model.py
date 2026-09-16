"""
GrainVision AI — Model Architecture Builder
Phase 4: Deep Learning Model Architecture

Constructs, compiles, and configures the MobileNetV2 Transfer Learning
classification model for 5-class rice grain quality classification.
"""

import io
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models, optimizers

from ml.model.model_config import (
    MODEL_NAME,
    BASE_MODEL_NAME,
    PRETRAINED_WEIGHTS,
    INPUT_SHAPE,
    NUM_CLASSES,
    FREEZE_BACKBONE,
    DENSE_UNITS,
    DENSE_ACTIVATION,
    USE_BATCH_NORM,
    DROPOUT_RATE,
    FINAL_ACTIVATION,
    LEARNING_RATE,
    OPTIMIZER_NAME,
    LOSS_FUNCTION,
    METRICS,
)

def build_rice_classifier(
    input_shape=INPUT_SHAPE,
    num_classes=NUM_CLASSES,
    freeze_backbone=FREEZE_BACKBONE,
    learning_rate=LEARNING_RATE,
    dropout_rate=DROPOUT_RATE,
    dense_units=DENSE_UNITS,
    compile_model=True
):
    """
    Constructs and compiles the MobileNetV2 transfer-learning model.

    Architecture:
    Input (224x224x3)
      ↓
    MobileNetV2 Base (Pre-trained on ImageNet, Frozen by default)
      ↓
    GlobalAveragePooling2D
      ↓
    BatchNormalization (Optional regularization)
      ↓
    Dense (256 units, ReLU activation)
      ↓
    Dropout (0.3 rate)
      ↓
    Dense Output (5 units, Softmax activation)

    Args:
        input_shape (tuple): RGB image tensor dimensions (224, 224, 3).
        num_classes (int): Number of target rice classes (5).
        freeze_backbone (bool): If True, freezes MobileNetV2 base weights.
        learning_rate (float): Adam optimizer learning rate (0.001).
        dropout_rate (float): Dropout fraction (0.3).
        dense_units (int): Neurons in intermediate classification head layer.
        compile_model (bool): Whether to compile model with loss & optimizer.

    Returns:
        tf.keras.Model: Configured classification model.
    """
    # 1. Instantiate ImageNet pre-trained MobileNetV2 backbone without top classification head
    base_model = MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights=PRETRAINED_WEIGHTS
    )
    base_model._name = "mobilenetv2_backbone"

    # 2. Configure initial transfer-learning freezing strategy
    base_model.trainable = not freeze_backbone

    # 3. Construct Keras Functional API model
    inputs = layers.Input(shape=input_shape, name="image_input")
    
    # Feature extraction through pre-trained backbone
    x = base_model(inputs, training=False)
    
    # Global spatial average pooling over feature maps
    x = layers.GlobalAveragePooling2D(name="global_avg_pool")(x)
    
    # Feature scaling and normalization
    if USE_BATCH_NORM:
        x = layers.BatchNormalization(name="batch_norm")(x)
    
    # Intermediate dense feature layer
    x = layers.Dense(dense_units, activation=DENSE_ACTIVATION, name="dense_feature_head")(x)
    
    # Regularization via dropout
    x = layers.Dropout(dropout_rate, name="dropout_head")(x)
    
    # Final 5-class probability distribution
    outputs = layers.Dense(num_classes, activation=FINAL_ACTIVATION, name="classification_head")(x)

    model = models.Model(inputs=inputs, outputs=outputs, name=MODEL_NAME)

    # 4. Compile model for Phase 5 training readiness
    if compile_model:
        optimizer = optimizers.Adam(learning_rate=learning_rate)
        model.compile(
            optimizer=optimizer,
            loss=LOSS_FUNCTION,
            metrics=METRICS
        )

    return model

def get_model_summary_str(model):
    """
    Returns string summary representation of Keras model.
    """
    stream = io.StringIO()
    model.summary(print_fn=lambda x: stream.write(x + "\n"))
    return stream.getvalue()
