const React = require('react');
function SignIn() {
  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form action="/users/login" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don’t have an account? <a href="/users">Sign up</a>
      </p>
    </div>
  );
}

module.exports = SignIn;
