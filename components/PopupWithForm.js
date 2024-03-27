import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback){
    super(selector)
    this._submitCallback = submitCallback;
  }

  _getInputValues(){
    this._inputValues = {
      name: this._selector.querySelector('.modal__name').value,
      description: this._selector.querySelector('.modal__description').value,
    }
    return this._inputValues
  }

  setEventListeners(){
    this._selector.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitCallback(this._getInputValues())
      this._selector.reset();
      super.close()
    })
    super.setEventListeners()
  }
}