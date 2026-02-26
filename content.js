(async () => {
  console.log('Extension running');

  const newsDomains = [
    'cnn.com', 'foxnews.com', 'bbc.com', 'bbc.co.uk',
    'nytimes.com', 'washingtonpost.com', 'nbcnews.com',
    'abcnews.go.com', 'cbsnews.com', 'npr.org',
    'reuters.com', 'apnews.com', 'politico.com',
    'theguardian.com', 'wsj.com', 'ms.now',
    'breitbart.com', 'huffpost.com', 'thehill.com',
    'axios.com', 'bloomberg.com'
  ];

  const currentURL = window.location.hostname;
  console.log('Current URL:', currentURL);

  const isNewsSite = newsDomains.some(domain => currentURL.includes(domain));
  if (!isNewsSite) return;

  const path = window.location.pathname;
  if (path.split('/').filter(Boolean).length < 1) return;

  const isEnabled = await chrome.storage.sync.get('enabled');
  console.log('Is enabled:', isEnabled);
  if (isEnabled.enabled === false) return;

  function getArticleText() {
    const selectors = ['article', 'main', '.article-body', '.story-body', '.post-content'];
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) return el.innerText.slice(0, 3000);
    }
    return document.body.innerText.slice(0, 3000);
  }

  function showBadge(bias, confidence) {
    const existing = document.getElementById('bias-badge');
    if (existing) existing.remove();

    const badge = document.createElement('div');
    badge.id = 'bias-badge';
    badge.style.cssText = 'position:fixed; top:20px; right:20px; z-index:999999; background:white; color:black; padding:14px 20px; border-left:5px solid #f5c518; font-family:Arial; min-width:200px;';

    const label = document.createElement('div');
    label.style.cssText = 'font-size:11px; letter-spacing:1.5px; opacity:0.5; margin-bottom:4px;';
    label.innerText = 'POLITICAL FRAMING';

    const biasText = document.createElement('div');
    biasText.style.cssText = 'font-family:Oswald, Arial; font-size:20px; font-weight:700; margin-bottom:4px;';
    biasText.innerText = bias.toUpperCase();

    const confidenceText = document.createElement('div');
    confidenceText.style.cssText = 'font-size:11px; opacity:0.5; font-family:Arial;';
    confidenceText.innerText = confidence ? `Confidence: ${confidence}%` : '';

    const closeBtn = document.createElement('span');
    closeBtn.style.cssText = 'position:absolute; top:6px; right:10px; cursor:pointer; font-size:12px; opacity:0.5;';
    closeBtn.innerText = '✕';
    closeBtn.onclick = () => badge.remove();

    badge.appendChild(label);
    badge.appendChild(biasText);
    badge.appendChild(confidenceText);
    badge.appendChild(closeBtn);
    document.body.appendChild(badge);
  }

  const text = getArticleText();
  console.log('Text length:', text.length);
  if (!text || text.length < 100) return;

  try {
    console.log('Calling API...');
    const response = await fetch('https://bias-api-00sp.onrender.com/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    console.log('API response:', data);
    showBadge(data.bias, data.confidence);
  } catch (e) {
    console.log('API error:', e);
    showBadge('unavailable', null);
  }
})();