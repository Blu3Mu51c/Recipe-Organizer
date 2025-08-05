const React = require('react');

function New(props) {
    return (
        
        <html>
            <head><title>Create Recipe</title></head>
            <body>
                <h1>Create New Recipe</h1>
                <form action={`/recipes?token=${props.token}`} method="POST">
                    <label>Title:</label><br />
                    <input type="text" name="title" required /><br />

                    <label>Description:</label><br />
                    <textarea name="description"></textarea><br />

                    <label>Instructions:</label><br />
                    <textarea name="instructions"></textarea><br />
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category">
                        <option value="Main Course">Main Course</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                        <option value="Drink">Drink</option>
                    </select><br />

                    <label htmlFor="mealTime">Meal Time:</label>
                    <select name="mealTime" id="mealTime">
                        <option value="Anytime">Anytime</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Supper">Supper</option>
                        <option value="Dinner">Dinner</option>
                    </select><br />             
                    <input type="submit" value="Create Recipe" />
                </form>
                <a href={`/recipes?token=${props.token}`}>Back to Recipes</a>
            </body>
        </html>
    );
}

module.exports = New;
