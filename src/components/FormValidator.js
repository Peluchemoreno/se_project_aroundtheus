export default class FormValidator {
  constructor(configuration, form){
    this._formSelector = configuration.formSelector;
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inactiveButtonClass = configuration.inactiveButtonClass;
    this._inputErrorClass = configuration.inputErrorClass;
    this._errorClass = configuration.errorClass;
    this._errorContainer = configuration.errorContainer;
    this._form = form;
  };

  _showInputError(input){
    const errorBox = this._form.querySelector(`#${input.id}-error`);
    errorBox.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
    errorBox.textContent = input.validationMessage;
  };
  
  _removeInputError(input){
    const errorBox = this._form.querySelector(`#${input.id}-error`);
    errorBox.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    errorBox.textContent = '';
  };

  _hasInvalidInputs(){
    return !this._inputs.every(input =>
      input.validity.valid);
  };

  _toggleButtonStatus(){
    if (this._hasInvalidInputs(this._inputs)){
      this.disableButton(this._submitButton);
      return 
    }
    this._enableButton(this._submitButton);  
  };

  _checkInputValidity(input){
    if (!input.validity.valid){
      this._showInputError(input);
      return
    };
    this._removeInputError(input);  
  };

  resetInputs(){
    this._form.reset();
  };

  disableButton(){
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };
  
  _enableButton(){
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  };
  
  _setEventListeners(){
    this._inputs = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputs.forEach(input => {
      input.addEventListener('input', (e)=>{
        this._checkInputValidity(input);
        this._toggleButtonStatus(this._submitButton);
      });
    });
  };
  
  enableValidation(){
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this.disableButton();
    });
    this._setEventListeners();
  }
};

