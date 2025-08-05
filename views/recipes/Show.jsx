const React = require('react');

function Show(props) {
    const { recipe } = props;
    return (
        <div>
            <h1>{recipe.title}</h1>
            <a href={`/recipes?token=${props.token}`}>Back to Recipes</a>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing.quantity} {ing.unit} {ing.name} ({ing.additional || ''})</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <pre>{recipe.instructions}</pre>
            <div>
            <strong>Category:</strong> {recipe.category}
            </div>
            <div>
            <strong>Meal Time:</strong> {recipe.mealTime}
            </div>
            <form action={`/recipes/${recipe._id}?_method=DELETE&token=${props.token}`} method="POST">
                <input type="submit" value={`Delete ${recipe.title}`} />
            </form>
            <a href={`/recipes/${recipe._id}/edit?token=${props.token}`}>
                <button>Edit</button>
            </a>
        </div>
    );
}

module.exports = Show;
