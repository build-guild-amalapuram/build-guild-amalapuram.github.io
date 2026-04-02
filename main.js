/* ─── FAQ TOGGLE ─── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-toggle').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-toggle').textContent = '×';
    }
  });
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── GRID ─── */
const canvas = document.getElementById('gridCanvas');
const CELL = 60;
let cols = 0, lastCell = null;

function buildGrid() {
  cols = Math.ceil(window.innerWidth / CELL) + 1;
  const rows = Math.ceil(window.innerHeight / CELL) + 1;
  canvas.innerHTML = '';
  canvas.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`;
  canvas.style.gridTemplateRows    = `repeat(${rows}, ${CELL}px)`;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) {
    const c = document.createElement('div');
    c.className = 'grid-cell';
    frag.appendChild(c);
  }
  canvas.appendChild(frag);
  lastCell = null;
}
buildGrid();
window.addEventListener('resize', buildGrid);

window.addEventListener('mousemove', (e) => {
  const idx = Math.floor(e.clientY / CELL) * cols + Math.floor(e.clientX / CELL);
  const cell = canvas.children[idx];
  if (!cell || cell === lastCell) return;
  if (lastCell) lastCell.classList.remove('lit');
  cell.classList.add('lit');
  lastCell = cell;
});

window.addEventListener('mouseleave', () => {
  if (lastCell) { lastCell.classList.remove('lit'); lastCell = null; }
});
