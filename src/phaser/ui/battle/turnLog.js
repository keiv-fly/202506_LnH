export default function createTurnLog(scene) {
  const container = document.createElement('div');
  container.id = 'turn-log';
  Object.assign(container.style, {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '150px',
    height: '80px',
    overflowY: 'auto',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '12px',
    padding: '4px'
  });

  scene.game.canvas.parentNode.appendChild(container);

  function addMessage(text) {
    const line = document.createElement('div');
    line.textContent = text;
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }

  return { addMessage, destroy: () => container.remove() };
}
