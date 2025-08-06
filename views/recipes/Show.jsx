const React = require('react');
const Layout = require('../layouts/Layout');

function Show({ recipe, token }) {
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
    maxWidth: '850px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#fffdf7',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.07)',
    fontFamily: 'Georgia, serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #e7d5b7',
    paddingBottom: '20px'
  },
  heading: {
    color: '#5e3c00',
    margin: 0,
    fontSize: '2rem'
  },
  backBtn: {
    padding: '10px 20px',
    backgroundColor: '#a98467',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '25px',
    color: '#4e4e4e'
  },
  section: {
    marginBottom: '30px',
    backgroundColor: '#fffef9',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  sectionHeading: {
    color: '#7b4f23',
    borderBottom: '1px solid #e0c6a8',
    paddingBottom: '12px',
    marginTop: 0,
    fontSize: '1.25rem'
  },
  ingredientList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginTop: '10px'
  },
  ingredientItem: {
    padding: '6px 0',
    borderBottom: '1px dotted #f2e8dc',
    fontSize: '1rem',
    color: '#3e3e3e'
  },
  instructions: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'inherit',
    lineHeight: '1.7',
    fontSize: '1rem',
    color: '#4e4e4e'
  },
  metadata: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px'
  },
  metadataItem: {
    flex: 1,
    backgroundColor: '#fffef9',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    color: '#5e3c00',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end'
  },
  btn: {
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  dangerBtn: {
    backgroundColor: '#c94c4c',
    color: '#fffef9',
    border: 'none'
  },
  editBtn: {
    backgroundColor: '#f4c76f',
    color: '#3e3e3e',
    border: 'none'
  }
};


  return (
    <Layout title={recipe.title}>
      <a href="/" style={styles.logoutBtn}>Logout</a>
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <h1 style={styles.heading}>{recipe.title}</h1>
          <a href={`/recipes?token=${token}`} style={styles.backBtn}>Back</a>
        </header>

        <p style={styles.description}>{recipe.description}</p>

        <section style={styles.section}>
          <h2 style={styles.sectionHeading}>Ingredients</h2>
          <ul style={styles.ingredientList}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={styles.ingredientItem}>
                {ing.quantity} {ing.unit} {ing.name} {ing.additional && `(${ing.additional})`}
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionHeading}>Instructions</h2>
          <pre style={styles.instructions}>{recipe.instructions}</pre>
        </section>

        <div style={styles.metadata}>
          <div style={styles.metadataItem}>
            <p><strong>Category:</strong> <br></br>{recipe.category}</p>
          </div>
          <div style={styles.metadataItem}>
            <p><strong>Meal Time:</strong> <br></br>{recipe.mealTime}</p>
          </div>
        </div>

        <div style={styles.actions}>
          <form 
            action={`/recipes/${recipe._id}?_method=DELETE&token=${token}`} 
            method="POST"
            style={{display: 'inline'}}
          >
            <button type="submit" style={{...styles.btn, ...styles.dangerBtn}}>Delete</button>
          </form>
          <a href={`/recipes/${recipe._id}/edit?token=${token}`} 
            style={{...styles.btn, ...styles.editBtn}}>Edit</a>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Show;