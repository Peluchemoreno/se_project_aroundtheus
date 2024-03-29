export default class Card {
  constructor(data, cardSelector, handleImageClick){
    this.title = data.title;
    this.url = data.url;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  };
  
  _delete(){
    this._cardElement.remove();
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
      this._handleImageClick(this);
    });
    };

  
  generateCard(){
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    this._cardElement.querySelector('.card__image').src = `${this.url}`;
    this._cardElement.querySelector('.card__image').alt = `${this.title}`;
    this._cardElement.querySelector('.card__title').textContent = `${this.title}`;
    this._setEventListeners();
    return this._cardElement
  };
}
