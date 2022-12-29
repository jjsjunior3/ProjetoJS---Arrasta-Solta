//Variavel
let areas = {
    a: null,
    b: null,
    c: null
};

//Events
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); //Adiiconar o evento de clicar e arrastar um objeto
    item.addEventListener('dragend', dragEnd);//evento de soltar o objeto
});

document.querySelectorAll('.area').forEach(area =>{
    area.addEventListener('dragover', dragOver); //evento para reconhecer a area que deve soltar o objeto
    area.addEventListener('dragleave', dragLeave);//Evento para reconhcer que saiu da áre que deve soltar o objeto
    area.addEventListener('drop', drop);//o evento que vai mudar o objeto do lugar
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

//Fucntions Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging'); //adicionando uma opacidade no objeto ao arrastar
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');//removendo a opacidade
}

//Function Area
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();   // evitar a ação padrão, que no caso é negar o drop
        e.currentTarget.classList.add('hover'); //adicionado uma opacidade no item que o objeto passar
    }
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover');//removendo a opacidade assim que o item sair de cima da area
}
function drop(e) {
    e.currentTarget.classList.remove('hover'); // removendo a opacidade quando soltar o objeto na area
    
    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging'); //identificar qual item estou arrastando
        e.currentTarget.appendChild(dragItem);//adicionado na nova area
        updateAreas();
    }

}
//functions Neutro area
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging'); //identificar qual item estou arrastando
    e.currentTarget.appendChild(dragItem); //adicionado na nova area
    updateAreas();
}

//Logic Functions

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => { //loop para identificar quais item estão no espaço
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {  //mudar a borda ao acertar a sequencia
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}