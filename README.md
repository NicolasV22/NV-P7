# NV-P7
NV-P7


## Descripion de l'API
- Création d'une api pour le site Mon Vieux Grimoire (Site communautaire permettant de partager un livre et de lui donner une note, la communauté peut également donner une note à un livre déjà ajouté)


- Création d'une API et backend pour les opérations sur les livres (route book) et sur la connexion/inscription (route auth)
-> Les routes sont commentées directement dans le dossier routes, elles utilisent elles-même des middleware et controllers qui sont détaillés.

### Installation du projet

Installer [Node.js] (pour utiliser [Node Packages Manager][npm] et les packages requis (cf Package utilisés)

```
npm install multer
```


Créer un dossier pour accueillir le backend 
```
mkdir [votre dossier]
```

Se rendre dans le dossier
```
cd [votre dossier]
```

Installer nodemon server
```
npm install nodemon server
```

Executer le backend (il faut se trouver dans le dossier)
```
nodemon server
```


### Informations complémentaires
- Connexion à la BDD sécurisée avec utilisation de .env (base de données mongoDB)
- Securisation du compte lors de l'inscription mot de passe haché avec bcrypt
- Token généré à la connexion via jwt pour sécuriser les opérations (token valable 24h)
- Actellement execution du backend sur port localhost 4000

### Package utilisés
- [multer]
- [express]
-  [fs]
-  [sharp]
- [mongoose]
-  [dotenv]
- [path] 
-    [jwt]
-    [bcrypt]



### N'hésitez pas à me contacter 
 <p align="center"> N'hésitez pas à me contacter si besoin d'informations complémentaires ! </p>


 [Node.js]: https://nodejs.org/
 [npm] : https://www.npmjs.com/get-npm
 
