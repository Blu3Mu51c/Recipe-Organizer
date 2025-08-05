const React = require('react');
function SignUp() {
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form action="/users" method="POST">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <a href="/users/login">Log in</a>
      </p>
    </div>
  );
}

module.exports = SignUp;
