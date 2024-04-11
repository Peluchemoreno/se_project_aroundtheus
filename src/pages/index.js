// Imports
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

// select elements
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileFormElement = document.forms['profileForm'];
const cardAddFormElement = document.forms['cardForm'];
const avatarUpdateFormElement = document.forms['updateAvatar']
const nameInput = profileFormElement.querySelector('.modal__name');
const jobInput = profileFormElement.querySelector('.modal__description');
const avatar = document.querySelector('.profile__photo');
const avatarOverlay = document.querySelector('.profile__photo-overlay')

// create classes
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "32400e4e-bdb6-4554-9f2b-339b0c55f4e6",
    "Content-Type": "application/json",
  }
});
const avatarValidator = new FormValidator(configuration, avatarUpdateFormElement)
const cardAddValidator = new FormValidator(configuration, cardAddFormElement)
const profileFormValidator = new FormValidator(configuration, profileFormElement)
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



// define functions
function renderProfileDetails(){
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
};

function handleCardAdd(data){
  const submitButton = cardAddFormElement.querySelector('.modal__save-button')
  const text = submitButton.textContent;
  submitButton.textContent = "Saving..."

  const { name, link } = data
  api.addCard(name, link).then((data)=>{
    cardSection.addItem(createCard(data))
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    submitButton.textContent = text;
    cardModal.close()
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
  const submitButton = profileFormElement.querySelector('.modal__save-button')
  const text = submitButton.textContent;
  submitButton.textContent = "Saving..."

  const {name, description} = data;
  api.updateProfile(name, description).then(data => {
    return data
  }).then(() => {
    renderUserInfo()
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    profileModal.close()
    submitButton.textContent = text;
  })
}

function handleLikeClick(id){
  api.likeCard(id).catch(err => {
    console.error(err)
  })
}

function handleDislikeClick(id){
  api.dislikeCard(id).catch(err => {
    console.error(err)
  })
}

function renderUserInfo(){
  api.getCurrentUser().then(user => {
    userInfo.setUserInfo(user)
  }).catch(err => {
    console.error(err)
  })
}


function handleAvatarUpdate(info){
  const submitButton = avatarUpdateFormElement.querySelector('.modal__save-button')
  const text = submitButton.textContent;
  submitButton.textContent = "Saving..."
  api.updateAvatar(info.avatar).then(()=>{
    renderUserInfo()
  }).catch(err => {
    console.error(err)
  }).finally(()=>{
    changeAvatarModal.close()
    submitButton.textContent = text;
  })
}

// Instantiate Classes
cardAddValidator.enableValidation()
profileFormValidator.enableValidation()
avatarValidator.enableValidation()
profileModal.setEventListeners();
cardModal.setEventListeners();
popupWithImage.setEventListeners()
deleteConfirmModal.setEventListeners();
changeAvatarModal.setEventListeners();

// add event listeners
editButton.addEventListener('click', ()=>{
  profileModal.open()
  renderProfileDetails();
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
})

//On window load
api.getCurrentUser().then(data => {
  userInfo.setUserInfo(data)
});

api.checkAllData(()=>{
  api.getCards().then(cards => {
    cards.forEach(card => {
      const cardEl = createCard(card)
      cardSection.addItem(cardEl)
    })
  }).catch(err => {
    console.error(err)
  })
}).catch(err => {
  console.error(err)
})

//test


//test