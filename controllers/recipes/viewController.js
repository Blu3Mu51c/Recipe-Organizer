const Recipe = require('../../models/recipe')

const viewController= {
    
    home: (req, res) => {
    res.redirect('/recipes');
    },
    
    index: async (req, res) => {
    const { category, mealTime } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (mealTime) filter.mealTime = mealTime;
    const recipes = await Recipe.find(filter);
    res.render('recipes/Index', { recipes });
    },
    
    new: (req, res) => {
    res.render('recipes/New');
    },
    show: async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/Show', { recipe }); 
    },
    edit: async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/Edit', { recipe });
    },
    redirectToShow: (req, res) => {
    res.redirect(`/recipes/${req.recipe._id}/edit`);
    },
    redirectToEdit: (req, res) => {
    res.redirect(`/recipes/${req.params.id}/edit`);
    },
    redirectToIndex: (req, res) => {
    res.redirect('/recipes');
    },
}

module.exports = viewController