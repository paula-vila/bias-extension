# bias-extension
# Framing Analyzer — Political Bias Chrome Extension

Built at the AI for Good Hackathon at Columbia University.

## Mission

We wanted to promote political literacy through information transparency, helping provide a more educated future. In an era of media polarization, we believe readers deserve to know how the news they consume is framed — without being told what to think.

## What It Does

Framing Analyzer is a Google Chrome extension that automatically detects the political framing of news articles as you read them. It displays a clean, unobtrusive badge on the page showing the article's framing category and a confidence score from our machine learning model.

The extension is intentionally non-partisan — we are not affiliated with any political organization and do not promote any political viewpoint.

## Features

- Automatic framing detection on major news sites
- Confidence score showing how strongly the model identified the framing
- On/Off toggle to enable or disable the extension at any time
- Close button to dismiss the badge while reading
- Only activates on article pages from major news outlets — not homepages or unrelated websites

## Supported News Sites

CNN, Fox News, BBC, New York Times, Washington Post, NBC News, ABC News, CBS News, NPR, Reuters, AP News, Politico, The Guardian, Wall Street Journal, MSNBC, Breitbart, HuffPost, The Hill, Axios, Bloomberg

## How to Install

1. Clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** in the top right corner
4. Click **Load Unpacked** and select the cloned folder
5. The extension will appear in your Chrome toolbar

## How It Works

The model was trained on a dataset of 10,000+ news articles labeled by political framing. We used a TF-IDF vectorizer and a LinearSVC classifier to identify framing patterns in article text. The backend API is hosted on Render and returns both a framing label and a confidence score derived from the model's decision function.

Framing categories: Left, Leaning Left, Center, Leaning Right, Right

## A Note on Confidence Scores

We are aware that the confidence scores produced by the current model are modest. We want to be transparent about this — our mission is information transparency, and that applies to our own tool as well. LinearSVC models produce confidence estimates that are inherently approximate, and our training dataset, while substantial, has limitations.

We believe showing an honest confidence score is better than hiding uncertainty. A low confidence score is itself useful information — it tells the reader that the article's framing is ambiguous or that the model is less certain, which is a meaningful signal in its own right.


## Built By

Clare Elwell, Paula Vila & Max Buglisi — SIPA, Columbia University
