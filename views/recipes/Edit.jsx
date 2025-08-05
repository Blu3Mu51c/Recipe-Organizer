const React = require('react');

function Edit(props) {
    const { recipe } = props;

    return (
        <html>
            <head>
                <title>Edit {recipe.title}</title>
            </head>
            <body>
                <h1>Edit {recipe.title}</h1>

                <form action={`/recipes/${recipe._id}?_method=PUT&token=${props.token}`} method="POST">
                    <label htmlFor="title">Title:</label><br />
                    <input type="text" name="title" defaultValue={recipe.title} required /><br />

                    <label htmlFor="description">Description:</label><br />
                    <textarea name="description" defaultValue={recipe.description}></textarea><br />
                    
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category" defaultValue={recipe.category}>
                        <option value="Main Course">Main Course</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                        <option value="Drink">Drink</option>
                    </select><br />

                    <label htmlFor="mealTime">Meal Time:</label>
                    <select name="mealTime" id="mealTime" defaultValue={recipe.mealTime}>
                        <option value="Anytime">Anytime</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Supper">Supper</option>
                        <option value="Dinner">Dinner</option>
                    </select><br />

                    <label htmlFor="instructions">Instructions:</label><br />
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
                                action={`/recipes/${recipe._id}/ingredients/${ing._id}?_method=DELETE&token=${props.token}`}
                            >
                                <button type="submit">Delete</button>
                            </form>
                        </li>
                    ))}
                </ul>

                <h3>Add New Ingredient</h3>
                 <form action={`/recipes/${recipe._id}/ingredients?token=${props.token}`} method="POST">
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="text" step="any" name="quantity" placeholder="Quantity" />
                    <input type="text" name="unit" placeholder="Unit"/>
                    <input type="text" name="additional" placeholder="Additional (optional)" />
                    <input type="submit" value="Add Ingredient" />
                </form>

                <a href={`/recipes/${recipe._id}?token=${props.token}`}>Back to Recipe</a>
            </body>
        </html>
    );
}

module.exports = Edit;