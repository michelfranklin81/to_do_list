'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; // função que diz - Pegue do banco(localStorage, senão vazio)
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));
const criarItem = (tarefa, status, indice) => { //Esta função vai criar uma tarefa 
  const item = document.createElement('label'); 
  item.classList.add('todo__item'); //Criei uma classe (todo__item) para a label acima
  item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
  <div>${tarefa}</div>
  <input type="button" value="X" data-indice=${indice}> `
  document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList')
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

const atualizarTela = () => { //Sempre que meu banco for modificado o atualizarTela será chamado para mostrar novamente na tela
  limparTarefas();
  const banco = getBanco();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value
  if (tecla === 'Enter') {
    const banco = getBanco();
    banco.push({ 'tarefa': texto, 'status': '' });
    setBanco(banco);
    atualizarTela();
    evento.target.value = ''; // Posso limpar o imput com este comando ou através de uma função.
  }
}

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1); //comando para remover um indice do array a partir do indice 1 neste caso
  setBanco(banco);
  atualizarTela();
}
const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco);
  atualizarTela();
}
const clickItem = (evento) => {
  const elemento = evento.target;
  if (elemento.type === 'button') {
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela();