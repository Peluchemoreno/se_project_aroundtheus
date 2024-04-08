import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback){
    super(selector)
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector('.modal__container')
    this._submitButton = this._form.querySelector('.modal__save-button');
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

  setEventListeners(){
    this._element.addEventListener('submit', (e)=>{
      e.preventDefault();
      // console.log(this._submitButton)
      this._submitCallback(this._getInputValues())
      this._form.reset();
      // super.close()
    })
    super.setEventListeners()
  }

  //example of loose coupling
  setSubmitHandler(handleSubmit){
    this._submitCallback = handleSubmit
  }
}