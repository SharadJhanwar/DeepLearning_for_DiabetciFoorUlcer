# DFU Image Segmentation using U-Net (ResNet34)

This directory contains the implementation of a Diabetic Foot Ulcer (DFU) image segmentation model built using the `segmentation-models-pytorch` library. The model is based on the **U-Net** architecture with a **ResNet34** encoder.

## Overview

Diabetic Foot Ulcer (DFU) segmentation is a critical task for identifying and measuring ulcerous regions in patient images. This model was trained on the **DFUC2022** dataset to provide accurate segmentation masks.

### Model Architecture
- **Architecture**: U-Net
- **Encoder**: ResNet34 (pre-trained on ImageNet)
- **Loss Function**: Dice Loss
- **Optimizer**: Adam

## Training Summary

The model was trained for **20 epochs** on the DFUC2022 dataset. Training and validation performance were monitored using Dice Loss, Dice Score, and IoU (Intersection over Union).

### Performance Metrics (Approximate)
Based on the training curves:
- **Best Validation Dice Score**: ~0.725
- **Best Validation IoU Score**: ~0.625
- **Final Validation Loss**: ~0.24
- **Final Training Loss**: ~0.16

Refer to the training curves visualization below for more details:

![Training Curves](file:///c:/Users/yx084/OneDrive/Desktop/DFU_OTHER/models/ImageSegmentation/UNet/curve.jpeg)

## File Structure

- `dfu-segmenatation.ipynb`: Jupyter notebook used for data preprocessing, training, and evaluation.
- `best_model.pth`: Saved model weights from the best training epoch.
- `inference.py`: Python script for running inference on new DFU images.
- `curve.jpeg`: Visualization of training and validation loss/metrics.
- `sample.jpg`: A sample input image for testing.
- `output_combined.png`: Sample prediction results showing the original image and the predicted mask.

## Usage

### Inference
To run segmentation on a sample image:
```bash
python inference.py