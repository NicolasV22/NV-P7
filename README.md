# NV-P7
NV-P7

Création d'une api pour le site Mon Vieux Grimoire (Site communautaire permettant de partager un livre et de lui donner une note, la communauté peut également donner une note à un livre déjà ajouté)


Création d'une API et backend pour les opérations sur les livres (route book) et sur la connexion/inscription (route auth)
-> Les routes sont commentées directement dans le dossier routes, elles utilisent elles-même des middleware et controllers qui sont détaillés.

Connexion à la BDD sécurisée avec utilisation de .env (base de données mongoDB)
Securisation du compte lors de l'inscription mot de passe haché avec bcrypt
Token généré à la connexion via jwt pour sécuriser les opérations (token valable 24h)
Actellement execution du backend sur port localhost 4000


Packages utilisés : multer, express, fs, sharp, mongoose, dotenv, path, jwt, bcrypt.
Recommandation d'utilisation de nodemon server pour exécuter le backend(une fois la base de données installée elle peut directement être exécutée après installation de packages requis)

N'hésitez pas à me contacter si besoin d'informations complémentaires ! 
