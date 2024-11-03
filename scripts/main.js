// main.js

import { generateTasks, appendItemList, appendTabItems,addTask } from './tasks.js';
import { generateDates, scrollToToday } from './dates.js';
import { syncHeights, updateActiveDates } from './utils.js';
import { onMouseDownLeftSide } from './dragResize.js';

document.addEventListener('DOMContentLoaded', () => {
    const leftContainer = document.querySelector('#left-side');
    const listLeft = document.querySelector('#list-left');
    const listRight = document.getElementById('list-right');
    const headerDataRight = document.querySelector('.right-side .header-data');
    const leftBar = document.querySelector('#left-side-resize-bar');
    const button = document.querySelector('#btn');
    const tasks = [];

    generateDates(headerDataRight).then(() => {
        scrollToToday();

        // const tasks = generateTasks(10);
        appendItemList(tasks, listLeft);
        appendTabItems(tasks, listRight, updateActiveDates);

        syncHeights(tasks);
        button.addEventListener('click',()=>addTask(tasks))
        leftBar.addEventListener('mousedown', (event) => onMouseDownLeftSide(event, leftContainer, () => syncHeights(tasks)));
    });
});
