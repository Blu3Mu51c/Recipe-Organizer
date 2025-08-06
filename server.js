require('dotenv').config()   // Load environment variables from .env file
const app = require('./app.js')
const database = require('./models/database')

const PORT = process.env.PORT || 3000  // Use env port or fallback to 3000

// Log successful MongoDB connection
database.once('open', () => {
  console.log('Connected to MongoDB')
})

// Log MongoDB connection errors
database.on('error', (error) => {
  console.error('MongoDB connection error:', error.message)
})

// Start the Express server and listen on the configured port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
