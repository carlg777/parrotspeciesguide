import json
import os
import sys
from datetime import datetime

def save_article(article_data, output_dir="src/content/news"):
    os.makedirs(output_dir, exist_ok=True)
    
    title_en = article_data.get("title_en", article_data.get("title", "Untitled"))
    title_es = article_data.get("title_es", title_en) # Fallback to EN if ES missing
    
    desc_en = article_data.get("description_en", article_data.get("description", ""))
    desc_es = article_data.get("description_es", desc_en)
    
    content_en = article_data.get("content_en", article_data.get("content", ""))
    content_es = article_data.get("content_es", content_en)
    
    author = article_data.get("author", "Parrot Guide Team")
    date = datetime.now().strftime("%Y-%m-%d")
    
    # Create filename from English title
    safe_title = "".join(c for c in title_en if c.isalnum() or c in (" ", "-", "_")).strip().replace(" ", "-").lower()
    filename = f"{safe_title}.md"
    filepath = os.path.join(output_dir, filename)
    
    markdown_content = f"""---
title:
  en: "{title_en}"
  es: "{title_es}"
pubDate: {date}
description:
  en: "{desc_en}"
  es: "{desc_es}"
author: "{author}"
image: "{article_data.get('image_url', '')}"
---

<div class="news-content-en" lang="en">

{content_en}

</div>

<div class="news-content-es" lang="es">

{content_es}

</div>
"""
    
    with open(filepath, "w") as f:
        f.write(markdown_content)
    
    return filepath

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python save_article.py '<json_data>' OR python save_article.py <json_file>")
        sys.exit(1)
    
    arg = sys.argv[1]
    try:
        if os.path.isfile(arg):
            with open(arg, "r") as f:
                data = json.load(f)
        else:
            data = json.loads(arg)
            
        path = save_article(data)
        print(f"Article saved to {path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
