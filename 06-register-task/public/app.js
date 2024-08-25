const phone = document.querySelector('#phone');
const maskOptions = {
  mask: '+7(000)000-00-00',
  lazy: false,
};
const mask = new IMask(phone, maskOptions);
// document.addEventListener('click', ({ target }) => {
//   const dataType = target.dataset.type
//   if (dataType === 'remove') {
//     const id = target.dataset.id
//     removeNote(id).then(() => {
//       target.closest('li').remove()
//     })
//   }

//   if (dataType === 'edit') {
//     const id = target.dataset.id
//     const text = target.dataset.title
//     const container = target.closest('li')
//     const initialHTML = container.innerHTML

//     container.innerHTML = `
//       <input type="text" value="${text}" />
//       <div>
//         <button class="btn btn-success" data-type="save">Сохранить</button>
//         <button class="btn btn-danger" data-type="cancel">Отменить</button>
//       </div>
//     `

//     const updateTitleNote = ({ target }) => {
//       const dataType = target.dataset.type
//       if (dataType === 'save') {
//         const newText = container.querySelector('input').value
//         if (newText) {
//           updateNote(id, newText).then((_res) => {
//             container.innerHTML = initialHTML
//             container.querySelector('.container-title').innerHTML = newText
//             container.querySelector('[data-type="edit"]').dataset.title = newText
//             container.removeEventListener('click', updateTitleNote)
//           })
//         }
//       }
//       if (dataType === 'cancel') {
//         container.removeEventListener('click', updateTitleNote)
//         container.innerHTML = initialHTML
//       }
//     }

//     container.addEventListener('click', updateTitleNote)
//   }
// })

// const removeNote = async (id) =>
//   await fetch(`/${id}`, {
//     method: 'DELETE',
//   })

// const updateNote = async (id, title) =>
//   await fetch(`/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json;charset=utf-8' },
//     body: JSON.stringify({ title }),
//   })
