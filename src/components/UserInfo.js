export default class UserInfo {
  constructor({name, description}){
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo(){
    this._userData = {
      name: this._name.textContent,
      description: this._description.textContent,
    }
    return this._userData
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}