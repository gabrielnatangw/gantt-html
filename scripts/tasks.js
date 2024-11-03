import { generateUUID, formatDate, formatDisplayDate, updateActiveDates, syncHeights } from './utils.js';
import { onMouseDownTabLeft, onMouseDownTabRight, onMouseDownTabItem } from './dragResize.js';

export const generateTasks = (numTasks) => {
    const tasks = [];
    const today = new Date();

    for (let i = 0; i < numTasks; i++) {
        const randomStartOffset = Math.floor(Math.random() * 61) - 30;
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + randomStartOffset);

        const randomDuration = Math.floor(Math.random() * 5) + 1;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + randomDuration);

        tasks.push({
            id: generateUUID(),
            title: `Task ${i + 1}`,
            created_at: formatDate(today),
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            dependencies: i > 0 ? [tasks[i- 1].id] :  []
        });
    }
    return tasks;
};

export const appendItemList = (tasks, listLeft) => {
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-item';
        taskItem.id = task.id;

        const titleElement = document.createElement('p');
        titleElement.textContent = task.title;

        const dateRange = document.createElement('strong');
        dateRange.textContent = `Início: ${formatDisplayDate(task.start_date)} até ${formatDisplayDate(task.end_date)}`;

        taskItem.appendChild(titleElement);
        taskItem.appendChild(dateRange);
        listLeft.appendChild(taskItem);
    });
};

export const appendTabItems = (tasks, listRight, updateActiveDates) => {
    tasks.forEach(task => {
        const tabItem = document.createElement('div');
        tabItem.className = 'tab-item';
        tabItem.id = `tab-item-${task.id}`;

        const tabItemLeft = document.createElement('div');
        tabItemLeft.className = 'tab-item-left';
        const tabItemRight = document.createElement('div');
        tabItemRight.className = 'tab-item-right';

        tabItemLeft.addEventListener('mousedown', (event) => onMouseDownTabLeft(event, tabItem, tasks, task.id));
        tabItemRight.addEventListener('mousedown', (event) => onMouseDownTabRight(event, tabItem, tasks, task.id));
        tabItem.addEventListener('mousedown', (event) => onMouseDownTabItem(event, tabItem, tasks, task.id, updateActiveDates));

        const formattedStartDate = `${new Date(task.start_date).getDate()}/${new Date(task.start_date).getMonth() + 1}/${new Date(task.start_date).getFullYear()}`;
        const startDateElement = document.getElementById(formattedStartDate);

        const formattedEndDate = `${new Date(task.end_date).getDate()}/${new Date(task.end_date).getMonth() + 1}/${new Date(task.end_date).getFullYear()}`;
        const endDateElement = document.getElementById(formattedEndDate);

        if (startDateElement && endDateElement) {
            const startLeftPos = startDateElement.getBoundingClientRect().left - listRight.getBoundingClientRect().left;
            const endRightPos = endDateElement.getBoundingClientRect().right - listRight.getBoundingClientRect().left;

            tabItem.style.left = `${startLeftPos}px`;
            tabItem.style.width = `${endRightPos - startLeftPos}px`;
        } else {
            console.warn(`Elemento de data não encontrado para task ID ${task.id}. Start date: ${formattedStartDate}, End date: ${formattedEndDate}`);
        }

        tabItem.appendChild(tabItemLeft);
        tabItem.appendChild(tabItemRight);

        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.id = `list-item-${task.id}`;
        listItem.appendChild(tabItem);

        listRight.appendChild(listItem);
    });
};


export const addTask = (tasks) => {
    const input = document.querySelector('#input-task');
    const listLeft = document.querySelector('#list-left');
    const listRight = document.getElementById('list-right');
    const today = new Date();

    // Cria a nova tarefa com um ID único e datas nulas
    const newTask = {
        id: generateUUID(),
        title: input.value,
        created_at: formatDate(today),
        start_date: null,
        end_date: null,
        dependencies: []
    };

    // Adiciona a nova tarefa ao array de tarefas
    tasks.push(newTask);

    // Adiciona o novo item à lista da esquerda
    const taskItem = document.createElement('li');
    taskItem.className = 'list-item';
    taskItem.id = newTask.id;

    const titleElement = document.createElement('p');
    titleElement.textContent = newTask.title;

    const dateRange = document.createElement('strong');
    dateRange.textContent = `Início: N/A até N/A`;

    taskItem.appendChild(titleElement);
    taskItem.appendChild(dateRange);
    listLeft.appendChild(taskItem);

    // Adiciona o novo tab-item à lista da direita
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    tabItem.id = `tab-item-${newTask.id}`;

    const tabItemLeft = document.createElement('div');
    tabItemLeft.className = 'tab-item-left';
    const tabItemRight = document.createElement('div');
    tabItemRight.className = 'tab-item-right';

    // Adiciona eventos de redimensionamento e movimentação
    tabItemLeft.addEventListener('mousedown', (event) => onMouseDownTabLeft(event, tabItem, tasks, newTask.id));
    tabItemRight.addEventListener('mousedown', (event) => onMouseDownTabRight(event, tabItem, tasks, newTask.id));
    tabItem.addEventListener('mousedown', (event) => onMouseDownTabItem(event, tabItem, tasks, newTask.id, updateActiveDates));

    tabItem.appendChild(tabItemLeft);
    tabItem.appendChild(tabItemRight);

    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.id = `list-item-${newTask.id}`;
    listItem.appendChild(tabItem);

    listRight.appendChild(listItem);

    // Sincroniza as alturas após a adição do novo item
    syncHeights(tasks);

    // Limpa o valor do input
    input.value = '';
};