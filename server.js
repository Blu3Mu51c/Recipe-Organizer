require('dotenv').config()
const app = require('./app.js')
const database = require('./models/database')
const PORT = process.env.PORT || 3000

database.once('open', () => {
    console.log('connected to mongo')
})

database.on('error', (error) => {
  console.error(error.message)
})

app.listen(PORT, () => {
    console.log(`We in the building ${PORT}`)
})