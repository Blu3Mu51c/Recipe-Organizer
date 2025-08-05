const React = require('react');

function Index(props) {
    const { recipes } = props;
    return (
        <div>
            <h1>All Recipes</h1>
            <a href={`/recipes/new?token=${props.token}`}>Create New</a>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <a href={`/recipes/${recipe._id}?token=${props.token}`}>{recipe.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

module.exports = Index;
