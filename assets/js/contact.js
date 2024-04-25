'use strict';
// VARIABLES GENERALES

const form = document.getElementById('form');
const btnForm = document.getElementById('btn_form');
const errorsContainer = document.getElementById('errors');
const arrayInputs = document.querySelectorAll('[validate-data="true"]');
const carga = document.getElementById('loader');
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
        e.preventDefault();
        validarFormulario();
        // Mostrar la animación de carga
        carga.style.display = "flex";
        btnForm.style.display = 'none';
        setTimeout(function () {
            form.submit(); // Envía el formulario después de un cierto tiempo (en este caso, después de 5 segundos)

        }, 3000);
    });
   
    arrayInputs.forEach(input => {
        input.addEventListener('input', validarFormulario);
    });
}

function validarFormulario(event) {

    arrayErrors = [];

    arrayInputs.forEach(function(item, index){
        
        if( item.getAttribute('id') === 'name' && item.value !== '' && item.value.length > maxlengthTxt){
            arrayErrors.push(`${item.getAttribute('placeholder')} tiene más de ${maxlengthTxt} caracteres y`);
            item.classList.add('invalid');
        }
        else if( item.getAttribute('id') === 'matter' && item.value !== '' && item.value.length > maxlengthTxt){
            arrayErrors.push(`${item.getAttribute('placeholder')} tiene más de ${maxlengthTxt} caracteres y`);
            item.classList.add('invalid');
            return
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
