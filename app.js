const titleInput = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = []

createBtn.onclick = function () {
    const newNote = {
        title: titleInput.value,
        completed: false
    }
    notes.push(newNote)
    console.log(notes)

    if (titleInput.value.length === 0) {
        return
    }
    
    render()
    
    titleInput.value = ''
}

listElement.onclick = function (event) {
    console.log(event.target.dataset)
    const dataset = event.target.dataset
    if (dataset.index) {
        const index = parseInt(dataset.index)
        const type = dataset.type
        if (type === 'remove') {
            notes.splice(index, 1)
        } else if (type === 'toggle') {
            notes[index].completed = !notes[index].completed
        }
    }
    render()
}

function render () {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов</p>'
    }
    for (let [idx, note] of notes.entries()) {
        console.log(note, idx)
        listElement.insertAdjacentHTML(
            'beforeend',
            getNoteTemplate(note, idx)
            )
    }
    
}

function getNoteTemplate (note, idx) {
    return `
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
      <span>
        <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${idx}" data-type="toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${idx}" data-type="remove">&times;</span>
      </span>
    </li>
    `
}

render()