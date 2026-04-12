import cv2
import torch
import numpy as np
import matplotlib.pyplot as plt
import segmentation_models_pytorch as smp
import albumentations as A
from albumentations.pytorch import ToTensorV2
import os



# CONFIG
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "best_model.pth")

# TRANSFORM (same as val/test)
transform = A.Compose([
    A.Resize(256, 256),
    A.Normalize(mean=(0.485, 0.456, 0.406),
                std=(0.229, 0.224, 0.225)),
    ToTensorV2(),
])

# LOAD MODEL
def load_model():
    model = smp.Unet(
        encoder_name="resnet34",
        encoder_weights=None,   # weights already saved
        in_channels=3,
        classes=1,
        activation=None
    )

    model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    model.to(DEVICE)
    model.eval()

    return model

# PREDICT FUNCTION
def predict_image(model, image_path, threshold=0.5, alpha=0.5):
    # Load image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image not found: {image_path}")

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    original = image.copy()

    # Preprocess
    augmented = transform(image=image)
    image_tensor = augmented['image'].unsqueeze(0).to(DEVICE)

    # Inference
    with torch.no_grad():
        output = model(image_tensor)
        pred = torch.sigmoid(output)
        pred = (pred > threshold).float()

    # Convert mask
    mask = pred.squeeze().cpu().numpy()
    mask = cv2.resize(mask, (original.shape[1], original.shape[0]))

    # Overlay
    overlay = original.copy()
    overlay[mask > 0] = [0, 255, 255]  # cyan

    blended = cv2.addWeighted(original, 1 - alpha, overlay, alpha, 0)

    return original, mask, blended

# VISUALIZE
def show_results(original, mask, overlay):
    plt.figure(figsize=(15,5))

    plt.subplot(1,3,1)
    plt.imshow(original)
    plt.title("Original")
    plt.axis("off")

    plt.subplot(1,3,2)
    plt.imshow(mask, cmap='gray')
    plt.title("Predicted Mask")
    plt.axis("off")

    plt.subplot(1,3,3)
    plt.imshow(overlay)
    plt.title("Overlay")
    plt.axis("off")

    plt.tight_layout()
    plt.show()

def save_combined(original, mask, overlay, save_path):
    # Convert mask to 3-channel
    mask_uint8 = (mask * 255).astype(np.uint8)
    mask_rgb = cv2.cvtColor(mask_uint8, cv2.COLOR_GRAY2RGB)

    # Resize everything to same size (safety)
    h, w = original.shape[:2]
    mask_rgb = cv2.resize(mask_rgb, (w, h))
    overlay = cv2.resize(overlay, (w, h))

    # 🔥 Add labels
    cv2.putText(original, "Original", (10,30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv2.putText(mask_rgb, "Mask", (10,30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv2.putText(overlay, "Overlay", (10,30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)

    # Combine horizontally
    combined = np.hstack((original, mask_rgb, overlay))

    # Save (RGB → BGR)
    cv2.imwrite(save_path, cv2.cvtColor(combined, cv2.COLOR_RGB2BGR))


# MAIN (example usage)
if __name__ == "__main__":
    model = load_model()

    image_path = os.path.join(BASE_DIR, "sample.jpg")

    original, mask, overlay = predict_image(model, image_path)

    # Show results
    show_results(original, mask, overlay)

    # Save combined output
    save_path = os.path.join(BASE_DIR, "output_combined.png")
    save_combined(original, mask, overlay, save_path)

    print(f"✅ Combined output saved at: {save_path}")