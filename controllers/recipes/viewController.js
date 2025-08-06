const RESOURCE_PATH = '/recipes'

const viewController = {
  // Render the recipes index page with all recipes and token
  index: (req, res, next) => {
    res.render('recipes/Index', {
      recipes: res.locals.data.recipes,
      token: res.locals.data.token,
    })
  },

  // Render the new recipe creation form
  newView: (req, res, next) => {
    res.render('recipes/New', { token: res.locals.data.token })
  },

  // Render the show page for a single recipe
  show: (req, res, next) => {
    res.render('recipes/Show', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    })
  },

  // Render the edit form for a recipe
  edit: (req, res, next) => {
    res.render('recipes/Edit', {
      recipe: res.locals.data.recipe,
      token: res.locals.data.token,
    })
  },

  // Redirect to the edit page of a recipe, preserving token in query if available
  redirectEdit: (req, res, next) => {
    const recipeId = res.locals.data.recipe?._id || req.params.recipeId
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${recipeId}/edit?token=${res.locals.data.token}`)
    } else {
      res.redirect(`${RESOURCE_PATH}/${recipeId}/edit`)
    }
  },

  // Redirect to the show page of a recipe, preserving token in query if available
  redirectShow: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`)
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`)
    }
  },

  // Redirect to the recipes index (home) page, preserving token if available
  redirectHome: (req, res, next) => {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`)
    } else {
      res.redirect(RESOURCE_PATH)
    }
  },
}

module.exports = viewController
