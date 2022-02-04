class Recipe{
  constructor(data){
    this._id = data.id,
    this._name = data.name,
    this._servings = data.servings,
    this._ingredients = data.ingredients,
    this._time = data.time,
    this._description = data.description,
    this._applicance = data.applicances,
    this._ustensils = data.ustensils
  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }
  get servings(){
    return this._servings;
  }
  get ingredients(){

  }
  get time(){
    return this._time;
  }
  get description(){
    return this._description;
  }
  get applicances(){
    return this._applicances;
  }
  get ustensils(){
    return this._ustensils
  }
}