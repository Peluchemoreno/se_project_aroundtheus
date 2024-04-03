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
import Api from "../components/Api.js";

// select elements
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button')
const profileFormElement = document.forms['profileForm'];
const cardAddFormElement = document.forms['cardForm'];
const nameInput = profileFormElement.querySelector('.modal__name');
const jobInput = profileFormElement.querySelector('.modal__description');

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
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "32400e4e-bdb6-4554-9f2b-339b0c55f4e6",
    "Content-Type": "application/json"
  }
});


// define functions
function renderProfileDetails(){
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
};

function handleCardAdd(data){
  const { title, url } = data
  const cardElement = createCard({title, url})
  cardSection.addItem(cardElement)
  cardModal.close()
};

function handleImageClick(image){
  const data = {
    name: image.title,
    link: image.url
  }
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
cardSection.renderItems();
profileModal.setEventListeners();
cardModal.setEventListeners();
popupWithImage.setEventListeners()

// add event listeners
editButton.addEventListener('click', ()=>{
  profileModal.open()
  renderProfileDetails();
});

addCardButton.addEventListener('click', ()=>{
  cardModal.open()
});
