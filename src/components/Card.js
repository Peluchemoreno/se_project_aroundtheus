import { data } from "autoprefixer";

export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick, handleLikeClick, handleDislikeClick){
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector('.card__image');
  };
  
  getCardId(){
    return this._id
  }

  delete(){
    this._cardElement.remove()
  };
  
  like(){
    this._cardElement.querySelector('.card__heart').classList.add("card__heart_active");
    this._isLiked = !this._isLiked
  };

  dislike(){
    this._cardElement.querySelector('.card__heart').classList.remove('card__heart_active');
    this._isLiked = !this._isLiked
  }

  _setEventListeners(){
    this._cardElement.querySelector('.card__heart').addEventListener('click', ()=>{
      if (this._isLiked){
        this._handleDislikeClick(this.getCardId())
      } else {
        this._handleLikeClick(this.getCardId())
      }
      
    });

    this._cardElement.querySelector('.card__delete').addEventListener('click', ()=>{
      this._handleDeleteClick(this)
    });

    this._cardImageElement.addEventListener('click', ()=>{
      this._handleImageClick(this);
    });
  };

  renderLike(){
    this._cardElement.querySelector('.card__heart').classList.add('card__heart_active')
  }

  generateCard(){
    this._cardElement.querySelector('.card__image').src = `${this.link}`;
    this._cardElement.querySelector('.card__image').alt = `${this.name}`;
    this._cardElement.querySelector('.card__title').textContent = `${this.name}`;
    if (this._isLiked){
      this.renderLike()
    }

    this._setEventListeners();
    return this._cardElement
  };
}
