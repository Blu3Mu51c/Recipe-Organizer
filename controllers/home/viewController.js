const viewController = {
    
  index: (req, res) => {
    res.render('home/Index', { recipes: res.locals.data.recipes });
  }
};

module.exports = viewController;
