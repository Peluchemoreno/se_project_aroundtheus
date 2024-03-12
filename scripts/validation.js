
function showInputError(formElement, input, {errorClass}){
  const errorBox = formElement.querySelector(`#${input.id}-error`);
  errorBox.classList.add(errorClass)
  errorBox.textContent = input.validationMessage;
}

function removeInputError(formElement, input, {errorClass}){
  const errorBox = formElement.querySelector(`#${input.id}-error`);
  errorBox.classList.remove(errorClass)
  errorBox.textContent = '';
}

function checkInputValidity(formElement, input, configuration){
  if (!input.validity.valid){
    showInputError(formElement, input, configuration);
    return
  } 

  removeInputError(formElement, input, configuration);

}
function setEventListeners(formElement, {inputSelector, submitButtonSelector}){
  const inputs = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector)
  inputs.forEach(input => {
    input.addEventListener('input', (e)=>{
      checkInputValidity(formElement, input, configuration);
      toggleButtonStatus(inputs, submitButton);
    })
  })
}

function disableButton(button){
  const {inactiveButtonClass} = configuration;
  button.disabled = true;
  button.classList.add(inactiveButtonClass)
}

function enableButton(button){
  const {inactiveButtonClass} = configuration;
  button.classList.remove(inactiveButtonClass)
  button.disabled = false;
}

function hasInvalidInputs(inputList){
  return !inputList.every(input =>
    input.validity.valid)
}

function toggleButtonStatus(inputs, submitButton){
  if (hasInvalidInputs(inputs)){
    disableButton(submitButton);
    return 
  }

  enableButton(submitButton);

}

function enableValidation(configuration){
  const formElements = [...document.querySelectorAll(configuration.formSelector)];
  formElements.forEach((form)=>{
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
    });

    setEventListeners(form, configuration)
  })

}

const configuration = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input:invalid",
  errorClass: "modal__error-message_visible"
}

enableValidation(configuration);