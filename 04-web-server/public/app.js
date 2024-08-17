console.log('Hello from client script');

document.addEventListener('click', (event) => {
  const dataType = event.target.dataset.type;
  if (dataType === 'remove') {
    const id = event.target.dataset.id;
    removeNote(id).then(() => {
      event.target.closest('li').remove();
    });
  }
});

const removeNote = async (id) =>
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
