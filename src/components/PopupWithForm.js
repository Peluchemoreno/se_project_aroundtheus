import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback){
    super(selector)
    this._submitCallback = submitCallback;
    this._element = document.querySelector(selector)
    this._form = this._element.querySelector('.modal__container')
  }

  getInputValues(form){
    this._inputValues = {}

    Array.from(form).forEach(element => {
      if (element.classList.contains('modal__input')){
        this._inputValues[element.name] = element.value
      }
    })
    
    return this._inputValues
    // console.log(this._inputValues)
  }

  setEventListeners(){
    this._element.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitCallback(this.getInputValues(this._form))
      this._form.reset();
      super.close()
    })
    super.setEventListeners()
  }
}