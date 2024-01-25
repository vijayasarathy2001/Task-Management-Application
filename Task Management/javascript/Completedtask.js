document.addEventListener('DOMContentLoaded', function () {
    const completedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayCompletedTasks(completedTasks, 'completed-task-list');
});

function displayCompletedTasks(tasks, sectionId) {
    const taskListElement = document.getElementById(sectionId);
    taskListElement.innerHTML = '';

    const completedTasks = tasks.filter(task => task.completed);

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <table>
                <tr>
                    <td><strong>Title:</strong></td>
                    <td>${task.title}</td>
                </tr>
                <tr>
                    <td><strong>Description:</strong></td>
                    <td>${task.description}</td>
                </tr>
                <tr>
                    <td><strong>Due Date:</strong></td>
                    <td>${task.dueDate}</td>
                </tr>
                <tr>
                    <td><strong>Priority:</strong></td>
                    <td>${task.priority}</td>
                </tr>
            </table>
        `;
        taskListElement.appendChild(taskItem);
    });
}
