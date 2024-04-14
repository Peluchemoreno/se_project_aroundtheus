import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback){
    super(selector)
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector('.modal__container')
    this._inputList = Array.from(this._form.querySelectorAll('.modal__input'))
    this._submitButton = this._form.querySelector('.modal__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }
  
  _getInputValues(){
    this._inputValues = {}
    
    
    Array.from(this._form.elements).forEach(element => {
      if (element.classList.contains('modal__input')){
        this._inputValues[element.name] = element.value
      }
    })
    
    return this._inputValues
  }

  setInputValues(data){
    this._inputList.forEach(input => {
      console.log(input)
    })
    console.log(data)
  }

  renderLoading(isLoading, loadingText=`Saving...`){
    if (isLoading){
      this._submitButtonText = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText
    }
  }

  
  setEventListeners(){
    this._element.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitCallback(this._getInputValues())
    })
    super.setEventListeners()
  }

  //example of loose coupling
  setSubmitHandler(handleSubmit){
    this._submitCallback = handleSubmit
  }
}