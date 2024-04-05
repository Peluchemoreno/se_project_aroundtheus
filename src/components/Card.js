import { data } from "autoprefixer";

export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick){
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick
  };
  
  _delete(){
    this._cardElement.remove();
    this._handleDeleteClick(this._id)
  };
  
  _like(){
    this._cardElement.querySelector('.card__heart').classList.toggle("card__heart_active");
  };

  _setEventListeners(){
    this._cardImageElement = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__heart').addEventListener('click', ()=>{
      this._like();
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click', ()=>{
      this._delete();
    });

    this._cardImageElement.addEventListener('click', ()=>{
      console.log(this._id)
      this._handleImageClick(this);
    });
    };

  
  generateCard(){
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    this._cardElement.querySelector('.card__image').src = `${this.link}`;
    this._cardElement.querySelector('.card__image').alt = `${this.name}`;
    this._cardElement.querySelector('.card__title').textContent = `${this.name}`;
    this._setEventListeners();
    return this._cardElement
  };
}
