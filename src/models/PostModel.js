/**
 * Generate By Mudey Formation (https://mudey.fr)
 * Created at : 08/01/2024 17:26:59
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assurez-vous d'importer le modèle User si ce n'est pas déjà fait
const User = require('./UserModel'); // Assurez-vous que le chemin est correct

const PostSchema = new Schema({
  title: String,
  description: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId, // Utilisez 'Schema.Types.ObjectId'
    ref: 'User' // Utilisez une chaîne pour la référence au modèle User
  },
  imageUrl: String,
  isPublished: Boolean,
  position: Number,
  updated_at: { type: Date, default: Date.now }, // Utilisez Date.now pour la valeur par défaut
  created_at: { type: Date, default: Date.now },
  created_formatted_with_time_since: String,
  updated_formatted_with_time_since: String
});

module.exports = mongoose.model('Post', PostSchema);

