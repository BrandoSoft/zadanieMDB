import * as mdb from 'mdb-ui-kit';

const addItemInput = document.querySelector('#addItemInput');
const quantityInput = document.querySelector('#quantityInput');
const weightInput = document.querySelector('#weightInput');
const editInput = document.querySelector('#editInput');
const editQuantityInput = document.querySelector('#editQuantityInput');
const editWeightInput = document.querySelector('#editWeightInput');
const selectInput = document.querySelector('#selectInput');
const selectEditInput = document.querySelector('#selectEditInput');
const addItemButton = document.querySelector('#addItemButton');
const saveEditButton = document.querySelector('#saveEditButton');
const foodCounter = document.querySelector('#foodCounter');
const drinksCounter = document.querySelector('#drinksCounter');
const chemistryCounter = document.querySelector('#chemistryCounter');
const othersCounter = document.querySelector('#othersCounter');

const foodLi = document.querySelector('#foodLi');
const drinksLi = document.querySelector('#drinksLi');
const chemistryLi = document.querySelector('#chemistryLi');
const othersLi = document.querySelector('#othersLi');

const quantityRadio = document.querySelector('#quantityRadio');
const weightRadio = document.querySelector('#weightRadio');

const items = [];

const quantityWeightChanger = () => {
  if (quantityRadio.checked) {
    quantityInput.classList.remove('d-none');
    weightInput.classList.add('d-none');
  }
  if (weightRadio.checked) {
    quantityInput.classList.add('d-none');
    weightInput.classList.remove('d-none');
  }
};
const makeComplite = (e) => {
  e.target.parentNode.firstChild.classList.toggle('jobDone');
};

const createLists = () => {
  foodLi.textContent = '';
  drinksLi.textContent = '';
  chemistryLi.textContent = '';
  othersLi.textContent = '';
  items.forEach((element) => {
    const toDoDiv = document.createElement('div');
    const divWithName = document.createElement('div');
    const newLi = document.createElement('li');
    newLi.appendChild(divWithName);
    toDoDiv.appendChild(newLi);
    divWithName.textContent = element.name;
    newLi.classList.add('list-group-item', 'mt-1', 'd-flex', 'justify-content-between');

    if (element.quantity) {
      const pQuantity = document.createElement('div');
      pQuantity.textContent = ` ${element.quantity} szt.`;
      newLi.appendChild(pQuantity);
    }
    if (element.weight) {
      const pWeight = document.createElement('div');
      pWeight.textContent = `${element.weight} g.`;
      newLi.appendChild(pWeight);
    }

    const complitedButton = document.createElement('button');
    complitedButton.innerHTML = '<i class="fas fa-check"></i>';
    complitedButton.classList.add('btn');
    toDoDiv.appendChild(complitedButton);
    complitedButton.addEventListener('click', makeComplite);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('btn');
    toDoDiv.appendChild(editButton);
    const attribute1 = document.createAttribute('data-toggle');
    attribute1.value = 'modal';
    const attribute2 = document.createAttribute('data-target');
    attribute2.value = '#centralModalSm';
    editButton.setAttributeNode(attribute1);
    editButton.setAttributeNode(attribute2);
    editButton.addEventListener('click', editItems);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('btn');
    toDoDiv.appendChild(deleteButton);
    deleteButton.addEventListener('click', removeFromItems);

    if (element.type === 'food') {
      foodLi.appendChild(toDoDiv);
    }
    if (element.type === 'drinks') {
      drinksLi.appendChild(toDoDiv);
    }
    if (element.type === 'chemistry') {
      chemistryLi.appendChild(toDoDiv);
    }
    if (element.type === 'others') {
      othersLi.appendChild(toDoDiv);
    }
  });

  foodCounter.textContent = `${items.filter((x) => x.type === 'food').length} 
  ${items.filter((x) => x.type === 'food').length >= 2 ? 'items' : 'item'}`;

  drinksCounter.textContent = `${items.filter((x) => x.type === 'drinks').length} 
  ${items.filter((x) => x.type === 'drinks').length >= 2 ? 'items' : 'item'}`;

  chemistryCounter.textContent = `${items.filter((x) => x.type === 'chemistry').length} 
  ${items.filter((x) => x.type === 'chemistry').length >= 2 ? 'items' : 'item'}`;

  othersCounter.textContent = `${items.filter((x) => x.type === 'others').length} 
  ${items.filter((x) => x.type === 'others').length >= 2 ? 'items' : 'item'}`;
};

const addItemToArray = () => {
  if (addItemInput.value) {
    const newItemInArray = {
      name: addItemInput.value,
      type: selectInput.value,
      quantity: quantityInput.value,
      weight: weightInput.value,
    };

    items.push(newItemInArray);

    addItemInput.value = '';
    selectInput.value = 'food';
    quantityInput.value = '';
    weightInput.value = '';
  }

  sendToLocal();
  createLists();
};

const removeFromItems = (e) => {
  const targetContent = e.target.parentNode.firstChild.firstChild.textContent;
  const indexNumber = items.findIndex((x) => x.name === targetContent);
  items.splice(indexNumber, 1);
  createLists();
};

const editItems = (e) => {
  const targetContent = e.target.parentNode.firstChild.firstChild.textContent;
  const indexNumber = items.findIndex((x) => x.name === targetContent);

  selectEditInput.value = '';
  editInput.value = '';
  editWeightInput.value = '';
  editQuantityInput.value = '';
  editWeightInput.classList.add('d-none');
  editQuantityInput.classList.add('d-none');

  if (items[indexNumber].weight) {
    editWeightInput.classList.remove('d-none');
  }
  if (items[indexNumber].quantity) {
    editQuantityInput.classList.remove('d-none');
  }

  const editName = () => {
    if (editInput.value.length) {
      items[indexNumber].name = editInput.value;
    }
    if (selectEditInput.value.length) {
      items[indexNumber].type = selectEditInput.value;
    }
    if (editQuantityInput.value.length) {
      items[indexNumber].quantity = editQuantityInput.value;
    }
    if (editWeightInput.value.length) {
      items[indexNumber].weight = editWeightInput.value;
    }
    createLists();
    sendToLocal();
  };
  saveEditButton.addEventListener('click', editName);
};

const sendToLocal = () => {
  const itemsSerialized = JSON.stringify(items);
  localStorage.setItem('shopingList', itemsSerialized);
};
const getFromLocale = () => {
  const itemsFromLocal = localStorage.getItem('shopingList');
  const itemFromLocalAfterParse = JSON.parse(itemsFromLocal);
  itemFromLocalAfterParse.forEach((item) => {
    items.push(item);
  });
  createLists();
};

quantityRadio.addEventListener('click', quantityWeightChanger);
weightRadio.addEventListener('click', quantityWeightChanger);
addItemButton.addEventListener('click', addItemToArray);
document.addEventListener('DOMContentLoaded', getFromLocale);

export default {
  mdb,
};
