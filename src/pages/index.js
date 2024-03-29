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
import "./index.css"

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

// create classes
const cardAddValidator = new FormValidator(configuration, cardAddFormElement)
const profileFormValidator = new FormValidator(configuration, profileFormElement)
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
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
};

function handleCardAdd(){
  const card = cardModal.getInputValues(cardAddFormElement)
  const cardElement = createCard(card)
  cardSection.addItem(cardElement)
  cardModal.close()
};

function handleImageClick(image){
  const data = {
    name: image.title,
    link: image.url
  }
  popupWithImage.setEventListeners()
  popupWithImage.open(data)
};

function createCard(cardData){
  const card = new Card(cardData, '.card-template', handleImageClick);
  return card.generateCard()
};

function handleProfileFormSubmit(data){
  userInfo.setUserInfo(data);
}

// Instantiate Classes
cardAddValidator.enableValidation()
profileFormValidator.enableValidation()
cardSection.renderItems(initialCards);
profileModal.setEventListeners();
cardModal.setEventListeners();

// add event listeners
editButton.addEventListener('click', ()=>{
  profileModal.open()
  renderProfileDetails();
});

addCardButton.addEventListener('click', ()=>{
  cardModal.open()
});
