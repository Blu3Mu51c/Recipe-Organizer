const React = require('react');

function Layout({ children }) {
  return (
    <html>
      <head>
        <title>Recipe App</title>
        <link rel="stylesheet" href="/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="site-header">
          <div className="header-content">
            <h1 className="app-title">Recipe-Organizer</h1>
          </div>
        </header>

        <main className="container">
          <section className="page-wrapper">
            {children}
          </section>
        </main>

        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} My Recipe Book</p>
        </footer>
      </body>
    </html>
  );
}

module.exports = Layout;