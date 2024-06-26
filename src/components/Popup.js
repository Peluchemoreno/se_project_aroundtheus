export default class Popup {
  constructor(selector, handleSubmit){
    this._selector = selector
    this._element = document.querySelector(selector);
    this._handleSubmit = handleSubmit
  }

  open(){
    this._element.classList.add("modal_opened");
    document.addEventListener('keydown', this._handleEscClose)
  }
  
  close(){
    this._element.classList.remove("modal_opened");
    document.removeEventListener('keydown', this._handleEscClose)
  }
  
  _handleEscClose = e => {
    if (e.key === "Escape"){
      this.close();
    }
  }
  
  setEventListeners(){
    this._closeButton = this._element.querySelector('.modal__close-button');
    this._closeButton.addEventListener('click', ()=>{
      this.close();
    });
    this._element.addEventListener('mousedown', e => {
      if (e.target.className === `modal modal_type_${this._element.id} modal_opened`){
        this.close()
      }
    })
  }
}