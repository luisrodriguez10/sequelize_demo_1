const {models: {User}} = require('../db')
const app = require('express').Router()

module.exports = app

app.delete('/:id', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.destroy();
        res.redirect('/users')
    } catch (error) {
        next(error)
    }
})

app.post('/', async(req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.redirect(`/users/${user.id}`)
    } catch (error) {
        next(error)
    }
})

app.get('/', async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/styles.css'>
                </head>
                <body>
                    <h1>Users (${users.length})</h1>
                    <form method='POST' id='user-form'>
                        <input name='email' placeHolder='Enter email'/>
                        <textarea name='bio'></textarea>
                        <button>Create</button>
                    </form>
                    <ul>
                        ${users.map(user => `
                            <li><a href='/users/${user.id}'>${user.email}</a></li>
                        `).join('')}
                    </ul>
                </body>
            </html>
        `);
    } catch (error) {
        next(error)
    }
})

app.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        const users = await User.findAll()
        res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/styles.css'>
                </head>
                <body>
                    <h1>Users ${users.length}</h1>
                    <a href='/users'>
                        ${user.email}
                    </a>
                    <p>
                        ${user.bio}
                    </p>
                    <form method='POST' action='/users/${user.id}?_method=DELETE'>
                        <button>X</button>
                    </form>
                </body>
            </html>
        `);
    } catch (error) {
        next(error)
    }
})
