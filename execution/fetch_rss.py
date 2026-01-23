import feedparser
import json
import os
import sys

def fetch_rss(urls):
    all_items = []
    for url in urls:
        print(f"Fetching: {url}")
        feed = feedparser.parse(url)
        for entry in feed.entries:
            item = {
                "title": entry.get("title", "No Title"),
                "link": entry.get("link", ""),
                "summary": entry.get("summary", ""),
                "published": entry.get("published", entry.get("updated", "No Date")),
                "source": feed.feed.get("title", url)
            }
            all_items.append(item)
    
    return all_items

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python fetch_rss.py <url1> <url2> ...")
        sys.exit(1)
    
    urls = sys.argv[1:]
    items = fetch_rss(urls)
    
    os.makedirs(".tmp", exist_ok=True)
    with open(".tmp/news_items.json", "w") as f:
        json.dump(items, f, indent=4)
    
    print(f"Fetched {len(items)} items and saved to .tmp/news_items.json")
