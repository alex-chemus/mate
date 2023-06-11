const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
const PORT = process.env.PORT || 80

app.use(history())
app.use(express.static('dist'))

/*app.get('/*', (_, res) => {
  res.sendFile('./dist/index.html')
})*/

app.listen(PORT, () => {
  console.log(`Server has been start on port ${PORT}`)
})
