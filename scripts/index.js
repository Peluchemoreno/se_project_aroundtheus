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

const editButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const profileFormElement = document.querySelector('#form');
const nameInput = profileFormElement.querySelector('.modal__name')
const jobInput = profileFormElement.querySelector('.modal__description')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const modal = document.querySelector('.modal');

editButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function openModal(){
  modal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeModal(){
  modal.classList.remove('modal_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}

function getCardElement(data){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image")
  
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  return cardElement
  
}

initialCards.forEach(element => {
  const cardElement = getCardElement(element);
  cardsContainer.append(cardElement)
});