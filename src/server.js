const express = require('express')
const router = require('./routes/index')
const catchAllErrors = require('./middlewares/catchAllErrors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', router)
app.use(catchAllErrors)

app.listen(PORT, function () {
	console.log(`API started at http://localhost:${PORT}`)
})

