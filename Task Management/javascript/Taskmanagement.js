let editingIndex = -1;

function saveTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editingIndex !== -1) {
        taskList[editingIndex] = { title, description, dueDate, priority, completed: false };
    } else {
        taskList.push({ title, description, dueDate, priority, completed: false });
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));

    document.getElementById('task-form').reset();
    editingIndex = -1;

    displayTasks();
}

function editTask(index) {
    editingIndex = index;

    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = taskList[index];

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
}

function cancelEdit() {
    editingIndex = -1;
    document.getElementById('task-form').reset();
}

function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    displayTasks();
}

function toggleComplete(index) {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('tasks', JSON.stringify(taskList));

    displayTasks();
}

function displayTasksInSection(tasks, sectionId) {
    const taskListElement = document.getElementById(sectionId);
    taskListElement.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `Title: ${task.title}, Description: ${task.description}, Due Date: ${task.dueDate}, Priority: ${task.priority}`;
        taskListElement.appendChild(taskItem);

        const buttonsDiv = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => deleteTask(index);

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
        completeButton.className = 'complete';
        completeButton.onclick = () => toggleComplete(index);

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(completeButton);

        taskListElement.appendChild(buttonsDiv);
    });
}

function displayTasks() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasksInSection(taskList, 'task-list');
}

function displayTasks() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasksInSection(taskList, 'task-list');
}

function applyFilters() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    const searchKeyword = document.getElementById('search-input').value.toLowerCase();
    const priorityFilter = document.getElementById('priority-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const filteredTasks = taskList.filter(task => {
        const titleMatches = task.title.toLowerCase().includes(searchKeyword);
        const priorityMatches = priorityFilter === '' || task.priority === priorityFilter;
        const statusMatches = statusFilter === '' || (statusFilter === 'completed' && task.completed) || (statusFilter === 'not-completed' && !task.completed);

        return titleMatches && priorityMatches && statusMatches;
    });

    displayTasksInSection(filteredTasks, 'task-list');
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('priority-filter').value = '';
    document.getElementById('status-filter').value = '';
    displayTasks(); 
}
