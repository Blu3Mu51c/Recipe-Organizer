const React = require('react');
const Layout = require('../layouts/Layout');

function New({ token }) {
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
    maxWidth: '650px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#fffdf7',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.07)',
    fontFamily: 'Georgia, serif'
  },
  heading: {
    color: '#5e3c00',
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '1.8rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '1rem',
    color: '#4e4e4e',
    fontWeight: 'bold'
  },
  input: {
    padding: '12px',
    border: '1px solid #d6b78c',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#fffef9',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  },
  textarea: {
    padding: '12px',
    border: '1px solid #d6b78c',
    borderRadius: '6px',
    minHeight: '120px',
    fontSize: '1rem',
    backgroundColor: '#fffef9',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  },
  select: {
    padding: '12px',
    border: '1px solid #d6b78c',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#fffef9',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
  },
  formActions: {
    display: 'flex',
    gap: '20px',
    marginTop: '25px',
    justifyContent: 'center'
  },
  primaryBtn: {
    padding: '12px 24px',
    backgroundColor: '#dda15e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  secondaryBtn: {
    padding: '12px 24px',
    backgroundColor: '#a98467',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
};


  return (
    <Layout title="Create Recipe">
      <a href="/" style={styles.logoutBtn}>Logout</a>
      <div style={styles.pageContainer}>
        <h1 style={styles.heading}>Create a New Recipe</h1>

        <form action={`/recipes?token=${token}`} method="POST" style={styles.form}>
          <label style={styles.label}>
            Title:
            <input type="text" name="title" required style={styles.input} />
          </label>

          <label style={styles.label}>
            Description:
            <textarea name="description" rows="3" style={styles.textarea}></textarea>
          </label>

          <label style={styles.label}>
            Instructions:
            <textarea name="instructions" rows="5" style={styles.textarea}></textarea>
          </label>

          <div style={{display: 'flex', gap: '20px'}}>
            <label style={{...styles.label, flex: 1}}>
              Category:
              <select name="category" style={styles.select}>
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
              </select>
            </label>

            <label style={{...styles.label, flex: 1}}>
              Meal Time:
              <select name="mealTime" style={styles.select}>
                <option value="Anytime">Anytime</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Supper">Supper</option>
                <option value="Dinner">Dinner</option>
              </select>
            </label>
          </div>

          <div style={styles.formActions}>
            <input type="submit" value="Create Recipe" style={styles.primaryBtn} />
            <a href={`/recipes?token=${token}`} style={styles.secondaryBtn}>Back</a>
          </div>
        </form>
      </div>
    </Layout>
  );
}

module.exports = New;