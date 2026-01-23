import sys
import json
import os
import requests
from bs4 import BeautifulSoup
from duckduckgo_search import DDGS

def search_text_fallback(query, max_results=5):
    """
    Fallback search using DuckDuckGo HTML version if DDGS fails.
    """
    url = f"https://duckduckgo.com/html/?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    results = []
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            for i, result in enumerate(soup.find_all('div', class_='result')):
                if i >= max_results:
                    break
                title_tag = result.find('a', class_='result__a')
                snippet_tag = result.find('a', class_='result__snippet')
                
                if title_tag:
                    results.append({
                        "title": title_tag.get_text(),
                        "body": snippet_tag.get_text() if snippet_tag else "",
                        "href": title_tag.get('href')
                    })
    except Exception as e:
        print(f"Fallback search error: {e}", file=sys.stderr)
        
    return results

def search_optimized(query, max_results=5):
    """
    Search for information and images using DuckDuckGo.
    Uses DDGS for images (which works) and requests for text (more robust).
    """
    results = {
        "query": query,
        "facts": [],
        "image_urls": []
    }
    
    # 1. Search for text results (try DDGS first, then fallback)
    try:
        with DDGS() as ddgs:
            text_gen = ddgs.text(query, max_results=max_results)
            for r in text_gen:
                results["facts"].append({
                    "title": r.get("title"),
                    "body": r.get("body"),
                    "href": r.get("href")
                })
    except Exception:
        pass
    
    if not results["facts"]:
        # print("DDGS text failed, using fallback...", file=sys.stderr)
        results["facts"] = search_text_fallback(query, max_results=max_results)
            
    # 2. Search for images (DDGS seems to work fine here, but adding retry/params for reliability)
    try:
        with DDGS() as ddgs:
            image_gen = ddgs.images(query, max_results=max_results, region='wt-wt', safesearch='off')
            for r in image_gen:
                if r.get("image"):
                    results["image_urls"].append(r.get("image"))
    except Exception as e:
        # print(f"Image search error: {e}", file=sys.stderr)
        pass
            
    if not results["image_urls"]:
        # Try one more time with simple call if images are missing
        try:
             with DDGS() as ddgs:
                image_gen = ddgs.images(query, max_results=2)
                for r in image_gen:
                    if r.get("image"):
                        results["image_urls"].append(r.get("image"))
        except Exception:
            pass
            
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python search_tools.py '<query>'")
        sys.exit(1)
    
    query = sys.argv[1]
    search_results = search_optimized(query)
    
    # Print as JSON
    print(json.dumps(search_results, indent=4))
