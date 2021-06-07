
function fncCreateHexColor(nCharacters) {
  let strLettersAndNumbers = "ABCDEF0123456789"
  let arrLettersAndNumbers = strLettersAndNumbers.split('');
  let strHexaColor = "#";
  for (let index = 0; index < nCharacters; index += 1) {
    let i = parseInt(Math.random() * (arrLettersAndNumbers.length - 1));
    let char = arrLettersAndNumbers[i];
    strHexaColor += char;
  }
  return strHexaColor;
}

function createColorPalette (QuantidadeDeCores) {    
  for (let index = 0; index < QuantidadeDeCores; index += 1) {                    
    let divIndividualColor = document.createElement("div");        
    divIndividualColor.className = 'color';
    if (index == 0) {      
      divIndividualColor.style.backgroundColor = 'rgb(0,0,0)';      
    } else {      
      strBackgroundColor = fncCreateHexColor(6);
      divIndividualColor.style.backgroundColor = strBackgroundColor;
    }
    document.querySelector('#color-palette').appendChild(divIndividualColor);    
  }
}

createColorPalette(4);

function createTable(rows, columns) {  
  let divTable = document.querySelector('#pixel-board');
  // let divTableChildren = document.querySelector('#pixel-board').children
  while (divTable.hasChildNodes()) { // Sempre irá deletar os nós filhos antes de criar um novo
    divTable.removeChild(divTable.firstChild);
  }
  
  // if (rows < 5 || columns > 50) {
  //   rows = 5;
  //   columns = 50;
  // }
  
  for (let index = 0; index < rows; index += 1) {
    let divRow = document.createElement('div');
    divRow.className = 'table-row';
    divTable.appendChild(divRow);
    for (let i = 0; i < columns; i += 1) {
      let divPixel = document.createElement('div');
      divPixel.className = 'pixel';
      divRow.appendChild(divPixel);
    }
  }
}

createTable(5,5);

window.addEventListener('load', function() {
  let firsColorSelected = document.getElementsByClassName('color')[0];
  firsColorSelected.className = 'color selected';
  // firsColorSelected.style.backgroundColor = 'rgb(0,0,0)';
  sessionStorage.setItem('Color Selected', 'rgb(0,0,0)') // Reset de cor selecionada para 'black'
}) 

let listDivsColorsPalette = document.querySelector('#color-palette');

listDivsColorsPalette.addEventListener('click', function(elemento) {
  document.getElementsByClassName('color selected')[0].className = 'color';
  let strColorSelected = elemento.target.style.backgroundColor;
  elemento.target.className = 'color selected';
  sessionStorage.setItem('Color Selected', strColorSelected);
});

function fncRefreshEventListenerOfBoardDivs() {
  let divPixel = document.getElementsByClassName('pixel');
  for (let elemento of divPixel) {
    elemento.addEventListener('click', function(elementoDiv) {
      let strColorToApply = sessionStorage.getItem('Color Selected');
      elementoDiv.target.style.backgroundColor = strColorToApply;
    })
  }
}

fncRefreshEventListenerOfBoardDivs();

btnClearBoard = document.createElement('button');
btnClearBoard.id = 'clear-board';
btnClearBoard.innerHTML = 'Limpar';
btnClearBoard.style.margin = '0px 0px 15px 0px'
document.getElementById('btn-place').appendChild(btnClearBoard);

btnClearBoard.addEventListener('click', function() {
  let divPixel = document.getElementsByClassName('pixel');
  for (let elemento of divPixel) {      
    elemento.style.backgroundColor = 'rgb(255,255,255)';
  }
})

// Bônus

let inputBoardSize = document.createElement('input');
inputBoardSize.id = 'board-size';
inputBoardSize.className = 'input-board-size'
inputBoardSize.type = 'number';
inputBoardSize.placeholder = 'Qtde Pixels';
inputBoardSize.maxLength = '2';
// inputBoardSize.max = '50';
inputBoardSize.min = '1'; 
document.getElementById('btn-place').appendChild(inputBoardSize);
let intLengthOfBoxPixel = document.getElementById('board-size').value;

let btnGenerateBoard = document.createElement('button');
btnGenerateBoard.id = 'generate-board';
btnGenerateBoard.className = 'btn-generate-board';
btnGenerateBoard.innerHTML = 'VQV'
document.getElementById('btn-place').appendChild(btnGenerateBoard);

// Função que retorna booleano ref a typeOf === 'string'
// Source: https://www.codegrepper.com/code-examples/javascript/javascript+check+if+type+is+not+string
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

let btnGenerateBoardReady = document.getElementById('generate-board');

btnGenerateBoardReady.addEventListener('click', function() {  
  let intLengthOfBoxPixel = parseInt(document.getElementById('board-size').value);
  let strLengthOfBoxPixel = document.getElementById('board-size').value;
  // let blnNotIsString = (typeof intLengthOfBoxPixel !== 'string'); // Maneira alternativa de verificar se é string
  if (strLengthOfBoxPixel === "") {
    alert('Board inválido!');    
  } else if (intLengthOfBoxPixel > 0 && isString(intLengthOfBoxPixel) === false) {    
    if (intLengthOfBoxPixel < 5) {
      intLengthOfBoxPixel = 5;
    } else if (intLengthOfBoxPixel > 50) {
      intLengthOfBoxPixel = 50;
    }        
  }
  createTable(intLengthOfBoxPixel, intLengthOfBoxPixel);
  fncRefreshEventListenerOfBoardDivs();   
})
