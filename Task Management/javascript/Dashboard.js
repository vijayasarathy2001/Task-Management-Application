
function displayTaskList(tasks) {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item'; 

        
        taskItem.innerHTML = `
            <table>
                <tr>
                    <td><strong>Title:</strong></td>
                    <td><strong>Description:</strong></td>
                    <td><strong>Due Date:</strong></td>
                    <td><strong>Priority:</strong></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.priority}</td>
                </tr>
            </table>
        `;
        taskItem.style.textAlign= "auto";
        taskListElement.style.textAlign = "auto"
        

        taskListElement.appendChild(taskItem);
    });
}


function updateDashboardAndDisplayTasks() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    const upcomingTasks = taskList.filter(task => !task.completed && new Date(task.dueDate) >= new Date());
    const overdueTasks = taskList.filter(task => !task.completed && new Date(task.dueDate) < new Date());
    const completedTasks = taskList.filter(task => task.completed);

    document.getElementById('upcoming-task-count').textContent = upcomingTasks.length;
    document.getElementById('overdue-task-count').textContent = overdueTasks.length;
    document.getElementById('completed-task-count').textContent = completedTasks.length;

    
    displayTaskList(taskList);
}


updateDashboardAndDisplayTasks();




function displayTasks() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListElement = document.getElementById('task-list');
    const upcomingTaskListElement = document.getElementById('upcoming-task-list');
    const overdueTaskListElement = document.getElementById('overdue-task-list');
    const completedTaskListElement = document.getElementById('completed-task-list');

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

    const upcomingTasks = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) >= new Date());
    const overdueTasks = filteredTasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());
    const completedTasks = filteredTasks.filter(task => task.completed);

    displayTasksInSection(upcomingTasks, 'upcoming-task-list');
    displayTasksInSection(overdueTasks, 'overdue-task-list');
    displayTasksInSection(completedTasks, 'completed-task-list');
}

function displayTasksInSection(tasks, sectionId) {
    const taskListElement = document.getElementById(sectionId);
    taskListElement.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.title;
        taskListElement.appendChild(taskItem);
    });
}
displayTasks();
