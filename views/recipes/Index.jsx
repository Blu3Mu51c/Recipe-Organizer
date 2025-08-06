const React = require('react');
const Layout = require('../layouts/Layout');

function Index({ recipes, token }) {
  //inline styling
const styles = {
  logoutBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '8px 16px',
    backgroundColor: '#c94c4c',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    border: 'none',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
  },
  pageContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '3px solid #f4dabd',
    paddingBottom: '15px'
  },
  heading: {
    color: '#5e3c00',
    fontFamily: 'Georgia, serif',
    fontSize: '2rem',
    margin: 0
  },
  createBtn: {
    padding: '10px 20px',
    backgroundColor: '#dda15e',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    border: 'none',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '20px'
  },
  recipeCard: {
    backgroundColor: '#fffef9',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.07)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '20px',
    fontFamily: 'Georgia, serif'
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.4rem',
    color: '#5e3c00',
    fontWeight: 'bold'
  },
  cardDescription: {
    color: '#6e5f4f',
    fontSize: '0.95rem',
    marginBottom: '15px',
    lineHeight: '1.6'
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#a2836e',
    fontSize: '0.85rem',
    marginBottom: '15px',
    fontStyle: 'italic'
  },
  cardActions: {
    display: 'flex',
    gap: '10px'
  },
  viewBtn: {
    padding: '8px 15px',
    backgroundColor: '#a98467',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    border: 'none'
  },
  editBtn: {
    padding: '8px 15px',
    backgroundColor: '#f4a259',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    border: 'none'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fef7eb',
    borderRadius: '12px',
    color: '#6c584c',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)'
  },
  emptyStateHeading: {
    fontSize: '1.6rem',
    marginBottom: '15px',
    color: '#5e3c00',
    fontFamily: 'Georgia, serif'
  },
  emptyStateText: {
    marginBottom: '20px',
    fontSize: '1rem'
  }
};

  return (
    <Layout title="All Recipes">
      <a href="/" style={styles.logoutBtn}>Logout</a>
      
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <h1 style={styles.heading}>All Recipes</h1>
          <a href={`/recipes/new?token=${token}`} style={styles.createBtn}>Create New Recipe</a>
        </header>

        {recipes.length > 0 ? (
          <div style={styles.recipeGrid}>
            {recipes.map(recipe => (
              <div key={recipe._id} style={styles.recipeCard}>
                {recipe.image && (
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    style={styles.cardImage} 
                  />
                )}
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{recipe.title}</h3>
                  <p style={styles.cardDescription}>
                    {recipe.description.length > 100 
                      ? `${recipe.description.substring(0, 100)}...` 
                      : recipe.description}
                  </p>
                  <div style={styles.cardMeta}>
                    <span>{recipe.category}</span>
                    <span>{recipe.mealTime}</span>
                  </div>
                  <div style={styles.cardActions}>
                    <a 
                      href={`/recipes/${recipe._id}?token=${token}`} 
                      style={styles.viewBtn}
                    >
                      View
                    </a>
                    <a 
                      href={`/recipes/${recipe._id}/edit?token=${token}`} 
                      style={styles.editBtn}
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyStateHeading}>No Recipes Found</h3>
            <p style={styles.emptyStateText}>You haven't created any recipes yet.</p>
            <a href={`/recipes/new?token=${token}`} style={styles.createBtn}>
              Create Your First Recipe
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}

module.exports = Index;