import Sum from './sum';

let a = document.getElementById('input-a');
let b = document.getElementById('input-b');
const oBtn = document.getElementsByTagName('button')[0];


oBtn.onclick = function(){
  const aVal = a.value;
  const bVal = b.value;
  Sum(aVal,bVal)
}

