const mongoose = require('mongoose')

// Create the connection
let DBURL = process.env.DATABASE


mongoose.connect(DBURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Connection reussi à mongoDB")
})
.catch((err) => {
		console.log(err)
})

// Store the connection
const db = mongoose.connection

module.exports = db
