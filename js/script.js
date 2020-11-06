// It is querySelector not query.selector
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')

// Here const was spelled as cons
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListID'
// In json.parse ) bracket was missing
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId)
        // what are you comparing Here ???
        // it should be task.id according to the video
        const selectedTask = selectedList.tasks.find(task =>task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
})

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedListID = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
    })

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault()
        const taskName = newTaskInput.value
        if (listName == null || listName === '') return
        const list = createTask(listName)
        newTaskInput.value = null
        const selectedList = lists.find(list => list.id === selectedListId)
        selectedList.tasks.push(task)
        saveAndRender()
        })

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
    // false is a boolean not a array and wrong way to define objects let me clear this up
    return { id: Date.now().toString(),
             name: name,
             complete: false,
              }//[] }
}


function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render() {
    clearElement(listsContainer)
    renderLists()
    // again not listId list.id
    const selectedList = lists.find(list  => list.id === selectedListId)

    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none'
    } else {
        listDisplayContainer.style.display= ''
        listTitleElement.innerText = selectedListId.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}


function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
       const taskElement = document.importNode(taskElement.content, true) 
       const checkbox = taskElement.querySelector('input')
       checkbox.Id = task.id
       checkbox.checked = task.complete
       const label = taskElement.querySelector('label')
       label.htmlFor = task.id 
       label.append(task.name)
       tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists () {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        // It is list.id not listId
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        if (list.id === selectedListId) {
         listElement.classList.add(active-list)
        listElement.innerText = list.name
        }    
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

}

// Where is saveAndRender Function???
render()