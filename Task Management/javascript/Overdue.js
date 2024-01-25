document.addEventListener('DOMContentLoaded', function () {
    const overdueTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayOverdueTasks(overdueTasks, 'overdue-task-list');
});

function displayOverdueTasks(tasks, sectionId) {
    const taskListElement = document.getElementById(sectionId);
    taskListElement.innerHTML = '';

    const overdueTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date());

    overdueTasks.forEach((task, index) => {
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
