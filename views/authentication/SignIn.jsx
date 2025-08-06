const React = require('react');
const Layout = require('../layouts/Layout');

function SignIn() {
  //inline styling
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '3rem auto',
      background: '#fffaf2',
      padding: '2.5rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.08)',
    },
    heading: {
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#3e2723',
      fontFamily: 'Palatino Linotype, serif',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    },
    label: {
      fontWeight: 'bold',
      color: '#5d4037',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginTop: '0.4rem',
      border: '1px solid #d7ccc8',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    button: {
      padding: '0.75rem',
      background: '#a1887f',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    link: {
      marginTop: '1rem',
      textAlign: 'center',
      color: '#6d4c41',
    },
  };

  return (
    <Layout title="Sign In">
      <section style={styles.container}>
        <h1 style={styles.heading}>Sign In</h1>
        <form action="/users/login" method="POST" style={styles.form}>
          <label style={styles.label}>
            Email
            <input type="email" name="email" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Password
            <input type="password" name="password" required style={styles.input} />
          </label>
          <button type="submit" style={styles.button}>Log In</button>
        </form>
        <p style={styles.link}>
          Don’t have an account? <a href="/users/signup">Sign up</a>
        </p>
      </section>
    </Layout>
  );
}

module.exports = SignIn;
