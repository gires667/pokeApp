pokemon-app
⚙️ Backend (Symfony)
Installation of Symfony to manage the backend environment.

Creation of a MySQL database via Symfony, with visualization using MAMP.

Creation of a Pokemon entity to store:

ID,

Name,

Types,

Image of the Pokémon.

Development of a custom command to import data from the PokéAPI into the local database.

Execution of migrations to insert the data into the database.

Use of API Platform to expose the Pokemon entity as a RESTful API resource, accessible via HTTP.

Creation of a custom controller with a GET method to fetch data from the backend and send it to the frontend.

💻 Frontend (React + Next.js)
Setup of the frontend environment using React and Next.js in JavaScript (via npm).

Creation of a pokemon_app folder serving as the main route (with view management using pages/index.jsx thanks to Next.js).

Writing a JavaScript script using fetch() to query the backend API and display:

Name,

Image,

Type,

ID of the Pokémon.

Addition of CSS styles to make the interface intuitive, dynamic, and visually appealing.