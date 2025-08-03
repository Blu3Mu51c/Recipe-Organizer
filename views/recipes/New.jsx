const React = require('react');

function New() {
    return (
        <html>
            <head><title>Create Recipe</title></head>
            <body>
                <h1>Create New Recipe</h1>
                <form action="/recipes" method="POST">
                    <label>Title:</label><br />
                    <input type="text" name="title" required /><br />

                    <label>Description:</label><br />
                    <textarea name="description"></textarea><br />

                    <label>Instructions:</label><br />
                    <textarea name="instructions"></textarea><br />

                    <input type="submit" value="Create Recipe" />
                </form>
                <a href="/recipes">Back to Recipes</a>
            </body>
        </html>
    );
}

module.exports = New;
