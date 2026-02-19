import json
import os
import requests
import time

# Configuration
MEMBERS_FILE = 'server/data/members.json'
OUTPUT_DIR = 'client/public/images/members'

def download_file_from_google_drive(id, destination):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()

    response = session.get(URL, params={'id': id}, stream=True)
    token = get_confirm_token(response)

    if token:
        params = {'id': id, 'confirm': token}
        response = session.get(URL, params=params, stream=True)

    save_response_content(response, destination)

def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            return value
    return None

def save_response_content(response, destination):
    CHUNK_SIZE = 32768
    with open(destination, "wb") as f:
        for chunk in response.iter_content(CHUNK_SIZE):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)

def main():
    # Ensure output directory exists
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Read members data
    try:
        with open(MEMBERS_FILE, 'r') as f:
            members = json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find {MEMBERS_FILE}")
        return

    print(f"Found {len(members)} members. Starting download...")

    for member in members:
        if 'image' in member and 'drive.google.com' in member['image']:
            # Extract ID usually after 'id='
            try:
                drive_id = member['image'].split('id=')[1]
                output_path = os.path.join(OUTPUT_DIR, f"{member['rollNo']}.png")
                
                print(f"Downloading {member['name']} ({member['rollNo']})...")
                download_file_from_google_drive(drive_id, output_path)
                print(f"Saved to {output_path}")
                
                # Optional: Remove the image link from JSON here if we were updating the file,
                # but for now we will just download.
                
            except Exception as e:
                print(f"Failed to download for {member['name']}: {e}")
        else:
            print(f"Skipping {member['name']} (No Drive link)")

if __name__ == "__main__":
    main()
