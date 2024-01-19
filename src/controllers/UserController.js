/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : 08/01/2024 16:19:02
 */
const moment = require('moment')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel');


/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
 module.exports = {
//     loadUsers: async (req, res) => {
//         let users = []
//         // let users = await UserModel.findOne();
//         console.log({users});
//         if (true) {
            
//             for (let index = 0; index < max; index++) {
//                 const password = bcrypt.hashSync('12345678', 10);
//                 const user = new UserModel({
//                     // first_name: faker.firstName,
//                     last_name: faker.lastName(),
//                     email: faker.email(),
//                     password: password,
//                 });
//                 users.push(user)

//                 await user.save(); // Ajouter cette ligne pour sauvegarder l'utilisateur dans la base de données
//             }
//         }
//         res.status(200).json(users)

//     },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.signupUser()
     */
    signupUser: async (req, res, next) => {

        try {
            let { firstname, lastname, fullName, receivePromoMessage, email, password, created_at } = req.body

            firstname = firstname ? firstname.toUpperCase() : null
            lastname = lastname ? lastname[0].toUpperCase() + lastname.slice(1) : null
            fullName = fullName ? fullName[0].toUpperCase() + fullName.slice(1) : null
            // REGEX for E-mail validation
            const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

            if (fullName === '' || fullName == null) {
                return res.status(422).json({
                    status: 422,
                    'error': 'fullNameError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            if (email === '' || email == null || !reg.test(email)) {
                return res.status(422).json({
                    status: 422,
                    'error': 'emailError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            if (password.length < 6 || password == null) {
                return res.status(422).json({
                    status: 422,
                    'error': 'passwordError',
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }

            const UserEmailExist = await UserModel.findOne({ email: email })

            if (UserEmailExist) {
                return res.status(422).json({
                    status: 422,
                    'error': 'Cet email est déjà utilisé, Merci de le changer.',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })
            }
            // If Username or email is not used
            bcrypt.hash(password, 10, async (err, password) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        'message': "Erreur serveur. Veuillez réessayer plus tard.",
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    })
                }

                const profile = new profileModel({ firstname, fullName, lastname, email,  created_at })
                const User = new UserModel({ firstname, fullName, lastname, email, password, created_at })
                // const networkInformation = await getIpData(req)

                // if (receivePromoMessage) {
                //     User.receivePromoMessage = receivePromoMessage
                // }

                profile.UserId = User._id
                User.profile = profile._id

                const token = randomToken(152);
                User.verifyAccountToken = token
                User.verifyAccountExpires = Date.now() + 3600000

                if (networkInformation.status !== "fail") {
                    User.networkInformation = networkInformation
                }
                await User.save()
                await profile.save()

                // Welcome Email
                // const data = await getClientData(req)
                // emailSender.welcomeUser(User, data)
                
                // ///verify Account
                // emailSender.verifyEmail(User, data)

                res.status(200).json({
                    status: 200,
                    isSuccess: true,
                    'message': 'Inscription réussie.',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                })

            })



        } catch (error) {

            console.log(error)

            res.status(500).json({
                status: 500,
                isSuccess: false,
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            })
        }
    },

    signinUser: (req, res) => {
        UserModel.findOne({ email: req.body.email }, (err, User) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: err.message,
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }
            if (!User) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found !',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }
            bcrypt.compare(req.body.password, User.password, (err, valid) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: err.message,
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    });
                }
                if (!valid) {
                    return res.status(401).json({
                        status: 401,
                        message: "Bad Password !",
                        request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                    });
                }

                return res.status(200).json({
                    UserId: User._id,
                    token: jwt.sign(
                        { UserId: User._id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: process.env.TOKEN_EXPIRATION }
                    )
                })

            })
        })
    },
       /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.getUsers()
     */
       getUsersByPage: async (req, res) => {
        try {
            let pageNumber = req.query?.pageNumber ? parseInt(req.query?.pageNumber) : 1
            let pageLimit = req.query?.pageLimit ? parseInt(req.query?.pageLimit) : 5

            let allCount = await UserModel.find({}).count()

            if(pageNumber >  Math.ceil(allCount/pageLimit)){
                const value = Math.ceil(allCount/pageLimit)
                pageNumber = value > 0 ? value : 1
            }

            let Users = await UserModel.find({},{password: false})
                // .populate("name")
                .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            Users = Users.map((item) => {
                item.created_formatted_with_time_since = moment(item?.created_at).fromNow()
                return item
            })

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                allCount: allCount,
                resultCount: Users.length,
                current: pageNumber,
                next: allCount > (pageNumber*pageLimit) ? pageNumber + 1 : null,
                previous: pageNumber - 1 > 0 ? pageNumber - 1 : null,
                results: Users.slice(0, pageLimit),
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            })
            

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting User.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
},
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.getUsers()
     */
    getUsers: async (req, res) => {
        try {
            const Users = await UserModel.find({})

            return res.json({
                isSuccess: true,
                status: 200,
                resultCount: Users.length,
                results: Users,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch(error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting User.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
},

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.showUserById()
     */
    searchUserByTag: async (req, res) => {
        try {

            let filter = {}
            let pageNumber = req.query?.pageNumber ? parseInt(req.query?.pageNumber) : 1
            let pageLimit = req.query?.pageLimit ? parseInt(req.query?.pageLimit) : 5

            

            const email = req.query?.email ? new RegExp(req.query.email, 'i') : null
            const name = req.query?.name ? new RegExp(req.query.name, 'i') : null
            const content = req.query?.content ? new RegExp(req.query.content, 'i') : null
            const description = req.query?.description ? new RegExp(req.query.content, 'i') : null
            const startDate = req.query?.startDate ? new Date(req.query?.startDate) : null
            const endDate = req.query?.endDate ? new Date(req.query?.endDate) : null

            if(email){
                filter.email = email
            }
            if(name){
                filter.name = name
            }
            if(content){
                filter.content = content
            }
            if(description){
                filter.description = description
            }
            if (startDate) {
                filter.created_at = { $gt: startDate }
            }

            if (endDate) {
                if (filter.created_at) {
                    filter.created_at = { ...filter.created_at, $lt: endDate }
                } else {
                    filter.created_at = { $lt: endDate }
                }
            }

            let allCount = await UserModel.find(filter).count()

            if(pageNumber >  Math.ceil(allCount/pageLimit)){
                const value = Math.ceil(allCount/pageLimit)
                pageNumber = value > 0 ? value : 1
            }
                // .populate({ path: "account", options: { sort: { 'created_at': -1 } } })
                // .sort('-created_at')
                // .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            let Users = await UserModel.find(filter)
                // .populate({ path: "account", options: { sort: { 'created_at': -1 } } })
                .sort('-created_at')
                .skip((pageNumber - 1) * pageLimit).limit(pageLimit)

            Users = Users.map((item) => {
                    item.created_formatted_with_time_since = moment(item?.created_at).fromNow()
                    return item
            })

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                filter: req.query,
                resultCount: allCount,
                allCount: allCount,
                current: pageNumber,
                next: allCount > (pageNumber*pageLimit) ? pageNumber + 1 : null,
                previous: pageNumber - 1 > 0 ? pageNumber - 1 : null,
                results: Users.slice(0, pageLimit),
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting User.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    }
    },
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.showUserById()
     */
    showUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const User = await UserModel.findOne({ _id: id })

            if (!User) {
                return res.status(404).json({
                    isSuccess: false,
                    status: 404,
                    message: 'No such User',
                    request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
                });
            }

            return res.status(200).json({
                isSuccess: true,
                status: 200,
                result: User,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when getting User.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.createUser()
     */
    createUser: async (req, res) => {
    try {

        
        if(req.file){
            var  User  = JSON.parse(req.body.User)
        }else{
            var { User } = req.body
        }

        if(!User){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Missing params of User.',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }

        if(!Object.keys(User).length){
            return res.status(422).json({
                isSuccess: false,
                status: 422,
                message: 'Empty User !',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }

        // if (req.file) {
        //     User.imageUrl = `${req.protocol}://${req.get('host')}/assets/files/${req.file.filename}`
        // }

        User = new UserModel({ ...User })

        User.created_at = User?.created_at ? User.created_at : new Date()

        await User.save()

        return res.status(201).json({
            isSuccess: true,
            status: 201,
            message: "User is saved !",
                User,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                isSuccess: false,
                status: 500,
                message: 'Error when creating User.',
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController. updateUserById()
     */
    updateUserById: async (req, res) => {
    try {
        const id = req.params.id;
        if(req.file){
            var  User  = JSON.parse(req.body.User)
        }else{
            var { User } = req.body
        }

        if(!User){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Missing params of User.',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
        if(!Object.keys(User).length){
            return res.status(500).json({
                isSuccess: false,
                status: 422,
                message: 'Empty User !',
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });
        }
        // if (req.file) {
        //     console.log({ imageUrl: User.imageUrl });
        //     const old_image = User.imageUrl
        //     User.imageUrl = `${req.protocol}://${req.get('host')}/assets/files/${req.file.filename}`

        //     if (old_image) {
        //         const filename = "public/assets/" + old_image.split('/assets/')[1];
        //         console.log({ filename });
        //         fs.unlink(filename, (err) => {
        //             if (err) {
        //                 console.log(err.message);
        //             }
        //         });
        //     }
        // }

        User.updated_at = User?.updated_at ? User.updated_at : new Date()

        delete User?._id
        await UserModel.updateOne({ _id: id }, { ...User })

        return res.status(200).json({
            isSuccess: true,
            status: 200,
            message: "User is updated !",
                User,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            isSuccess: false,
            status: 500,
            message: 'Error when updating User.',
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });
    }
    },
    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.sortUserByPosition
     */
    sortUserByPosition: (req, res) => {
    try {

        const { datas } = req.body

        datas.forEach(async (elt) => {
            await UserModel.updateOne({ _id: elt._id }, {
                $set: { position: elt.position }
            })
        });


        return res.status(200).json({
            status: 200,
            isSuccess: true,
            message: "User sorted !",
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: 500,
            isSuccess: false,
            error: error,
            request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
        })

        }
    },

    /**
     * Generate By Mudey Formation (https://mudey.fr)
     * UserController.removeUserById()
     */
    removeUserById: async (req, res) => {
        try {
            var id = req.params.id;

            const User = await UserModel.findOne({ _id: id }, { imageUrl: true })
            if (User) {
                // const old_image = User.imageUrl
                // if (old_image) {
                //     const filename = "public/assets/" + old_image.split('/assets/')[1];
                //     console.log({ filename });
                //     fs.unlink(filename, (err) => {
                //         if (err) {
                //             console.log(err.message);
                //         }
                //     });
                // }
                await UserModel.deleteOne({ _id: id })


                return res.status(204).json({
                    // 204 No Content
                    // isSuccess: true,
                    // status: 204,
                    // message: 'Data deleted ! .',
                });

            }

            return res.status(204).json({
                // 204 No Content
                // isSuccess: true,
                // status: 204,
                // message: 'Data deleted ! .',
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                isSuccess: false,
                status: 500,
                message: 'Error when deleting User.',
                error: error,
                request_time: moment(new Date()).format("DD/MM/YY HH:mm:ss")
            });

        }
    }
};
