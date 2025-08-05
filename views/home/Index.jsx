const React = require('react');

function HomeIndex({ recipes }) {
  return (
    <html>
      <head>
        <title>All Recipes</title>
      </head>
      <body>
        <header>
          <h1>Explore Recipes</h1>

          
          <a href="/users/signup">
            <button>Sign Up</button>
          </a>
          
          <a href="/users/login">
            <button>Sign In</button>
          </a>

        </header>

        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <h2>{recipe.title}</h2>
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Meal Time:</strong> {recipe.mealTime}</p>
              <p>{recipe.description}</p>
              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>
                    {ing.quantity} {ing.unit} {ing.name}
                    {ing.additional ? ` (${ing.additional})` : ''}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}

module.exports = HomeIndex;
