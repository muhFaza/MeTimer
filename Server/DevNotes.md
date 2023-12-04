# MeTimer Dev Notes 

## Helper Functions
- Hash Passwords with bcrypt
- Compare Passwords with bcrypt
- Generate JWT with jsonwebtoken
- Verify JWT with jsonwebtoken

## .env
- PORT=3000 (for development)
- JWT_SECRET (asks)

## Database
- MongoDB
- Database Name: MeTimer
- Collections: Users

## Model
- User
    - username: String
    - email: String
    - password: String
    - firstName: String (maybe?)
    - lastName: String (maybe?)
    - imgUrl: String (maybe?)
    - phoneNumber: String
    - address: String
    - updatedAt: Date
    - createdAt: Date

- Available Functions
    - User.create(data)
    - User.findAll()
    - User.findByPk(id)
    - User.findByUsername(username)
    - User.findOrCreate(username, email, data)
    - User.update(data)
    - User.destroy(id)
