import requests

url = "https://drive.google.com/uc?export=view&id=1FzxlVsqeB5xI6jbJ3k23plvyfiMUZZBU"
try:
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Success! Image is accessible.")
        # Print first few bytes to confirm it's an image
        print(f"Content Type: {response.headers.get('Content-Type')}")
    else:
        print("Failed to access image.")
except Exception as e:
    print(f"Error: {e}")
