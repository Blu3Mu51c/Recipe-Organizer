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
