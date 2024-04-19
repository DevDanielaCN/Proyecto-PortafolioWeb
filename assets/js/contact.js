'use strict';
// VARIABLES GENERALES

let form = document.getElementById('form');
let btnForm = document.getElementById('btn_form');
let errorsContainer = document.getElementById('errors');
let arrayInputs = document.querySelectorAll('[validate-data="true"]');
let arrayErrors = [];
let regexEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
let maxlengthTxt = 50;
let maxLengthTA = 300;

document.addEventListener("DOMContentLoaded", function(){
    runEvents();
})

function runEvents() {
    btnForm.disabled = true;
    btnForm.addEventListener("click", function(e) {
        validarFormulario();
        form.onsubmit();
    });
   
    arrayInputs.forEach(input => {
        input.addEventListener('input', validarFormulario);
    });
}

function validarFormulario(event) {
    event.preventDefault();

    arrayErrors = [];

    arrayInputs.forEach(function(item, index){
        
        if( item.getAttribute('id') === 'name' && item.value !== '' && item.value.length > maxlengthTxt){
            arrayErrors.push(`${item.getAttribute('placeholder')} tiene más de ${maxlengthTxt} caracteres y`);
            item.classList.add('invalid');
        }
        else if( item.getAttribute('id') === 'matter' && item.value !== '' && item.value.length > maxlengthTxt){
            arrayErrors.push(`${item.getAttribute('placeholder')} tiene más de ${maxlengthTxt} caracteres y`);
            item.classList.add('invalid');
        }
        else if(item.type === 'email' && !regexEmail.test(item.value) && item.value !== ''){
            arrayErrors.push(`${item.getAttribute('placeholder')} no es correcto y`);
            item.classList.add('invalid');
        }
        else if( item.getAttribute('id') === 'message' && item.value.length > maxLengthTA && item.value !== ''){
            arrayErrors.push(`${item.getAttribute('placeholder')} tine más de ${maxLengthTA} caracteres y `);
            item.classList.add('invalid');
        }
        else if(item.value === ''){
            arrayErrors.push(item.getAttribute('placeholder'));
            item.classList.add('invalid');
        }else {
            item.classList.remove('invalid');

        }
    });

    if(!arrayErrors.length){
        btnForm.disabled = false;
        errorsContainer.innerHTML = '';
            arrayInputs.forEach(function(item){
                item.classList.remove('invalid');
        });

    }else{
        if(errorsContainer.innerHTML === ''){
            arrayErrors.forEach(function(item){
                const msError = document.createElement('li');
                msError.textContent = `El campo ${item} es obligatorio`;
                errorsContainer.appendChild(msError);
            });

        }
    }
    

}
