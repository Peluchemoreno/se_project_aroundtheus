export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(){
    this._renderer();
  }

  addItem(item){
    this._container.append(item);
  }
}


