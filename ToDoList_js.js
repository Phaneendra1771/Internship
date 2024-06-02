document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.toggle('completed', task.completed);

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const actions = document.createElement('div');
            actions.classList.add('task-actions');

            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.innerHTML = '✏️';
            editButton.addEventListener('click', () => editTask(index));
            actions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '❌';
            deleteButton.addEventListener('click', () => deleteTask(index));
            actions.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.classList.add('complete-button');
            completeButton.innerHTML = '✔️';
            completeButton.addEventListener('click', () => toggleComplete(index));
            actions.appendChild(completeButton);

            taskItem.appendChild(actions);
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    const editTask = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});
