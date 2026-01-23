# Directive: Process News Aggregator Feeds

## Goal
To fetch latest news from provided RSS feeds, present summaries for selection, research selected articles, translate them into Spanish, and rewrite them into a bilingual blog format.

## Steps

### 1. Fetch Latest News
Run the `fetch_rss.py` script with the list of RSS URLs.
```bash
python execution/fetch_rss.py <URL1> <URL2> ...
```
Output: `.tmp/news_items.json`

### 2. Present Summaries
Read `.tmp/news_items.json` and present a numbered list of titles and summaries to the user.
Ask the user to select the indices of the articles they want to process.

### 3. Deep Research & Image Search
For each selected article:
- Run the `search_tools.py` script with the article title or summary.
```bash
python execution/search_tools.py "<QUERY>"
```
- Store findings in `.tmp/research_<index>.json`.

### 4. Rewrite & Translate Article
Use the research and original summary to write a long-form blog post in **both English and Spanish**.
- Translate the title, description, and body.
- Ensure the tone is consistent across both languages.

### 5. Save Article
Call `save_article.py` with the bilingual JSON data.
```bash
python execution/save_article.py '{
  "title_en": "...",
  "title_es": "...",
  "description_en": "...",
  "description_es": "...",
  "content_en": "...",
  "content_es": "...",
  "author": "...",
  "image_url": "..."
}'
```

## Tools/Scripts
- `execution/fetch_rss.py`: Fetches and parses RSS.
- `execution/save_article.py`: Saves final markdown to `src/content/news/`.
- `search_web`: Tool for research and image URLs.
