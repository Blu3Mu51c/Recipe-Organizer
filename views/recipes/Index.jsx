const React = require('react');

function Index(props) {
    const { recipes } = props;
    return (
        <div>
            <h1>All Recipes</h1>
            <a href="/recipes/new">Create New Recipe</a>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <a href={`/recipes/${recipe._id}`}>{recipe.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

module.exports = Index;
