export default function createDirectionButtons(scene, onMove) {
  const container = document.createElement('div');
  container.id = 'direction-buttons';
  Object.assign(container.style, {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 40px)',
    gridTemplateRows: 'repeat(3, 40px)',
    gap: '2px',
  });

  const directions = [
    { label: '↖', dx: -1, dy: -1 },
    { label: '↑', dx: 0, dy: -1 },
    { label: '↗', dx: 1, dy: -1 },
    { label: '←', dx: -1, dy: 0 },
    null,
    { label: '→', dx: 1, dy: 0 },
    { label: '↙', dx: -1, dy: 1 },
    { label: '↓', dx: 0, dy: 1 },
    { label: '↘', dx: 1, dy: 1 },
  ];

  directions.forEach((dir) => {
    if (!dir) {
      const spacer = document.createElement('span');
      container.appendChild(spacer);
      return;
    }
    const btn = document.createElement('button');
    btn.textContent = dir.label;
    btn.addEventListener('click', () => onMove(dir.dx, dir.dy));
    container.appendChild(btn);
  });

  scene.game.canvas.parentNode.appendChild(container);

  return {
    destroy: () => container.remove(),
  };
}
