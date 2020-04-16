//TODO Basic express setup

//#auth endpoints
//TODO login, register, logout, getUser

//#posts endpoints
//TODO get post put delete posts

require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const postCtrl = require('./controller')
const authCtrl = require('./authController')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} =process.env
const app = express()
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 *60 *60*24*30},
    secret: SESSION_SECRET
}))


massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log(`DB IS CONNECTED`)
    app.listen(SERVER_PORT, () => console.log(`DOCKED AT PORT ${SERVER_PORT}`))
})

app.get('/auth/user', authCtrl.getUser)
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logout)

app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:id', postCtrl.editPost)
app.delete('/api/posts/:id', postCtrl.deletePost)
