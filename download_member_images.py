import json
import os
import requests
import sys

# Configuration
# Run from project root
MEMBERS_FILE = r'server/data/members.json'
OUTPUT_DIR = r'client/public/members'
WEB_PATH_PREFIX = '/members'

def download_file_from_google_drive(id, destination):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()

    print(f"  > Requesting ID: {id}...", end="", flush=True)
    try:
        response = session.get(URL, params={'id': id}, stream=True, timeout=15)
        token = get_confirm_token(response)

        if token:
            params = {'id': id, 'confirm': token}
            response = session.get(URL, params=params, stream=True, timeout=15)
        
        if response.status_code == 200:
            save_response_content(response, destination)
            print(" OK")
            return True
        else:
            print(f" FAILED (Status: {response.status_code})")
            return False
    except Exception as e:
        print(f" ERROR ({e})")
        return False

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
    # Ensure paths are correct relative to script execution
    # Assuming script is in root 'e:\DB Website\'
    
    if not os.path.exists(MEMBERS_FILE):
        print(f"Error: Could not find members file at {MEMBERS_FILE}")
        # Try absolute path based on known structure if relative fails? 
        # But let's assume running from root.
        return

    # Create output directory
    if not os.path.exists(OUTPUT_DIR):
        print(f"Creating directory: {OUTPUT_DIR}")
        os.makedirs(OUTPUT_DIR)

    # Read members data
    with open(MEMBERS_FILE, 'r') as f:
        members = json.load(f)

    print(f"Found {len(members)} members. Starting migration process...")

    updated_count = 0
    download_success_count = 0
    download_fail_count = 0

    for member in members:
        # Check if it's a drive link
        image_url = member.get('image', '')
        
        # We only want to process drive links
        is_drive_link = 'drive.google.com' in image_url
        
        if not is_drive_link:
            continue

        file_id = None
        if 'id=' in image_url:
            try:
                # Extract simple ID
                file_id = image_url.split('id=')[1].split('&')[0]
            except:
                pass
        elif '/file/d/' in image_url:
            try:
                file_id = image_url.split('/file/d/')[1].split('/')[0]
            except:
                pass
        
        if file_id:
            # We use member ID as filename for consistency
            filename = f"{member['id']}.jpg"
            output_path = os.path.join(OUTPUT_DIR, filename)
            
            print(f"Processing {member['name']} ({member['id']})...")
            
            # Download
            if download_file_from_google_drive(file_id, output_path):
                # Update JSON path
                new_path = f"{WEB_PATH_PREFIX}/{filename}"
                member['image'] = new_path
                updated_count += 1
                download_success_count += 1
            else:
                download_fail_count += 1
                print(f"Warning: Failed to download image for {member['name']}. JSON not updated.")
        else:
            print(f"Skipping {member['name']}: Could not extract ID from {image_url}")

    # Write back changes if any
    if updated_count > 0:
        with open(MEMBERS_FILE, 'w') as f:
            json.dump(members, f, indent=2)
        print(f"\nMigration Complete!")
        print(f" - Downloaded: {download_success_count}")
        print(f" - Failed: {download_fail_count}")
        print(f" - Updated JSON records: {updated_count}")
        print(f" - File saved: {MEMBERS_FILE}")
    else:
        print("\nNo changes were made to members.json")

if __name__ == "__main__":
    main()
