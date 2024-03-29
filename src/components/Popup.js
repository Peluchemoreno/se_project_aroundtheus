export default class Popup {
  constructor(selector){
    this._selector = selector
    this._element = document.querySelector(selector);
  }

  open(){
    this._element.classList.add("modal_opened");
  }
  
  close(){
    this._element.classList.remove("modal_opened");
    document.removeEventListener('keydown', this._handleEscClose)
  }
  
  _handleEscClose(e){
    this._popup = this.querySelector('.modal_opened')
    if (e.key === "Escape"){
      this._popup.classList.remove('modal_opened');
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
    document.addEventListener('keydown', this._handleEscClose)
  }
}