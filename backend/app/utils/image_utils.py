import base64
import cv2
import numpy as np

def base64_to_bytes(base64_string: str) -> bytes:
    """Converts a Base64 string to bytes."""
    if "base64," in base64_string:
        base64_string = base64_string.split("base64,")[1]
    return base64.b64decode(base64_string)

def bytes_to_base64(image_bytes: bytes, format: str = "png") -> str:
    """Converts image bytes to a Base64 string."""
    encoded_string = base64.b64encode(image_bytes).decode('utf-8')
    return f"data:image/{format};base64,{encoded_string}"

def numpy_to_base64(image_np: np.ndarray, format: str = ".png") -> str:
    """Converts a numpy array image (like a mask) to a Base64 string."""
    _, buffer = cv2.imencode(format, image_np)
    return bytes_to_base64(buffer.tobytes(), format=format.replace(".", ""))
