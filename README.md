"# pokemon-app#"
⚙️ Backend (Symfony)
Installation de Symfony pour gérer l'environnement backend.

Création d'une base de données MySQL via Symfony, avec visualisation grâce à MAMP.

Création d'une entité Pokemon pour stocker :

l’ID,

le nom,

les types,

l’image des Pokémon.

Développement d'une commande personnalisée permettant d'importer les données depuis la PokéAPI dans la base de données locale.

Exécution des migrations pour insérer les données dans la base.

Utilisation de API Platform pour exposer l'entité Pokemon en tant que ressource API REST, accessible via HTTP.

💻 Frontend (React + Next.js)
Création de l'environnement frontend avec React et Next.js en JavaScript (via npm).

Création d’un dossier pokemon_app servant de route principale (avec gestion des vues via pages/index.jsx grâce à Next.js).

Écriture d’un script JavaScript avec fetch() pour interroger l’API backend et afficher :

le nom,

l’image,

le type,

l’ID des Pokémon.

Ajout de styles CSS pour rendre l’interface intuitive, dynamique et visuellement agréable.