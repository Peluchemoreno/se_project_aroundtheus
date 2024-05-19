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
  const {name, link} = data;
  function makeRequest(){
    return api.addCard(name, link).then((data)=>{
      cardSection.addItem(createCard(data))
    }).then(()=>{
      formValidators['cardForm'].disableButton();
      formValidators['cardForm'].resetInputs();
    })
  }
  handleSubmit(makeRequest, cardModal)
}

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
    function makeRequest(){
      return api.deleteCard(card.getCardId()).then(()=>{
        card.delete()
      })
  
    }
  
    handleSubmit(makeRequest, deleteConfirmModal, "Deleting...")

  })

}

function createCard(cardData){
  const card = new Card(cardData, '.card-template', handleImageClick, handleDeleteClick, handleLikeClick, handleDislikeClick);
  return card.generateCard()
};


function handleProfileFormSubmit(data){
  const {name, about} = data;
  function makeRequest(){
    return api.updateProfile(name, about).then((userData)=>{
      userInfo.setUserInfo(userData)
    }).then(()=>{
      formValidators['profileForm'].disableButton()
      formValidators['profileForm'].resetInputs()
    })
  }

  handleSubmit(makeRequest, profileModal)
}

function handleLikeClick(id, card){
  api.likeCard(id)
  .then(()=>{
    card.like()
  })
  .catch(console.error)
}

function handleDislikeClick(id, card){
  api.dislikeCard(id)
  .then(()=> {
    card.dislike()
  })
  .catch(console.error)
}

function handleAvatarUpdate(info){
  function makeRequest(){
    return api.updateAvatar(info.avatar).then((info)=>{
      userInfo.setUserInfo(info)
    }).then(()=>{
      formValidators['updateAvatar'].disableButton()
      formValidators['updateAvatar'].resetInputs()
    })
  }

  handleSubmit(makeRequest, changeAvatarModal)
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

function handleSubmit(request, popupInstance, loadingText="Saving..."){
  popupInstance.renderLoading(true, loadingText);
  request()
  .then(()=>{
    popupInstance.close()
  })
  .catch(console.error)
  .finally(()=>{
    popupInstance.renderLoading(false)
  })
}


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
}).catch(console.error)
