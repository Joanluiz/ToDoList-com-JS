const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//Função que cria listas.
function criaLista() {
    const li = document.createElement('li');
    return li;
}

//Função para usar o botão ENTER.
inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        tarefaCriada(inputTarefa.value);
    }
});

//Função para limpar o input após apertar Enter.
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//Função de criar botão de apagar tarefa.
function bntApagar(li) {
    li.innerText +=  ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

//Funções.
function tarefaCriada(textoInput) {
    const li = criaLista();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    bntApagar(li);
    salvarTarefas();
}

//Evento de click para o botão funcionar corretamente.
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    tarefaCriada(inputTarefa.value);
})

//evento do botão e função que apaga as tarefas adicionadas 
document.addEventListener('click', function(e) {
    const el = e.target;
   
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

//usando JSON para transformar uma string JS para formato JSON.

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

//converto a string em formato JSON para JS após fazer o JSON.parse.

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        tarefaCriada(tarefa);
    }
}

adicionaTarefasSalvas();