import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'
import { getFortune } from '../lib/fortune.js';
// const fortune = require('../lib/fortune')

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express()
const port = process.env.PORT || 3000
// const fortunes = [
//   "Победи свои страхи, или они победят тебя.",
//   "Рекам нужны истоки.",
//   "Не бойся неведомого.",
//   "Тебя ждет приятный сюрприз.",
//   "Будь проще везде, где только можно.",
// ]

app.engine('handlebars', engine({
  defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

// app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('home')
  // res.type('text/plain')
  // res.send('Meadowall travel')
})

app.get('/about', (req, res) => {
  // const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  // res.render('about', { fortune: randomFortune })
  res.render('about', { fortune: getFortune() })

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

app.listen(port, () => {
  console.log(`Express запущен на http://localhost:${port}; ` +
    `нажмите Ctrl+CCC для завершения.`)
})


