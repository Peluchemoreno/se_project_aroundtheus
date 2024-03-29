export default class Popup {
  constructor(selector){
    this._selector = document.querySelector(selector)
  }

  open(){
    this._selector.classList.add("modal_opened");
  }
  
  close(){
    this._selector.classList.remove("modal_opened");
  }
  
  _handleEscClose(e){
    if (e.key === "Escape"){
      this.close();
    }
  }
  
  setEventListeners(){
    this._closeButton = this._selector.querySelector('.modal__close-button');
    this._closeButton.addEventListener('click', ()=>{
      console.log(this._selector)
      this.close();
    });
    this._selector.addEventListener('mousedown', e => {
      if (e.target.className === `modal modal_type_${this._selector.id} modal_opened`){
        this.close()
      }
    })
    document.addEventListener('keydown', (e)=>{
      this._handleEscClose(e)
    })
  }
}