export default class Api {
  constructor(options){
    this._url = options.baseUrl;
    this._header = options.headers;
  }

  _checkStatus(res){
    if (res.ok){
      return res.json()
    } else {
      return Promise.reject(`Error: ${res.status}`)
    }
  }

  _request(url, options){
    return fetch(url, options).then(this._checkStatus)
  }

  getCards(){ // working
    return this._request(this._url + `/cards`, {
      method: `GET`,
      headers: this._header,
    }).then(data => {
      return data
    })
  }


  addCard(cardName, cardLink){  // working
    return this._request(this._url + `/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(data => data)
  }

  getCurrentUser(){ // working
    return this._request(this._url + `/users/me`,{
      method: "GET",
      headers: this._header
    }).then(data => data)
  }

  updateProfile(name, job){ 
    return this._request(this._url + `/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: job,
      })
    }).then(data => data)
  }

  deleteCard(cardId){ // working
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._header
    }).then(data => data)
  }

  likeCard(cardId){
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._header
    }).then(data => data)
  }

  dislikeCard(cardId){
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._header
    }).then(data => data)
  }

  updateAvatar(avatarUrl){
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: `${avatarUrl}`
      })
    }).then(data => data)
  }

  checkAllData(){
    return Promise.all([this.getCards(), this.getCurrentUser()])
  }
}