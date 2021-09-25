const { Router } = require('express');
const DirectorSchema = require('../model/Directors');
const mongoose = require('mongoose');
const router = Router();

//bunda videoni quygan mualliflar add
router.post('/', (req, res) => {
    const db = new DirectorSchema(req.body);
    db.save().then(data => res.json(data))
        .catch(err => console.log(err));
    //bu post da video mualliflari add
});

//all muallifini kursatadi
// router.get('/', (req, res) => {
//     DirectorSchema.find({})
//         .then(data => res.json(data))
//         .catch(err => console.log(err));
//     //bu post da video mualliflari add
// });

// muallif idsi orqali chiqarish
router.get('/', (req, res) => {
    const promise = DirectorSchema.aggregate([{
            $lookup: {
                from: 'movies', // qayerdan olish
                localField: '_id', // id orqali
                foreignField: 'director_id', //director_id tortib olyabdi
                as: 'film' // film degan kalit ochib unga tepadagilarni add
            }
        },
        {
            $unwind: { //malumotlarni joylashtirayapti
                path: '$film' // path film turgan joyi
            }
        },
        {
            $group: {
                //$group guruhlash
                _id: {
                    _id: '$_id',
                    name: "$name",
                    surname: '$surname',
                    bio: '$bio'
                },
                film: {
                    $push: '$film'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                film: '$film' // bunga $pushdagi film chaqirilayapti
            }
        }
    ]);
    promise
        .then(data => res.json(data))
        .catch(err => console.log(err));
});


// muallif idsi orqali chiqarish
router.get('/:director_id', (req, res) => {
    const promise = DirectorSchema.aggregate([
        {
            $match: {
                "_id": mongoose.Types.ObjectId(req.params.director_id) // _idni string da yozilsilishi kerak
            }
        },
        {
            $lookup: {
                from: 'movies', // qayerdan olish
                localField: '_id', // id orqali
                foreignField: 'director_id', //director_id tortib olyabdi
                as: 'film' // film degan kalit ochib unga tepadagilarni add
            }
        },
        {
            $unwind: { //malumotlarni joylashtirayapti
                path: '$film' // path film turgan joyi
            }
        },
        {
            $group: {
                //$group guruhlash
                _id: {
                    _id: '$_id',
                    name: "$name",
                    surname: '$surname',
                    bio: '$bio'
                },
                film: {
                    $push: '$film'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                film: '$film' // bunga $pushdagi film chaqirilayapti
            }
        }
    ]);
    promise
        .then(data => res.json(data))
        .catch(err => console.log(err));
});
router.delete('/:director_id', (req, res) => {
    DirectorSchema.findByIdAndRemove(req.params.director_id, (err, doc) => {
        if (!err) {
            console.log('DELETED')
        } else {
            console.log(`ERROR BOLDI`+ err);
        };
    });
    
});

module.exports = router;