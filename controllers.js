/*
  @desc  controller
*/
var registry = require("registry");


exports.controller = function (func, e) {

  e.preventDefault();

  var boundObject = registry.get(e.currentTarget.getAttribute("data-id"));
  var targetObject = e.delegateTarget.getAttribute("data-id");

  targetObject = targetObject ? registry.get(targetObject) : false;

  func(e, boundObject, targetObject);

}



//  hasOne bindings
exports.create = function (Model, relation, e, object) {

  object[relation] = Model.spawn();

}

exports.remove = function (relation, e, object) {

  object[relation] = undefined;

}

exports.copy = function (relation, e, object, model) {
  object[relation] = model.clone();
}


//  hasMany bindings
exports.createInCollection = function (Model, relation, e, object) {

  object[relation].add(Model.spawn());

}

exports.removeFromCollection = function (relation, e, object, model) {

  object[relation].remove(model);

}

exports.copyInCollection = function (relation, e, object, model) {

  object[relation].add(model.clone());

}
