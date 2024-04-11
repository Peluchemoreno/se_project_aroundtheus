export default class Api {
  constructor(options){
    this._url = options.baseUrl;
    this._header = options.headers;
  }

  getCards(){ // working
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._header
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }


  addCard(cardName, cardLink){  // working
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(error => {
      console.error(error)
    })
  }

  getCurrentUser(){ // working
    return fetch(`${this._url}/users/me`,{
      method: "GET",
      headers: this._header
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => data)
    .catch(err => {
      console.error(err)
    })
  }

  updateProfile(name, job){ // working
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: job,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  deleteCard(cardId){ // working
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._header
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  likeCard(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._header
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  dislikeCard(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._header
    }).then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    }) 
  }

  updateAvatar(avatarUrl){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: `${avatarUrl}`
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .then(data => {
      return data
    }).catch(err => {
      console.error(err)
    })
  }

  checkAllData(renderCards){
    return Promise.all([this.getCards(), this.getCurrentUser()]).then(() => {
      renderCards()
    }).catch(error => {
      console.error(error)
    })
  }
}