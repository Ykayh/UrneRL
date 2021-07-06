Bonjour / Bonsoir

Tout d'abord décompressé le .zip du projet


Puis, entrez dans le dossier du projet et entrez cmd au niveau de la barre de chemin ou faites windows + R, cmd et cd chemin du fichier dans votre machine

Une fois l'invite de commande du projet ouverte, entrez npm install 

Maintenant, allez dans postgreSQL  que vous devez avoir installé au préalable avec les configurations suivantes :
user: 'postgres',
	host: 'localhost',
	password: 'Rochroch',
	database: 'urneurlt'

Si elles ne vous conviennent pas vous pouvez modifier dans le fichier api.js ligne 9 à 14 avec vos propres configurations de cette dernière hormis le nom de la base de données

Puis vous faites un clique droit sur votre base de données puis vous choisissez restore et sélectionné le fichier urneurlt.sql qui est contenu dans le dossier projet_groupe127

Vous pouvez dès lors retourner sur l'invite de commande et entrer npm start pour lancer le programme

Une fois lancé, allez sur votre navigateur et entrez : http://localhost:3000/

Vous êtes sur le site et pouvez y naviguer 

Je vous laisse découvrir le site et ses fonctionnalités 