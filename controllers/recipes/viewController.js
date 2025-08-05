const RESOURCE_PATH = '/recipes';

const viewController = {
  index: (req, res, next) => {
    res.render('recipes/Index', {
      recipes: res.locals.data.recipes,
      token: res.locals.data.token,
    });
  },

  newView: (req, res, next) => {
    res.render('recipes/New', { token: res.locals.data.token });
  },

  show: (req, res, next) => {
    res.render('recipes/Show', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    });
  },

  edit: (req, res, next) => {
    res.render('recipes/Edit', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    });
  },

redirectEdit: (req, res, next) => {
  const recipeId = res.locals.data.recipe?._id || req.params.recipeId;
  if (res.locals.data.token) {
    res.redirect(`${RESOURCE_PATH}/${recipeId}/edit?token=${res.locals.data.token}`);
  } else {
    res.redirect(`${RESOURCE_PATH}/${recipeId}/edit`);
  }
},

  redirectShow: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
    }
  },

  redirectHome: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`);
    } else {
      res.redirect(RESOURCE_PATH);
    }
  },
};

module.exports = viewController;
