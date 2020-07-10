const fs = require('fs');
const yaml = require('js-yaml');


let data = {
    User: {
        name_surname: 'Ainhoa Izkue',
        user_id: 'ainhoaizkue19@gmail.com',
        password: 123
    }
};


let yamlStr = yaml.safeDump(data);

//Esto sirve para crear un fichero con este datos, destruye lo que haya.
//Hay que ejecutarlo en la terminal poniendo node y la ruta relativa del users.js
fs.writeFileSync('src/pages/_data/users2.yml', yamlStr, 'utf8')



//Esto sirve para añadir en un fichero con datos más datos
fs.appendFileSync('src/pages/_data/users.yml',yamlStr);
