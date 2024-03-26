// Imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {configuration} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";


// Initial variables
const initialCards = [{
  name: "Diver",
  link: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Beautiful Tree",
  link: "https://plus.unsplash.com/premium_photo-1707229723342-1dc24b80ffd6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Turtle Time",
  link: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Vibrant Women",
  link: "https://plus.unsplash.com/premium_photo-1705091981893-15c9a7d33a31?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Querido M\xE9xico",
  link: "https://images.unsplash.com/photo-1537222961176-50d25fff78ef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "Rep\xFAblica Dominicana",
  link: "https://images.unsplash.com/photo-1615305182074-29b3a07b9954?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}
];

// Modal and Form Variables
const profileModal = document.querySelector('.modal_type_profile');
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
const imagePreviewModal = document.querySelector('.modal_type_image');
const imagePreview = imagePreviewModal.querySelector('.modal__image');
const imageDescription = imagePreviewModal.querySelector('.modal__image-description');
const modals = Array.from(document.querySelectorAll('.modal'));
const closeButtons = Array.from(document.querySelectorAll('.modal__close-button'))
const profileForm = document.querySelector('#profileForm')
const addForm = document.querySelector('#cardForm')
const addFormElement = new FormValidator(configuration, profileForm)
const profileEditForm = new FormValidator(configuration, addForm)

// Event listeners
closeButtons.forEach(button => {
  const modal = button.closest(".modal");
  button.addEventListener('click', ()=>{closeModal(modal)})
});

editButton.addEventListener('click', ()=>{
  openModal(profileModal);
  renderProfileDetails();
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

cardAddFormElement.addEventListener('submit', handleCardAdd);

addCardButton.addEventListener('click', ()=>{
  openModal(cardModal)
  profileEditForm.disableButton()
});

modals.forEach(addModalCloseEventListener);

// Functions
function handleEscapeClose(event){
  if (event.key === "Escape"){
    modals.forEach(closeModal)
  }
};

function openModal(element){
  element.classList.add('modal_opened')
  document.addEventListener('keydown', handleEscapeClose);
};

function renderProfileDetails(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function closeModal(element){
  element.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscapeClose)
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
};

function handleCardAdd(evt){
  evt.preventDefault();
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

function addModalCloseEventListener(modal){
  modal.addEventListener('mousedown', e => {
    if (e.target.className === `modal modal_type_${modal.id} modal_opened`){
      closeModal(modal)
    }
  })
};

function createCard(cardData){
  const card = new Card(cardData, '.card-template', handleImageClick);
  return card.generateCard()
};

// instantiate card section and define render logic
const cardSection = new Section({
  items: initialCards,
  renderer: ()=>{
    initialCards.forEach(item => {
      const itemElement = createCard(item);
      cardSection.addItem(itemElement)
    })
  }
}, ".cards");


//Enable Validation and render cards
addFormElement.enableValidation()
profileEditForm.enableValidation()
cardSection.renderItems();


// test area ==============================================

//========================================================