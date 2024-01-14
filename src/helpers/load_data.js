const UserModel = require("../models/UserModel")
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const PostModel = require("../models/PostModel");


module.exports = {
    loadUsers: async (max = 200) => {

        const users = await UserModel.find({});
        
        if (users.length === 0) {
            for (let index = 0; index < max; index++) {
                const password = bcrypt.hashSync('12345678', 10);
                const user = new UserModel({
                    first_name: faker.internet.userName(),
                    last_name: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: password,
                });

                console.log(user);

                // await user.save(); // Ajouter cette ligne pour sauvegarder l'utilisateur dans la base de données
            }
        }

    },
    loadPost: async (max = 200) => {
        const post = await PostModel.find({});
        
        if (post.length === 0) {

            const existingUser = await UserModel.findOne({});

            if (!existingUser) {
                console.error("Aucun utilisateur existant trouvé.");
                return;
            }
    

            for (let index = 0; index < max; index++) {
                const post = new PostModel({
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraph(),
                    content: faker.lorem.paragraphs(3),
                    author: existingUser._id, // Utilisez une fonction pour générer un nouvel ObjectId
                    imageUrl: faker.image.url(),
                    isPublished: false,
                    position: index + 1,
                });
    
                console.log(post);
    
                //  await post.save(); // Décommentez cette ligne pour sauvegarder l'article dans la base de données
            }
        }
    }
    
}