/*
  @desc  controller
*/
var registry = require("registry");
var typeOf   = require("is").typeOf;

exports.controller = function (func, e) {

  // try {

    e.preventDefault();

    var boundObject = registry.get(e.currentTarget.dataset.id);
    var targetObject = (e.delegateTarget || e.target).dataset.id;

    targetObject = targetObject ? registry.get(targetObject) : false;

    func(e, boundObject, targetObject);

  // }
  // catch (e) {

  //   console.log(e);

  // }

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
exports.createInCollection = function (Model, relation, initData, e, object) {

  initData = typeOf("function", initData) ? initData(e) : false;

  object[relation].add(Model.spawn(initData));

}

exports.removeFromCollection = function (relation, e, object, model) {

  object[relation].remove(model);

}

exports.copyInCollection = function (relation, e, object, model) {

  object[relation].add(model.clone());

}
