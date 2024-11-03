// Função para gerar um ID único
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Função para formatar uma data no formato YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Função para gerar uma lista de tarefas automaticamente
const generateTasks = (numTasks) => {
    const tasks = [];
    const today = new Date();

    for (let i = 0; i < numTasks; i++) {
        const randomStartOffset = Math.floor(Math.random() * 61) - 30; // Aleatório entre -30 e +30 dias
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + randomStartOffset);

        const randomDuration = Math.floor(Math.random() * 5) + 1; // Duração aleatória de 1 a 5 dias
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + randomDuration);

        tasks.push({
            id: generateUUID(),
            title: `Task ${i + 1}`,
            created_at: formatDate(today),
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            tasks_id: []
        });
    }

    return tasks;
};

const tasks = generateTasks(20);

document.addEventListener('DOMContentLoaded', () => {
    const leftBar = document.querySelector('#left-side-resize-bar');
    const leftContainer = document.querySelector('#left-side');
    const listLeft = document.querySelector('#list-left');
    const listRight = document.getElementById('list-right');

    let startX;
    let startWidth;
    let startLeft;

// Função para verificar o alinhamento dos pontos com os elementos .space-data
const updateActiveDates = (tabItem) => {
    // Seleciona os elementos de início e fim do tab-item
    const tabItemLeft = tabItem.querySelector('.tab-item-left');
    const tabItemRight = tabItem.querySelector('.tab-item-right');

    // Calcula a posição de cada ponto
    const leftPosition = tabItemLeft.getBoundingClientRect().left;
    const rightPosition = tabItemRight.getBoundingClientRect().right;

    // Seleciona todos os elementos .space-data
    const spaceDataElements = document.querySelectorAll('.space-data');

    // Limpa as classes 'active' de todos os elementos
    spaceDataElements.forEach((el) => el.classList.remove('active'));

    // Itera sobre cada elemento .space-data e verifica se está dentro do intervalo
    spaceDataElements.forEach((spaceData) => {
        const spaceDataPosition = spaceData.getBoundingClientRect();
        const spaceDataLeft = spaceDataPosition.left;
        const spaceDataRight = spaceDataPosition.right;

        // Verifica se qualquer parte do tab-item está dentro do "quadrante" do .space-data
        if (
            (leftPosition >= spaceDataLeft && leftPosition <= spaceDataRight) ||
            (rightPosition >= spaceDataLeft && rightPosition <= spaceDataRight) ||
            (leftPosition <= spaceDataLeft && rightPosition >= spaceDataRight)
        ) {
            spaceData.classList.add('active');
        }
    });
};


        const headerDataRight = document.querySelector('.right-side .header-data');
    
        const generateDates = () => {
            const today = new Date();
    
            // Gera os 30 dias antes da data atual
            for (let i = 30; i > 0; i--) {
                const pastDate = new Date(today);
                pastDate.setDate(today.getDate() - i);
    
                const day = pastDate.getDate();
                const month = pastDate.getMonth() + 1;
                const year = pastDate.getFullYear();
    
                const dayName = pastDate.toLocaleString('default', { weekday: 'short' });
                const formattedDate = `${day}/${month}/${year}`;
    
                const dateElement = document.createElement('div');
                dateElement.className = 'space-data';
                dateElement.id = formattedDate;
                dateElement.innerHTML = `<strong>${dayName}</strong><p>${day}</p>`;
    
                headerDataRight.appendChild(dateElement);
            }
    
            // Adiciona o dia de hoje com a classe 'active'
            const todayElement = document.createElement('div');
            todayElement.className = 'space-data active';
            todayElement.id = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            todayElement.innerHTML = `<strong>${today.toLocaleString('default', { weekday: 'short' })}</strong><p>${today.getDate()}</p>`;
            headerDataRight.appendChild(todayElement);
    
            // Gera os 30 dias depois da data atual
            for (let i = 1; i <= 30; i++) {
                const futureDate = new Date(today);
                futureDate.setDate(today.getDate() + i);
    
                const day = futureDate.getDate();
                const month = futureDate.getMonth() + 1;
                const year = futureDate.getFullYear();
    
                const dayName = futureDate.toLocaleString('default', { weekday: 'short' });
                const formattedDate = `${day}/${month}/${year}`;
    
                const dateElement = document.createElement('div');
                dateElement.className = 'space-data';
                dateElement.id = formattedDate;
                dateElement.innerHTML = `<strong>${dayName}</strong><p>${day}</p>`;
    
                headerDataRight.appendChild(dateElement);
            }
        };
    
        generateDates(); // Gera as datas
    
        // Centraliza o dia atual
        const scrollToToday = () => {
            const todayElement = document.querySelector('.space-data.active');
            if (todayElement) {
                todayElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        };
    
        scrollToToday(); // Centraliza na data atual
    
    


    // Função para sincronizar a altura dos itens de lista entre list-left e list-right
    const syncHeights = () => {
        tasks.forEach(task => {
            const leftItem = document.getElementById(task.id);
            const rightItem = document.getElementById(`list-item-${task.id}`);
            if (leftItem && rightItem) {
                const newHeight = leftItem.offsetHeight;
                rightItem.style.height = `${newHeight}px`;
            }
        });
    };

    // Função de redimensionamento do left-side
    const onMouseMoveLeftSide = (event) => {
        const newWidth = startWidth + (event.clientX - startX);

        if (newWidth > 50 && newWidth < window.innerWidth - 50) {
            leftContainer.style.width = `${newWidth}px`;
            syncHeights(); // Sincroniza as alturas durante o redimensionamento
        }
    };

    const onMouseUpLeftSide = () => {
        document.removeEventListener('mousemove', onMouseMoveLeftSide);
        document.removeEventListener('mouseup', onMouseUpLeftSide);
    };

    const onMouseDownLeftSide = (event) => {
        event.preventDefault();
        startX = event.clientX;
        startWidth = leftContainer.offsetWidth;

        document.addEventListener('mousemove', onMouseMoveLeftSide);
        document.addEventListener('mouseup', onMouseUpLeftSide);
    };

// Função de redimensionamento pela direita
const onMouseMoveTabRight = (event, tabItem) => {
    const deltaX = event.clientX - startX;
    const newWidth = startWidth + deltaX;
    if (newWidth > 20) {
        tabItem.style.width = `${newWidth}px`;
        // Atualiza as datas ativas durante o redimensionamento
        updateActiveDates(tabItem);
    }
};

// Função de redimensionamento pela esquerda
const onMouseMoveTabLeft = (event, tabItem) => {
    const deltaX = event.clientX - startX;
    const newWidth = startWidth - deltaX;

    if (newWidth > 20) {
        tabItem.style.width = `${newWidth}px`;
        tabItem.style.left = `${startLeft + deltaX}px`;
        // Atualiza as datas ativas durante o redimensionamento
        updateActiveDates(tabItem);
    }
};

    const onMouseUpTabResize = (onMouseMoveHandler) => {
        document.removeEventListener('mousemove', onMouseMoveHandler);
        document.removeEventListener('mouseup', onMouseUpTabResize);
    };

    const onMouseDownTabLeft = (event, tabItem) => {
        event.preventDefault();
        const tabItemRect = tabItem.getBoundingClientRect();
        startX = event.clientX;
        startWidth = tabItem.offsetWidth;
        startLeft = tabItemRect.left - tabItem.parentElement.getBoundingClientRect().left;
    
        const boundMouseMove = (e) => onMouseMoveTabLeft(e, tabItem);
        document.addEventListener('mousemove', boundMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', boundMouseMove);
        });
    };

    const onMouseDownTabRight = (event, tabItem) => {
        event.preventDefault();
        startX = event.clientX;
        startWidth = tabItem.offsetWidth;
    
        const boundMouseMove = (e) => onMouseMoveTabRight(e, tabItem);
        document.addEventListener('mousemove', boundMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', boundMouseMove);
        });
    };

// Função de movimentação do tab-item
const onMouseMoveTabItem = (event, tabItem) => {
    const deltaX = event.clientX - startX;
    tabItem.style.left = `${startLeft + deltaX}px`;

    // Atualiza as datas ativas durante o movimento
    updateActiveDates(tabItem);
};

    const onMouseUpTabMove = (onMouseMoveHandler) => {
        document.removeEventListener('mousemove', onMouseMoveHandler);
        document.removeEventListener('mouseup', onMouseUpTabMove);
    };

// Funções para inicializar o evento de movimentação e redimensionamento
const onMouseDownTabItem = (event, tabItem) => {
    if (event.target.classList.contains('tab-item-left') || event.target.classList.contains('tab-item-right')) return;

    event.preventDefault();
    const tabItemRect = tabItem.getBoundingClientRect();
    startX = event.clientX;
    startLeft = tabItemRect.left - tabItem.parentElement.getBoundingClientRect().left;

    const boundMouseMove = (e) => onMouseMoveTabItem(e, tabItem);
    document.addEventListener('mousemove', boundMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', boundMouseMove);
    });
};


// Função para formatar uma data no formato DIA-MES-ANO
const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
// Função para adicionar tarefas à lista list-left
const appendItemList = () => {
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-item';
        taskItem.id = task.id;

        // Cria o título
        const titleElement = document.createElement('p');
        titleElement.textContent = task.title;

        // Cria o intervalo de datas
        const dateRange = document.createElement('strong');
        const formattedStartDate = formatDisplayDate(task.start_date);
        const formattedEndDate = formatDisplayDate(task.end_date);
        dateRange.textContent = `Início: ${formattedStartDate} até ${formattedEndDate}`;

        // Adiciona o título e o intervalo de datas ao item
        taskItem.appendChild(titleElement);
        taskItem.appendChild(dateRange);

        // Adiciona o item completo à lista list-left
        listLeft.appendChild(taskItem);
    });
};

    // Função para criar e adicionar tab-items com eventos de redimensionamento e movimentação
    const appendTabItems = () => {
        tasks.forEach(task => {
            const tabItem = document.createElement('div');
            tabItem.className = 'tab-item';
            tabItem.id = `tab-item-${task.id}`;

            const tabItemLeft = document.createElement('div');
            tabItemLeft.className = 'tab-item-left';
            tabItemLeft.id = `tab-item-left-${task.id}`;

            const tabItemRight = document.createElement('div');
            tabItemRight.className = 'tab-item-right';
            tabItemRight.id = `tab-item-right-${task.id}`;

            tabItemLeft.addEventListener('mousedown', (event) => onMouseDownTabLeft(event, tabItem));
            tabItemRight.addEventListener('mousedown', (event) => onMouseDownTabRight(event, tabItem));
            tabItem.addEventListener('mousedown', (event) => onMouseDownTabItem(event, tabItem));

            tabItem.appendChild(tabItemLeft);
            tabItem.appendChild(tabItemRight);

            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            listItem.id = `list-item-${task.id}`;
            listItem.appendChild(tabItem);

            listRight.appendChild(listItem);

            // Sincroniza a altura inicial com o item na list-left
            syncHeights();
        });
    };

    // Inicializa as listas
    appendTabItems();
    appendItemList();
    
    // Eventos para o redimensionamento do left-side
    leftBar.addEventListener('mousedown', onMouseDownLeftSide);
});



