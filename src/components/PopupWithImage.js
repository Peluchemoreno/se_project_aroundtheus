import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector){
    super(selector)
    this._image = this._element.querySelector('.modal__image');
    this._caption = this._element.querySelector('.modal__image-description');
  }

  open({name, link}){
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open()
  }
}

