import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback){
    super(selector)
    this._submitCallback = submitCallback;
    this._form = this._element.querySelector('.modal__container')

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
      this._submitCallback(this._getInputValues())
      this._form.reset();
    })
    super.setEventListeners()
  }

  //example of loose coupling
  setSubmitHandler(handleSubmit){
    this._submitCallback = handleSubmit
  }
}