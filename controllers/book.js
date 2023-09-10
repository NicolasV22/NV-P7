const Book = require('../models/Book');
const sharp = require('sharp');
const fs = require('fs');




/* Controller de création d'un livre et conversion de l'image en webp avec utilisation de sharp */

exports.createBook = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({ error: 'Aucune image n\'a été téléchargée.' });
    }

    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const originalname=req.file.originalname;
    const timestamp = Date.now();
    const ref = `${timestamp}-${originalname}.webp`
/* La constante ref permet de donner un nom unique à chaque livre car on utilise un timestamp, précision du .web pour le format après conversion */

    sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(`./images/${ref}`);

            const book = new Book({
                ...bookObject,
                userId: req.auth.userId,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${ref}`
            });


            book.save()
                .then(() => {
                    res.status(201).json({ message: 'Objet enregistré !' });
                })
                .catch(error => {
                    res.status(400).json({ error });
                });
        };






/*Controller d'affichage de tous les livres */
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};



/*Controller d'affichage d'un livre */
exports.getOneBook =  (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};






/*Controller de modification d'un livre et toujours conversion de l'image en webp si modifiee via sharp */

exports.modifyBook =  (req, res, next) => {


    const originalname=req.file.originalname;
    const timestamp = Date.now();
    const ref = `${timestamp}-${originalname}.webp`
/* La constante ref permet de donner un nom unique à chaque livre car on utilise un timestamp, précision du .web pour le format après conversion */


    sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(`./images/${ref}`);


    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${ref}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'Unothaurized request'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};



/* Controller de suppression d'UN livre */
/* Suppression du livre de la base de données et suppression de l'image dans le dossier /images */

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };


/* Controller de rating d'un livre */
/* Notation allant de 1 à 5 */
/* Authentification nécessaire car si l'user a déjà donné une note il ne peut pas en remettre une sur le même livre / ni la modifier  */
/* Actualisation de la note moyenne du livre par la même ocassion afin de toujours avoir une note moyenne actualisée */

exports.bookRating = (req, res, next) => {
    const userId = req.body.userId;
    const rating = req.body.rating;


    if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: "La note doit être comprise entre 0 et 5." });
    }

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: "Livre non trouvé." });
            }

            const existingRating = book.ratings.find(r => r.userId === userId);

            if (existingRating) {
                return res.status(400).json({ error: "Vous avez déjà noté ce livre." });
            }

            book.ratings.push({ userId, grade: rating });

            const totalRating = book.ratings.reduce((sum, r) => sum + r.grade, 0);
            book.averageRating = totalRating / book.ratings.length;

            book.save()
                .then(updatedBook => {
                    res.status(201).json({ message: 'Note enregistrée !', book: updatedBook});
                });
        })
                .catch(error => res.status(500).json({ error }));
};








/*Controller d'affichage des livres les mieux notés */
exports.bestRatedBooks = (req, res, next) => {

    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
