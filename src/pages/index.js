/* ------------------------------------------------------ */
/*                        Imports                       */
/* ------------------------------------------------------ */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { configuration } from "../utils/constants.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { userConfigData } from "../utils/constants.js";
import "./index.css"
import Api from "../components/Api.js";
import { _ } from "core-js";

/* ------------------------------------------------------ */
/*                     select elements                    */
/* ------------------------------------------------------ */
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileFormElement = document.forms['profileForm'];
const avatar = document.querySelector('.profile__photo');
const avatarOverlay = document.querySelector('.profile__photo-overlay')

/* ------------------------------------------------------ */
/*                     create classes                     */
/* ------------------------------------------------------ */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "32400e4e-bdb6-4554-9f2b-339b0c55f4e6",
    "Content-Type": "application/json",
  }
});
const deleteConfirmModal = new PopupWithForm('.modal_type_delete-confirmation');
const changeAvatarModal = new PopupWithForm('.modal_type_update-avatar', handleAvatarUpdate)
const cardModal = new PopupWithForm(".modal_type_card", handleCardAdd);
const profileModal = new PopupWithForm(".modal_type_profile", handleProfileFormSubmit);
const userInfo = new UserInfo(userConfigData);
const cardSection = new Section({
  items: initialCards,
  renderer: (item)=>{
    const itemElement = createCard(item);
    cardSection.addItem(itemElement)
  }
}, ".cards");
const popupWithImage = new PopupWithImage('.modal_type_image');


/* ------------------------------------------------------ */
/*                    define functions                    */
/* ------------------------------------------------------ */

function renderProfileDetails(modal){
  const { name, about } = userInfo.getUserInfo();
  modal.setInputValues({name, about})
};

function handleCardAdd(data){
  this.renderLoading(true)
  const { name, link } = data
  api.addCard(name, link).then((data)=>{
    cardSection.addItem(createCard(data));
    formValidators['cardForm'].disableButton();
    formValidators['cardForm'].resetInputs();
    cardModal.close()
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    this.renderLoading(false)
  });
};

function handleImageClick(image){
  const data = {
    name: image.name,
    link: image.link
  }
  popupWithImage.open(data)
};

function handleDeleteClick(card){
  deleteConfirmModal.open()
  
  deleteConfirmModal.setSubmitHandler(()=>{
    api.deleteCard(card.getCardId()).then(()=>{
      card.delete()
      deleteConfirmModal.close()
    }).catch(err => {
      console.error(err)
    })
  })
}

function createCard(cardData){
  const card = new Card(cardData, '.card-template', handleImageClick, handleDeleteClick, handleLikeClick, handleDislikeClick);
  return card.generateCard()
};

function handleProfileFormSubmit(data){
  this.renderLoading(true)
  const {name, about} = data;
  api.updateProfile(name, about).then(data => {
    return data
  }).then((info) => {
    userInfo.setUserInfo(info)
    formValidators['profileForm'].disableButton();
    formValidators['profileForm'].resetInputs();
    profileModal.close()
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    this.renderLoading(false)
  })
}

function handleLikeClick(id){
  api.likeCard(id)
  .then(()=>{
    this.like()
  })
  .catch(err => {
    console.error(err)
  })
}

function handleDislikeClick(id){
  api.dislikeCard(id)
  .then(()=> {
    this.dislike()
  })
  .catch(err => {
    console.error(err)
  })
}

function handleAvatarUpdate(info){
  this.renderLoading(true)
  api.updateAvatar(info.avatar).then((info)=>{
    userInfo.setUserInfo(info)
    formValidators['updateAvatar'].disableButton();
    formValidators['updateAvatar'].resetInputs();
    changeAvatarModal.close()
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    this.renderLoading(false)
  })
}

const formValidators = {};
function enableValidation(config){
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('id');
    
    formValidators[formName] = validator;
    validator.enableValidation()
  })
}

enableValidation(configuration)

/* ------------------------------------------------------ */
/*                   add event listeners                  */
/* ------------------------------------------------------ */
profileModal.setEventListeners();
cardModal.setEventListeners();
popupWithImage.setEventListeners()
deleteConfirmModal.setEventListeners();
changeAvatarModal.setEventListeners();
editButton.addEventListener('click', ()=>{
  profileModal.open()
  renderProfileDetails(profileModal);
});

addCardButton.addEventListener('click', ()=>{
  cardModal.open()
});

avatar.addEventListener('mouseover', ()=>{
  avatarOverlay.classList.add('profile__photo-overlay_visible')
})

avatarOverlay.addEventListener('mouseout', ()=> {
  avatarOverlay.classList.remove('profile__photo-overlay_visible')
})

avatarOverlay.addEventListener('click', ()=>{
  changeAvatarModal.open()
  formValidators['updateAvatar'].disableButton();
})

/* ------------------------------------------------------ */
/*                         onload                         */
/* ------------------------------------------------------ */
api.checkAllData()
.then(([cards, userData])=>{
  userInfo.setUserInfo(userData)
  cards.forEach(card => {
    cardSection.addItem(createCard(card))
  })
}).catch(err => {
  console.error(err)
})
