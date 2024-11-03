
import { getAlignedDates } from './utils.js';


let startX;
let startWidth;
let startLeft;


export const onMouseDownLeftSide = (event, leftContainer, syncHeights) => {
    event.preventDefault();
    startX = event.clientX;
    startWidth = leftContainer.offsetWidth;

    const onMouseMoveLeftSide = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        if (newWidth > 50 && newWidth < window.innerWidth - 50) {
            leftContainer.style.width = `${newWidth}px`;
            syncHeights(); // Atualiza as alturas sincronizadas após o redimensionamento
        }
    };

    const onMouseUpLeftSide = () => {
        // Remove os eventos de 'mousemove' e 'mouseup' quando o redimensionamento termina
        document.removeEventListener('mousemove', onMouseMoveLeftSide);
        document.removeEventListener('mouseup', onMouseUpLeftSide);
    };

    // Adiciona os eventos de 'mousemove' e 'mouseup' para acompanhar o movimento
    document.addEventListener('mousemove', onMouseMoveLeftSide);
    document.addEventListener('mouseup', onMouseUpLeftSide);
};

export const onMouseDownTabRight = (event, tabItem, tasks, taskId) => {
    event.preventDefault();
    startX = event.clientX;
    startWidth = tabItem.offsetWidth;

    const onMouseMoveTabRight = (e) => {
        const deltaX = e.clientX - startX;
        const newWidth = startWidth + deltaX;
        if (newWidth > 20) {
            tabItem.style.width = `${newWidth}px`;
        }
    };

    const onMouseUpTabRight = () => {
        const { startDate, endDate } = getAlignedDates(tabItem);

        if (Array.isArray(tasks)) {
            // Atualiza a tarefa com as novas datas no array tasks
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.start_date = startDate;
                task.end_date = endDate;

                // Atualiza as datas na interface (assumindo que o item na lista esquerda possui ID igual ao taskId)
                const taskListItem = document.getElementById(taskId);
                if (taskListItem) {
                    const dateRange = taskListItem.querySelector('strong');
                    dateRange.textContent = `Início: ${startDate} até ${endDate}`;
                }

            }
        }

        document.removeEventListener('mousemove', onMouseMoveTabRight);
        document.removeEventListener('mouseup', onMouseUpTabRight);
    };

    document.addEventListener('mousemove', onMouseMoveTabRight);
    document.addEventListener('mouseup', onMouseUpTabRight);
};


export const onMouseDownTabLeft = (event, tabItem, tasks, taskId) => {
    event.preventDefault();
    startX = event.clientX;
    startWidth = tabItem.offsetWidth;
    startLeft = tabItem.getBoundingClientRect().left - tabItem.parentElement.getBoundingClientRect().left;

    const onMouseMoveTabLeft = (e) => {
        const deltaX = e.clientX - startX;
        const newWidth = startWidth - deltaX;
        if (newWidth > 20) {
            tabItem.style.width = `${newWidth}px`;
            tabItem.style.left = `${startLeft + deltaX}px`;
        }
    };

    const onMouseUpTabLeft = () => {
        const { startDate, endDate } = getAlignedDates(tabItem);

        if (Array.isArray(tasks)) {
            // Atualiza a tarefa com as novas datas no array tasks
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.start_date = startDate;
                task.end_date = endDate;

                // Atualiza as datas na interface
                const taskListItem = document.getElementById(taskId);
                if (taskListItem) {
                    const dateRange = taskListItem.querySelector('strong');
                    dateRange.textContent = `Início: ${startDate} até ${endDate}`;
                }

            }
        }

        document.removeEventListener('mousemove', onMouseMoveTabLeft);
        document.removeEventListener('mouseup', onMouseUpTabLeft);
    };

    document.addEventListener('mousemove', onMouseMoveTabLeft);
    document.addEventListener('mouseup', onMouseUpTabLeft);
};


export const onMouseDownTabItem = (event, tabItem, tasks, taskId) => {
    if (event.target.classList.contains('tab-item-left') || event.target.classList.contains('tab-item-right')) return;

    event.preventDefault();
    startX = event.clientX;
    startLeft = tabItem.getBoundingClientRect().left - tabItem.parentElement.getBoundingClientRect().left;

    const onMouseMoveTabItem = (e) => {
        const deltaX = e.clientX - startX;
        tabItem.style.left = `${startLeft + deltaX}px`;
    };

    const onMouseUpTabItem = () => {
        const { startDate, endDate } = getAlignedDates(tabItem);

        // Atualizar a tarefa com as novas datas no array tasks
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.start_date = startDate;
            task.end_date = endDate;

            // Atualiza as datas na interface (assumindo que o item na lista esquerda possui ID igual ao taskId)
            const taskListItem = document.getElementById(taskId);
            if (taskListItem) {
                const dateRange = taskListItem.querySelector('strong');
                dateRange.textContent = `Início: ${startDate} até ${endDate}`;
            }

        }

        document.removeEventListener('mousemove', onMouseMoveTabItem);
        document.removeEventListener('mouseup', onMouseUpTabItem);
    };

    document.addEventListener('mousemove', onMouseMoveTabItem);
    document.addEventListener('mouseup', onMouseUpTabItem);
};