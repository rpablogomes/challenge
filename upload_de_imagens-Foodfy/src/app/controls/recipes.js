const { recipes } = require("../models/client");
const recipe = require("../models/recipe");
const getSince = require("../lib/utils").getSince;

exports.index = function (req, res) {
  recipe.index(callback => {
    res.render("admin/recipes/recipes", { recipes : callback });
  });
};

exports.create = function (req, res) {
  recipe.chefsList((chefsList) => {
    return res.render("admin/recipes/create", { chefsList });
  });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  //validation
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the fields");
    }
  }
  
  // Construct Object to Push into data
  let {
    chef_id,
    title,
    ingredients,
    preparation,
    information,
  } = req.body;
  
  const values = [
    chef_id,
    title,
    ingredients,
    preparation,
    information,
    getSince(),
  ];
  
  const files = req.files
  
  recipe.create(values, files, (callback) => {
    return res.redirect(`recipes/${callback}`);
  });
};

exports.show = function (req, res) {
  const id = req.params.id;
  recipe.find(id, (callback) => {
    recipe.files(callback.id, (files) => {
      const recipe = {...callback , images: files}
      console.log(recipe)
      res.render("admin/recipes/recipe",  {recipe} );
    })  
  });
};

exports.edit = function (req, res) {
  const id = req.params.id;
  recipe.find(id, (recipeData) => {
    recipe.chefsList((chefsList) => {
      recipe.files(id, (files) => {
        return res.render("admin/recipes/edit", { recipe: recipeData, chefsList, images: files });
      })
    });
  });
};

exports.put = function (req, res) {

  const keys = Object.keys(req.body);
  const files = req.files

  console.log("teste", keys, files)

  
  // Construct Object to Push into data

  const editedRecipe = [
    req.body.chef_id,
    req.body.title,
    req.body.ingredients,
    req.body.preparation,
    req.body.information,
    req.body.id
  ]

  recipe.update(editedRecipe, callback => {
    return res.redirect(`/admin/recipes/${req.body.id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;
  recipe.delete(id, callback => {
    return res.redirect("/admin/recipes");
  });
};
