import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
  }

  open({name, link}){
    this._image = this._selector.querySelector('.modal__image');
    this._caption = this._selector.querySelector('.modal__image-description');
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open()
  }
}

