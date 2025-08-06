const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app') // Your Express app
const User = require('../models/user')

let mongoServer
let server

// Setup in-memory MongoDB and start server before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  server = app.listen(8080)
})

// Clean up Mongo connection and stop server after tests
afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
  await server.close()
})

// Clear User collection after each test to isolate tests
afterEach(async () => {
  await User.deleteMany({})
})

describe('User API Integration Tests', () => {

  // Tests for user signup route
  describe('POST /users/signup', () => {
    it('should create a new user and return a token', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'test1234',
        })

      // Your app redirects to /users/login on success
      expect(res.status).toBe(302)
    })

    it('should fail to create a user with missing data', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({ name: 'OnlyName' }) // Missing email & password

      // Your app redirects to /users/login on failure as well
      expect(res.status).toBe(302)
      expect(res.headers.location).toBe('/users/login')
    })
  })

  // Tests for user login route
  describe('POST /users/login', () => {
    // Create user before login tests
    beforeEach(async () => {
      await request(app).post('/users/signup').send({
        name: 'Login User',
        email: 'login@example.com',
        password: 'test1234',
      })
    })

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'login@example.com',
          password: 'test1234',
        })

      // Successful login redirects to home (/)
      expect(res.status).toBe(302)
    })

    it('should not login with incorrect credentials', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpass',
        })

      // Should respond with 400 and error message
      expect(res.status).toBe(400)
      expect(res.text).toBe('Invalid login credentials')
    })
  })

  // Tests for updating user data
  describe('PUT /users/:id', () => {
    let user
    let token

    beforeEach(async () => {
      // Create user to update
      await request(app).post('/users/signup').send({
        name: 'Put User',
        email: 'put@example.com',
        password: 'test1234',
      })

      user = await User.findOne({ email: 'put@example.com' })
      token = await user.generateAuthToken()
    })

    it('should update user data', async () => {
      const res = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Name',
        })

      expect(res.status).toBe(200)
      expect(res.body.name).toBe('Updated Name')
    })
  })

  // Tests for deleting user
  describe('DELETE /users/:id', () => {
    let user
    let token

    beforeEach(async () => {
      // Create user to delete
      await request(app).post('/users/signup').send({
        name: 'Delete Me',
        email: 'delete@example.com',
        password: 'test1234',
      })

      user = await User.findOne({ email: 'delete@example.com' })
      token = await user.generateAuthToken()
    })

    it('should delete user with valid token', async () => {
      const res = await request(app)
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.message).toBe('User deleted')
    })

    it('should not delete user without token', async () => {
      const res = await request(app).delete(`/users/${user._id}`)

      expect(res.status).toBe(401)
      expect(res.text).toBe('Not authorized')
    })
  })
})
