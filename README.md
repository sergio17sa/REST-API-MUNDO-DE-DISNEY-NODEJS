# REST API MUNDO DE DISNEY BACKEND

Desarrollo del challenge de backend de ALKEMY utilizando NodeJS, Express, PostgreSQL, NodemaileR, bcrypt Y JWT.

## FUNCIONALIDADES

- Registro de usuarios a través un endpoint Register que hashea la password antes de guardarla en la base de datos con el module bcrypt.

- Autenticación de usuarios mediante  JWT a través de un endpoint de LOGIN y un middleware "validate token" para el resto de las rutas.

- (CRUD) tiene operaciones de creación, edición, eliminación y lectura de personajes y peliculas.

- Permite listar personajes, buscarlos por nombre, filtrarlos por edad, peso o peliculas en las que participaron mediante parametros enviados por query.

- Permite listar peliculas, buscarlas por nombre, genero y ordenarlas de forma ascendente o descendente mediante parametros enviados por query.

- Envío de email de confirmación de usuario registrado mediante el modulo Nodemailer.


## ENDPOINTS


```bash
GET ALL CHARACTERS request GET 'http://localhost:3001/characters' \
DELETE CHARACTERS  request DELETE 'http://localhost:3001/characters/8e02a9c9-5c5b-4a24-b518-91240e14bb69'
CREATE CHARACTER request POST 'http://localhost:3001/characters' \
UPDATE CHARACTER request PUT 'http://localhost:3001/characters/da33bafa-6416-4ada-8a15-6b82d48b78cb' \
DETAIL CHARACTER BY ID request GET 'http://localhost:3001/characters/8fcd301a-9240-4b5c-a174-2695bd2dd6b7'
GET ALL MOVIES request GET 'http://localhost:3001/movies/?genre=98d042e8-e66f-4b9e-bc60-e0b703cb6754'
CREATE MOVIE request POST 'http://localhost:3001/movies/' \
UPDATE MOVIE request PUT 'http://localhost:3001/movies/fffb33f8-9c4c-468c-9294-85b7dc6311db' \
DELETE MOVIE request DELETE 'http://localhost:3001/movies/f2d9440b-7604-49b3-8271-bd294405'
GET MOVIE DETAIL request GET 'http://localhost:3001/movies/fffb33f8-9c4c-468c-9294-85b7dc6311db'
USER REGISTER request POST 'http://localhost:3001/auth/register' \
USER LOGIN request POST 'http://localhost:3001/auth/login' \
```
## URL POSTMAN DOCUMENTATION
```python
En la siguiente URL se pueden ver con detalle los endpoints y los ejemplos de como se envía la información vía JSON

# REST API DISNEY
'https://documenter.getpostman.com/view/20684779/UzdzRjWk'

## LA API ESTA CONFIGURADA PARA QUE CORRA EN LOCALHOST/3001
```

```python
DATOS DE CONTACTO

# SERGIO SALGADO
LinkedIn: 'linkedin.com/in/sergiosalgado17'
Email: 'sergiosalgado624@gmail.com'
```

