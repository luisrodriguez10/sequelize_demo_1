const {db, syncAndSeed, models: {User}} = require('./db')
const path = require('path')
const express = require('express');
const app = express()

app.use(express.urlencoded({extended : false}))
app.use(require('method-override')('_method'))

app.get('/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'styles.css')))

app.get('/', (req, res) => res.redirect('/users'));

app.use('/users', require('./routes/users'))

const init = async () => {
  try {
    await db.authenticate();
    if(process.env.SYNC){
        await syncAndSeed();
    }
    const port  = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error);
  }
};

init();
