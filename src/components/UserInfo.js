export default class UserInfo {
  constructor({name, description, profileImage}){
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._profileImage = document.querySelector(profileImage)
  }

  getUserInfo(){
    this._userData = {
      name: this._name.textContent,
      about: this._description.textContent,
    }
    return this._userData
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._profileImage.src = data.avatar;
  }
}