export const generateDates = (headerDataRight) => {
    return new Promise((resolve) => {
        const today = new Date();

        for (let i = 30; i > 0; i--) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);

            const dateElement = createSpaceData(pastDate);
            headerDataRight.appendChild(dateElement);
        }

        const todayElement = createSpaceData(today, true);
        headerDataRight.appendChild(todayElement);

        for (let i = 1; i <= 30; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);

            const dateElement = createSpaceData(futureDate);
            headerDataRight.appendChild(dateElement);
        }

        resolve();
    });
}

const createSpaceData = (date, isActive = false) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayName = date.toLocaleString('default', { weekday: 'short' });
    const formattedDate = `${day}/${month}/${year}`;

    const dateElement = document.createElement('div');
    dateElement.className = `space-data ${isActive ? 'active' : ''}`;
    dateElement.id = formattedDate;
    dateElement.innerHTML = `<strong>${dayName}</strong><p>${day}</p>`;

    return dateElement;
};

export const scrollToToday = () => {
    const todayElement = document.querySelector('.space-data.active');
    if (todayElement) {
        todayElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
};
