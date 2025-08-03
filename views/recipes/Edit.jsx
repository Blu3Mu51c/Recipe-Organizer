const React = require('react');

function Edit(props) {
    const { recipe } = props;

    return (
        <html>
            <head><title>Edit {recipe.title}</title></head>
            <body>
                <h1>Edit {recipe.title}</h1>

                <form action={`/recipes/${recipe._id}?_method=PUT`} method="POST">
                    <label>Title:</label><br />
                    <input type="text" name="title" defaultValue={recipe.title} required /><br />

                    <label>Description:</label><br />
                    <textarea name="description" defaultValue={recipe.description}></textarea><br />

                    <label>Instructions:</label><br />
                    <textarea name="instructions" defaultValue={recipe.instructions}></textarea><br />

                    <input type="submit" value="Update Recipe" />
                </form>

                <hr />

                <h2>Ingredients</h2>

                <ul>
                    {recipe.ingredients.map((ing, i) => (
                        <li key={i}>
                            {ing.quantity} {ing.unit} {ing.name} {ing.additional ? `(${ing.additional})` : ''}
                            <form
                                style={{ display: 'inline' }}
                                method="POST"
                                action={`/recipes/${recipe._id}/ingredients/${ing._id}?_method=DELETE`}
                            >
                                <button type="submit">Delete</button>
                            </form>
                        </li>
                    ))}
                </ul>

                <h3>Add New Ingredient</h3>
                <form action={`/recipes/${recipe._id}/ingredients`} method="POST">
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="number" step="any" name="quantity" placeholder="Quantity" required />
                    <input type="text" name="unit" placeholder="Unit" required />
                    <input type="text" name="additional" placeholder="Additional (optional)" />
                    <input type="submit" value="Add Ingredient" />
                </form>

                <a href={`/recipes/${recipe._id}`}>Back to Recipe</a>
            </body>
        </html>
    );
}

module.exports = Edit;
