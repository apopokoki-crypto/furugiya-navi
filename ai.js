const aiBtn = document.getElementById('ai-btn');
const aiModal = document.getElementById('ai-modal');
const aiClose = document.getElementById('ai-close');
const aiUpload = document.getElementById('ai-upload');
const aiPreview = document.getElementById('ai-preview');
const aiAnalyze = document.getElementById('ai-analyze');
const aiResult = document.getElementById('ai-result');
const aiFileInput = document.getElementById('ai-file-input');

let currentImageData = null;
let currentMediaType = null;

aiBtn.addEventListener('click', () => {
  aiModal.classList.add('open');
});

aiClose.addEventListener('click', () => {
  aiModal.classList.remove('open');
  resetModal();
});

aiModal.addEventListener('click', (e) => {
  if (e.target === aiModal) {
    aiModal.classList.remove('open');
    resetModal();
  }
});

aiUpload.addEventListener('click', () => {
  aiFileInput.click();
});

aiFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  currentMediaType = file.type;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataURL = ev.target.result;
    currentImageData = dataURL.split(',')[1];
    aiPreview.src = dataURL;
    aiPreview.style.display = 'block';
    aiAnalyze.disabled = false;
    aiResult.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

aiAnalyze.addEventListener('click', async () => {
  if (!currentImageData) return;

  aiAnalyze.disabled = true;
  aiAnalyze.textContent = '分析中...';
  aiResult.style.display = 'none';

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageData: currentImageData, mediaType: currentMediaType }),
    });

    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    renderResult(data);
  } catch {
    aiResult.innerHTML = '<p class="ai-error">分析に失敗しました。もう一度お試しください。</p>';
    aiResult.style.display = 'block';
  } finally {
    aiAnalyze.disabled = false;
    aiAnalyze.textContent = '判定する';
  }
});

function renderResult(data) {
  const scoreColor = data.score >= 8 ? '#4caf50' : data.score >= 5 ? '#ff9800' : '#f44336';
  const recBg = data.recommendation === 'おすすめ' ? '#4caf50' : data.recommendation === '要確認' ? '#ff9800' : '#f44336';

  aiResult.innerHTML = `
    <div class="ai-score-wrap">
      <span class="ai-score-num" style="color:${scoreColor}">${data.score}</span>
      <span class="ai-score-label">/ 10</span>
    </div>
    <div class="ai-rec" style="background:${recBg}">${data.recommendation}</div>
    <div class="ai-section">
      <h4>状態</h4>
      <p>${data.condition}</p>
    </div>
    <div class="ai-section">
      <h4>古着としての魅力</h4>
      <p>${data.appeal}</p>
    </div>
  `;
  aiResult.style.display = 'block';
}

function resetModal() {
  currentImageData = null;
  currentMediaType = null;
  aiPreview.style.display = 'none';
  aiPreview.src = '';
  aiAnalyze.disabled = true;
  aiResult.style.display = 'none';
  aiFileInput.value = '';
}
