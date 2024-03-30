export default class Popup {
  constructor(selector){
    this._selector = selector
    this._element = document.querySelector(selector);
  }

  open(){
    // console.log(this._element) // this grabs the correct modal
    this._element.classList.add("modal_opened");
    document.addEventListener('keydown', this._handleEscClose)
  }
  
  close(){
    // console.log(this._element) // this grabs the correct modal
    this._element.classList.remove("modal_opened");
    document.removeEventListener('keydown', this._handleEscClose)
  }
  
  _handleEscClose = e => {
    console.log(e)
    if (e.key === "Escape"){
      this.close();
    }
  }
  
  setEventListeners(){
    // console.log(this._element) // this grabs the correct modal
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