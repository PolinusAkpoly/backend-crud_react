/**
 * Generate By Mudey Formation (https://mudey.fr)
 * Created at : 08/01/2024 16:19:02
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
	'first_name' : String,
	'last_name' : String,
	'email' : String,
	'roles' : Array,
	'password' : String,
	'created_at' : Date,
	'update_at' : Date,
	'position' : Number,
	'updated_at' : Date,
	'created_at' : {type: Date, default: new Date()},
	'created_formatted_with_time_since' : String,
	'updated_formatted_with_time_since' : String
});

module.exports = mongoose.model('User', UserSchema);
