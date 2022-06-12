const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Elon Musk',
  'Bernard Arnault',
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Mukesh Ambani',
  'Gautam Adani & Family',
  'Larry Page',
  'Larry Ellison',
  'Sergey Brin',
];

const listItems = [];

let dragStartIndex = null;

createList();

function createList() {
  [...richestPeople]
  .map((a => ({ value: a, sort: Math.random() })))
  .sort((a, b) => a.sort - b.sort)
  .forEach((person, index) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person.value}</p>
        <span class="drag-icon"></span>
      </div>
    `;

    listItems.push(listItem);

    draggableList.append(listItem);
  });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = parseInt(this.closest('li').dataset.index);
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = parseInt(this.dataset.index);
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].append(itemTwo);
  listItems[toIndex].append(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').textContent.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
