// Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { configuration } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { userConfigData } from "../utils/constants.js";

// select elements
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button')
const profileFormElement = document.forms['profileForm'];
const cardAddFormElement = document.forms['cardForm'];
const nameInput = profileFormElement.querySelector('.modal__name');
const jobInput = profileFormElement.querySelector('.modal__description');
const cardTitleInput = cardAddFormElement.querySelector('.modal__name')
const cardImageLinkInput = cardAddFormElement.querySelector(".modal__description")
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const cardModal = document.querySelector('.modal_type_card');
const profileForm = document.querySelector('#profileForm')
const addForm = document.querySelector('#cardForm')

// create classes
const addFormElement = new FormValidator(configuration, profileForm)
const profileEditForm = new FormValidator(configuration, addForm)
const cardFormFromClass = new PopupWithForm(".modal_type_card", handleCardAdd);
const profileFormFromClass = new PopupWithForm(".modal_type_profile", formSubmitCallback);
const userInfo = new UserInfo(userConfigData);
const cardSection = new Section({
  items: initialCards,
  renderer: ()=>{
    initialCards.forEach(item => {
      const itemElement = createCard(item);
      cardSection.addItem(itemElement)
    })
  }
}, ".cards");


// define functions
function renderProfileDetails(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function closeModal(element){
  element.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscapeClose)
};

function handleCardAdd(){
  const card = {
    name: cardTitleInput.value,
    link: cardImageLinkInput.value
  }
  const cardElement = createCard(card)
  cardsContainer.prepend(cardElement)
  closeModal(cardModal)
};

function handleImageClick(image){
  const popupWithImage = new PopupWithImage('.modal_type_image');
  const data = {
    name: image._name,
    link: image._link
  }
  popupWithImage.setEventListeners()
  popupWithImage.open(data)
};

function createCard(cardData){
  const card = new Card(cardData, '.card-template', handleImageClick);
  return card.generateCard()
};

function formSubmitCallback(data){
  userInfo.setUserInfo(data);
}

// Instantiate Classes
addFormElement.enableValidation()
profileEditForm.enableValidation()
cardSection.renderItems();
profileFormFromClass.setEventListeners();
cardFormFromClass.setEventListeners();

// add event listeners
editButton.addEventListener('click', ()=>{
  profileFormFromClass.open()
  renderProfileDetails();
});

addCardButton.addEventListener('click', ()=>{
  cardFormFromClass.open()
  profileEditForm.disableButton()
});





// test area ==============================================

//========================================================