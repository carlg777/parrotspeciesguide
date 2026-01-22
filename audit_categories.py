import os
import json

base_dir = "src/content/species"
categories = {}

for filename in os.listdir(base_dir):
    if filename.endswith(".json"):
        filepath = os.path.join(base_dir, filename)
        with open(filepath, 'r') as f:
            try:
                data = json.load(f)
                category = data.get("category", "Unknown")
                if category not in categories:
                    categories[category] = []
                categories[category].append(filename)
            except Exception as e:
                print(f"Error reading {filename}: {e}")

# Group summaries
for cat, files in categories.items():
    print(f"Category: {cat} ({len(files)} files)")
    # Print first few files as examples
    for f in files[:3]:
        print(f"  - {f}")
    if len(files) > 3:
        print(f"  - ...")
