// Importeer express uit de node_modules map
import express, { response } from "express";

const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set("view engine", "ejs");
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources
app.use(express.static("public"));

// Maak een route voor de index
// Deze route is data aan het ophalen uit de whois api
app.get('/', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squad-b-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('index', data)
  })
})


// Deze lossen routes horen bij mijn menu. ik haal hier de data op van alle squads+members. 
//Ik moest deze aparte routes aanmaken om zo mijn ejs paginas te linken aan het menu

app.get('/all', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squad-b-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('all', data)
  })
})


app.get('/squad-a', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squad-a-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('squad-a', data)
  })
})


app.get('/squat-c', (request, response) => {
  console.log(request.query.squad)

  let slug = request.query.squad || 'squat-c-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('squat-c', data)
  })
})



// Stel het poortnummer in waar express op gaat luisteren
app.set("port", process.env.PORT || 2000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}