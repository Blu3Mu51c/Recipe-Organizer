const React = require('react');
const Layout = require('../layouts/Layout');

function Edit({ recipe, token }) {
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
  heading: {
    color: '#5e3c00',
    borderBottom: '2px solid #e7d5b7',
    paddingBottom: '10px',
    fontSize: '1.75rem',
    marginBottom: '25px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontWeight: 'bold',
    color: '#4b3a29',
    fontSize: '1rem'
  },
  input: {
    padding: '10px',
    border: '1px solid #d9cbb2',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#fffdf9'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #d9cbb2',
    borderRadius: '6px',
    minHeight: '100px',
    fontSize: '1rem',
    backgroundColor: '#fffdf9'
  },
  select: {
    padding: '10px',
    border: '1px solid #d9cbb2',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#fffdf9'
  },
  formRow: {
    display: 'flex',
    gap: '20px'
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#7bb47b',
    color: '#fffef9',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  ingredientsSection: {
    marginTop: '30px',
    padding: '25px',
    backgroundColor: '#fffef9',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
  },
  ingredientList: {
    listStyle: 'none',
    padding: 0
  },
  ingredientItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px dotted #e7d5b7',
    fontSize: '1rem',
    color: '#4e4e4e'
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#c94c4c',
    color: '#fffef9',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  addIngredientForm: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f6f3eb',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
  },
  smallBtn: {
    padding: '6px 12px',
    backgroundColor: '#4caab3',
    color: '#fffef9',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  navButtons: {
    marginTop: '30px',
    display: 'flex',
    gap: '12px'
  },
  secondaryBtn: {
    padding: '10px 18px',
    backgroundColor: '#8d7964',
    color: '#fffef9',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};


  return (
    <Layout title={`Edit ${recipe.title}`}>
      <a href="/" style={styles.logoutBtn}>Logout</a>
      <div style={styles.pageContainer}>
        <h1 style={styles.heading}>  Recipe: {recipe.title}</h1>
        
        <section style={styles.ingredientsSection}>
            <div style={styles.addIngredientForm}>
            <h3>Add New Ingredient</h3>
            <form 
              action={`/recipes/${recipe._id}/ingredients?token=${token}`} 
              method="POST" 
              style={styles.form}
            >
              <input type="text" name="name" placeholder="Name" required style={styles.input} />
              <input type="text" name="quantity" placeholder="Quantity" style={styles.input} />
              <input type="text" name="unit" placeholder="Unit" style={styles.input} />
              <input type="text" name="additional" placeholder="Additional (optional)" style={styles.input} />
              <button type="submit" style={styles.smallBtn}>Add Ingredient</button>
            </form>
          </div>


          <h2>Ingredients</h2>
          <ul style={styles.ingredientList}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={styles.ingredientItem}>
                {ing.quantity} {ing.unit} {ing.name} {ing.additional ? `(${ing.additional})` : ''}
                <form
                  method="POST"
                  action={`/recipes/${recipe._id}/ingredients/${ing._id}?_method=DELETE&token=${token}`}
                  style={{display: 'inline'}}
                >
                  <button type="submit" style={styles.deleteBtn}>Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </section>

        <form 
          action={`/recipes/${recipe._id}?_method=PUT&token=${token}`} 
          method="POST" 
          style={styles.form}
        >
          <label style={styles.label}>
            Title:
            <input 
              type="text" 
              name="title" 
              defaultValue={recipe.title} 
              required 
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Description:
            <textarea 
              name="description" 
              defaultValue={recipe.description}
              style={{...styles.textarea, minHeight: '80px'}}
            ></textarea>
          </label>

          <label style={styles.label}>
            Instructions:
            <textarea 
              name="instructions" 
              defaultValue={recipe.instructions}
              style={{...styles.textarea, minHeight: '120px'}}
            ></textarea>
          </label>

          <div style={styles.formRow}>
            <label style={styles.formGroup}>
              Category:
              <select 
                name="category" 
                defaultValue={recipe.category}
                style={styles.select}
              >
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
              </select>
            </label>

            <label style={styles.formGroup}>
              Meal Time:
              <select 
                name="mealTime" 
                defaultValue={recipe.mealTime}
                style={styles.select}
              >
                <option value="Anytime">Anytime</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Supper">Supper</option>
                <option value="Dinner">Dinner</option>
              </select>
            </label>
          </div>

          <input 
            type="submit" 
            value="Update Recipe" 
            style={styles.submitBtn} 
          />
        </form>

        

        <div style={styles.navButtons}>
          <a href={`/recipes/${recipe._id}?token=${token}`} style={styles.secondaryBtn}>Back</a>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Edit;