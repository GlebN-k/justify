import express from 'express';
import { engine } from 'express-handlebars'

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', engine({
    defaultLayout: 'main',
  }))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')  
  // res.type('text/plain')
    // res.send('Meadowall travel')
})

app.get('/about', (req, res) => {
  res.render('about')  
  // res.type('text/plain')
    // res.send('About Meadowlark Travel')
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
  // res.type('text/plain')
  // res.send('404 — Не найдено')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
    // res.type('text/plain')
    // res.send('500 — Ошибка сервера')
})

app.listen(port, ()=> {
    console.log(`Express запущен на http://localhost:${port}; ` +
    `нажмите Ctrl+CCC для завершения.` )
})


