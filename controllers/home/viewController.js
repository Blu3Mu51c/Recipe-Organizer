const viewController = {
//gets the homeindex.jsx and renders it
  index: (req, res) => {
    res.render('home/Index', { recipes: res.locals.data.recipes });
  }
};

module.exports = viewController;
