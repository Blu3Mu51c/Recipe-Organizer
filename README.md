# Recipe Organizer API

A full-stack application to manage user recipe collection with:

- user authentication 
- user interface
- CRUD operations

Built with Node.js, Express, MongoDB, and JSX views.

## Features

- User registration and login with JWT
- Create, read, update, delete (CRUD) recipes
- Convenient interface for user
- JSX views for rendering Server-side
- Form validation and error handling
- Model and endpoint testing using Jest
- MVC architecture and environment config

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** JSX views, CSS
- **Auth:** JWT (JSON Web Tokens)
- **Testing:** Jest, Supertest, MongoDB Memory Server
- **Architecture:** MVC, Restful API


**Architecture Diagram:**:
```
┌───────────────┐    ┌─────────────────┐    ┌─────────────┐
│ Ingredients   │    │   Recipe        │    │    User     │
│               │    │                 │    │             │
│ • Iname       │    │ • Rtitle        │    | • name      │
│ • Iquantity   │    │ • Rowner        │    │ • email     │
│ • Iunit       │◄───│ • Ringredients[]│◄───│ • password  │
│ • IAdditional │    │ • Rinstructions │    │ • recipe[]  │
|               |    │ • Rcreated      │    |             |
|               |    │ • Rupdated      │    |             |
|               |    │ • RDescription  │    |             |
└───────────────┘    └─────────────────┘    └─────────────┘
```
## Routes Table

User

- POST	./users/register	    Register a new user
- POST	./users/login	        User login and receive JWT
- GET	./users/current?token	Get current user profile (auth required)

Recipe

- GET	    ./recipes	    Get all recipes for the logged-in user
- POST  	./recipes	    Create a new recipe
- GET	    ./recipes/:id	Get a specific recipe by ID
- PUT	    ./recipes/:id	Update a recipe
- DELETE	./recipes/:id	Delete a recipe

Ingredients

- GET 	    ./ingredients	    Get all ingredients
- POST	    ./ingredients	    Add a new ingredient
- GET	    ./ingredients/:id	Get specific ingredient
- PUT	    ./ingredients/:id	Update ingredient
- DELETE	./ingredients/:id	Delete ingredient

# GitHub
[Recipe-Organizer](https://github.com/Blu3Mu51c/Recipe-Organizer)

[Trello](https://trello.com/invite/b/688b0f0c5e3b4a57d97d8a5a/ATTIf53947960d97e8289c7aa13f0fc4d1d919E2ADC6/recipe-organizer)
