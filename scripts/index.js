let initialCards = [{
  name: "swimmer",
  link: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "beautiful tree",
  link: "https://plus.unsplash.com/premium_photo-1707229723342-1dc24b80ffd6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "swimming with a turtle",
  link: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "vibrant women",
  link: "https://plus.unsplash.com/premium_photo-1705091981893-15c9a7d33a31?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "island",
  link: "https://images.unsplash.com/photo-1707327259268-2741b50ef5e5?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  name: "skyscrapers",
  link: "https://images.unsplash.com/photo-1707341529566-5c63668edc11?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}
];

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openModal);

let closeModalButton = document.querySelector('.modal__close-button');
closeModalButton.addEventListener('click', closeModal);

function openModal(){
  let modal = document.querySelector('.modal');
  modal.classList.add("modal_opened");
  nameInput.placeholder = profileName.textContent;
  jobInput.placeholder = profileJob.textContent;
}

function closeModal(){
  let modal = document.querySelector('.modal');
  modal.classList.remove('modal_opened');
}

// find the form in the DOM
const profileFormElement = document.querySelector('.modal__container')


const nameInput = profileFormElement.querySelector('.modal__name')
const jobInput = profileFormElement.querySelector('.modal__description')

// find the profile elements in the DOM
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
 
  // get the values of each field from the value property 
  // of the corresponding input element

  // insert new values into the textContent property of the 
  // corresponding profile elements
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener('submit', handleProfileFormSubmit);