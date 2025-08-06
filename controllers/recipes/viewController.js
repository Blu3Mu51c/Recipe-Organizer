const RESOURCE_PATH = '/recipes';


const viewController = {

//show the recipes/index.jsx
  index: (req, res, next) => {
    res.render('recipes/Index', {
      recipes: res.locals.data.recipes,
      token: res.locals.data.token,
    });
  },
//show the recipes/new.jsx
  newView: (req, res, next) => {
    res.render('recipes/New', { token: res.locals.data.token });
  },

//show the recipes/show.jsx
  show: (req, res, next) => {
    res.render('recipes/Show', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    });
  },

//show the recipes/edit.jsx
  edit: (req, res, next) => {
    res.render('recipes/Edit', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    });
  },

//redirect us to the edit page
  redirectEdit: (req, res, next) => {
  const recipeId = res.locals.data.recipe?._id || req.params.recipeId;
  if (res.locals.data.token) {
    res.redirect(`${RESOURCE_PATH}/${recipeId}/edit?token=${res.locals.data.token}`);
  } else {
    res.redirect(`${RESOURCE_PATH}/${recipeId}/edit`);
  }
  },
//redirect us to the show page
  redirectShow: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
    }
  },
//redirect us to the home page
  redirectHome: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
    } else {
      res.redirect(RESOURCE_PATH);
    }
  },
};


module.exports = viewController;
