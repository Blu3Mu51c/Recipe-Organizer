const React = require('react');
const Layout = require('../layouts/Layout');

function HomeIndex({ recipes }) {
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      background: '#fffaf2',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: '2rem',
      fontFamily: 'Palatino Linotype, serif',
      color: '#3e2723',
    },
    authLinks: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      padding: '0.65rem 1.25rem',
      background: '#a1887f',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      textDecoration: 'none',
      transition: 'background 0.3s ease',
    },
    //compact
    /*
    recipeList: {
      listStyle: 'none',
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      background: '#fce8dc',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      border: '1px solid #e8c7b8',
    },*/
    //free
    recipeList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'block',
    },
    card: {
    background: '#fce8dc',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    border: '1px solid #e8c7b8',
    marginBottom: '1.5rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      color: '#4e342e',
      marginBottom: '0.75rem',
    },
    cardText: {
      marginBottom: '0.5rem',
      fontSize: '1rem',
    },
    ingredientsList: {
      paddingLeft: '1rem',
      marginTop: '0.5rem',
    },
    filterForm: {
      marginBottom: '2rem',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      flex: '1 1 200px',
    },
    select: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      flex: '1 1 150px',
    },
  };

  return (
    <Layout title="Explore Recipes">
      <section style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Explore Recipes</h1>
          <div style={styles.authLinks}>
            <a href="/users/signup" style={{ textDecoration: 'none' }}>
              <button style={styles.button}>Sign Up</button>
            </a>
            <a href="/users/login" style={{ textDecoration: 'none' }}>
              <button style={styles.button}>Sign In</button>
            </a>
          </div>
        </header>

        <form method="GET" style={styles.filterForm}>
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            style={styles.input}
            defaultValue=""
          />

          <select name="category" style={styles.select} defaultValue="">
            <option value="">All Categories</option>
            <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
          </select>

          <select name="mealTime" style={styles.select} defaultValue="">
            <option value="">All Meal Times</option>
            <option value="Anytime">Anytime</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Supper">Supper</option>
                <option value="Dinner">Dinner</option>
          </select>

          <button type="submit" style={styles.button}>Filter</button>
        </form>


        <ul style={styles.recipeList}>
          {recipes.map(recipe => (
            <li key={recipe._id} style={styles.card}>
              <h2 style={styles.cardTitle}>{recipe.title}</h2>
              <p style={styles.cardText}><strong>Category:</strong> {recipe.category}</p>
              <p style={styles.cardText}><strong>Meal Time:</strong> {recipe.mealTime}</p>
              <p style={styles.cardText}>{recipe.description}</p>
              <div>
                <h4 style={{ marginTop: '1rem' }}>Ingredients:</h4>
                <ul style={styles.ingredientsList}>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.quantity} {ing.unit} {ing.name}
                      {ing.additional && ` (${ing.additional})`}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

module.exports = HomeIndex;
