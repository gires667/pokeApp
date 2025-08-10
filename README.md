pokemon-app
⚙️ Backend (Symfony)
Installation of Symfony to manage the backend environment.

Creation of a MySQL database via Symfony, with visualization using MAMP.

Creation of a Pokemon entity to store:

ID,

Name,

Types,

Image of the Pokémon.


creation of a controller with POST method to import the pokemon from POKEAPI into my local database

Execution of migrations to insert the data into the database.

Use of API Platform to expose the Pokemon entity as a RESTful API resource, accessible via HTTP. //after has been fixe with use of controller it is not more used in the code 

Creation of a custom controller with a GET method to fetch data from the backend and send it to the frontend.

💻 Frontend (React + Next.js)
Setup of the frontend environment using React and Next.js in JavaScript (via npm).

Creation of a pokemon_app folder serving as the main route (with view management using pages/index.jsx with next.js).

Writing a JavaScript script using fetch() to query the backend API and display:

Name,

Image,

Type,

ID of the Pokémon.

Addition of CSS styles to make the interface intuitive, dynamic, and visually appealing.
Addition of search bar to search pokemons 