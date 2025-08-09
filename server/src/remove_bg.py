import sys
import requests
from rembg import remove
from PIL import Image
from io import BytesIO
import os

# Function to load image from URL
def load_image_from_url(url: str) -> Image.Image:
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        return Image.open(BytesIO(response.content))
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image from URL: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) != 3:
        print("Usage: python remove_bg.py <image_url> <output_path>")
        sys.exit(1)

    image_url = sys.argv[1]  # Image URL passed from the backend
    output_path = sys.argv[2]  # Path where processed image will be saved

    # Load image from the URL
    img = load_image_from_url(image_url)
    no_bg = remove(img)  # Process the image to remove background

    # Save the processed image locally (temporary storage in /uploads)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    no_bg.save(output_path)  # Save the image to the specified path

    print(f"Processed image saved to {output_path}")

if __name__ == "__main__":
    main()