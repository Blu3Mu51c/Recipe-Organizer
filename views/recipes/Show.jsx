const React = require('react');

function Show(props) {
    const { recipe } = props;
    return (
        <div>
            <h1>{recipe.title}</h1>
            <a href="/recipes">Back to Recipes</a>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing.quantity} {ing.unit} {ing.name} ({ing.additional || ''})</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>

            <form action={`/recipes/${recipe._id}?_method=DELETE`} method="POST">
                <input type="submit" value={`Delete ${recipe.title}`} />
            </form>
            <a href={`/recipes/${recipe._id}/edit`}>
                <button>Edit</button>
            </a>
        </div>
    );
}

module.exports = Show;
