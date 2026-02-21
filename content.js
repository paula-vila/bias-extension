// Extract article text from the page
function getArticleText() {
  const selectors = ['article', 'main', '.article-body', '.story-body', '.post-content'];
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el.innerText.slice(0, 3000);
  }
  return document.body.innerText.slice(0, 3000);
}

// Create and show the bias badge on the page
function showBadge(bias) {
  const existing = document.getElementById('bias-badge');
  if (existing) existing.remove();

  const badge = document.createElement('div');
  badge.id = 'bias-badge';
  badge.innerText = '🗞️ Bias: ' + bias;
  document.body.appendChild(badge);
}

// Call your Render API
async function analyzeBias() {
  const text = getArticleText();
  if (!text || text.length < 100) return;

  try {
    const response = await fetch('https://bias-api-00sp.onrender.com/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    showBadge(data.bias);
  } catch (e) {
    showBadge('unavailable');
  }
}

analyzeBias();
