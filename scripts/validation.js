
function showInputError(formElement, input, configuration){
  console.log(input.id)
  const errorBox = formElement.querySelector(`#${input.id}-error`);
  console.log(errorBox)
}

function removeInputError(formElement, input, configuration){

}

function checkInputValidity(formElement, input, configuration){
  if (!input.validity.valid){
    showInputError(formElement, input, configuration)
  } else {
    removeInputError();
  }
}

function setEventListeners(formElement, configuration){

  const {inputSelector} = configuration;
  const {submitButtonSelector} = configuration;
  const modalErrorTextContainer = formElement.querySelector('.modal__error-message')
  const inputs = [...formElement.querySelectorAll(inputSelector)];
  console.log(inputs)
  inputs.forEach(input => {
    input.addEventListener('input', (e)=>{
      checkInputValidity(formElement, input, configuration)
    })
  })
}

function enableValidation(configuration){
  const formElements = [...document.querySelectorAll(configuration.formSelector)];
  formElements.forEach((form)=>{
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      console.log('submitted')
    });

    setEventListeners(form, configuration)

    //search for all inputs inside of form
    //loop through all inputs and test if they are all valid
      //if input is not valid
        //disable button
        //add error class to input
        //generate error message
        //display error message
      //if input is valid
        //enable button
        //remove error class from input
        //hide error message
        //reset error messages


    

  })

}

function deactivateSubmitButton(button){
  const {inactiveButtonClass} = configuration;
  button.classList.add(inactiveButtonClass);
}

function activateSubmitButton(button){
  const {inactiveButtonClass} = configuration;
  button.classList.remove(inactiveButtonClass);
}

const configuration = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_status_invalid",
  errorClass: "popup__error_visible"
}

enableValidation(configuration);