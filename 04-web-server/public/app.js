console.log('Hello from client script');

document.addEventListener('click', (event) => {
  const dataType = event.target.dataset.type;
  if (dataType === 'remove') {
    const id = event.target.dataset.id;
    removeNote(id).then(() => {
      event.target.closest('li').remove();
    });
  }

  if (dataType === 'edit') {
    const id = event.target.dataset.id;
    const text = event.target.dataset.title;
    const newText = prompt('Редактировать', text);
    if (newText) {
      updateNote(id, newText).then((res) => {
        const containerTitle = event.target.closest('li').querySelector('.container-title');
        containerTitle.innerHTML = newText;
      });
    }
  }
});

const removeNote = async (id) =>
  await fetch(`/${id}`, {
    method: 'DELETE',
  });

const updateNote = async (id, title) =>
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ title }),
  });
