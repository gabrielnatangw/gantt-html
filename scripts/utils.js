export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const syncHeights = (tasks) => {
    tasks.forEach(task => {
        const leftItem = document.getElementById(task.id);
        const rightItem = document.getElementById(`list-item-${task.id}`);
        if (leftItem && rightItem) {
            rightItem.style.height = `${leftItem.offsetHeight}px`;
        }
    });
};

export const updateActiveDates = (tabItem) => {
    const tabItemLeft = tabItem.getBoundingClientRect().left;
    const tabItemRight = tabItem.getBoundingClientRect().right;

    document.querySelectorAll('.space-data').forEach(spaceData => {
        const { left: spaceDataLeft, right: spaceDataRight } = spaceData.getBoundingClientRect();

        if (
            (tabItemLeft >= spaceDataLeft && tabItemLeft <= spaceDataRight) ||
            (tabItemRight >= spaceDataLeft && tabItemRight <= spaceDataRight) ||
            (tabItemLeft <= spaceDataLeft && tabItemRight >= spaceDataRight)
        ) {
            spaceData.classList.add('active');
        } else {
            spaceData.classList.remove('active');
        }
    });
};


export const getAlignedDates = (tabItem) => {
    const tabItemLeft = tabItem.querySelector('.tab-item-left').getBoundingClientRect().left;
    const tabItemRight = tabItem.querySelector('.tab-item-right').getBoundingClientRect().right;

    let startDate = '';
    let endDate = '';

    document.querySelectorAll('.space-data').forEach(spaceData => {
        const { left: spaceDataLeft, right: spaceDataRight } = spaceData.getBoundingClientRect();
        const dateText = spaceData.id; 

        if (tabItemLeft >= spaceDataLeft && tabItemLeft <= spaceDataRight) {
            startDate = dateText;
        }
        if (tabItemRight >= spaceDataLeft && tabItemRight <= spaceDataRight) {
            endDate = dateText;
        }
    });

    return { startDate, endDate };
};
