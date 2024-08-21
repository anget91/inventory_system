export class ProductEntity {
  constructor(name, description, price, quantity) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._quantity = quantity;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }

  set name(value) {
    if (typeof value === 'string' && value.trim() !== '') {
      this._name = value;
    } else {
      console.error('Invalid name');
    }
  }

  set description(value) {
    if (typeof value === 'string') {
      this._description = value;
    } else {
      console.error('Invalid description');
    }
  }

  set price(value) {
    if (typeof value === 'number' && value >= 0) {
      this._price = value;
    } else {
      console.error('Invalid price');
    }
  }

  set quantity(value) {
    if (Number.isInteger(value) && value >= 0) {
      this._quantity = value;
    } else {
      console.error('Invalid quantity');
    }
  }
}
