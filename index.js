/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {

    const gamesContainer = document.getElementById("games-container");
    for (const game of games) {
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <p>Description: ${game.description}</p>
      <p>Power: ${game.pledged}</p>
      <p>Supporters: ${game.backers}</p>

      `;

        gamesContainer.appendChild(card);
    }
}
addGamesToPage(GAMES_JSON)



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);


contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');


// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged
}, 0);

// totalRaised = toLocaleString(totalRaised);
// totalRaised = totalRaised.toLocaleString('');
raisedCard.innerHTML = '$' + totalRaised.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let sumGamesCard = GAMES_JSON.reduce((sum, games) => {
    while (games) {
        return sum + 1
    }
}, 0)
gamesCard.innerHTML = sumGamesCard.toLocaleString('en-US');

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    deleteChildElements(gamesContainer);
    return games.filter(game => game.goal > game.pledged);
}


// show only games that are fully funded
function filterFundedOnly(games) {
    deleteChildElements(gamesContainer);
    return games.filter(game => game.pledged >= game.goal);

}

// show all games
function showAllGames(games) {
    deleteChildElements(gamesContainer);
    return games.filter(game => game);
    // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', () => {
    const unfundedGames = filterUnfundedOnly(GAMES_JSON);
    addGamesToPage(unfundedGames);
});

fundedBtn.addEventListener('click', () => {
    const fundedGames = filterFundedOnly(GAMES_JSON);
    addGamesToPage(fundedGames);
});

allBtn.addEventListener('click', () => {
    const allGames = showAllGames(GAMES_JSON);
    addGamesToPage(allGames);
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesforCount = filterUnfundedOnly(GAMES_JSON);
const fundedAllGames = showAllGames(GAMES_JSON)
// create a string that explains the number of unfunded games using the ternary operator
const totalUnfundedContributions = unfundedGamesforCount.length;
const printFundedAllGames = fundedAllGames.length;

// create a new DOM element containing the template string and append it to the description container
const contributionsComment = document.createElement("p");
contributionsComment.innerHTML = 'A total of ' +  '$' + totalRaised.toLocaleString('en-US') + ' has been raised for ' +totalUnfundedContributions.toLocaleString('en-US')+ ' games. Currently, ' +(printFundedAllGames - totalUnfundedContributions).toLocaleString('en-US') + ' game remains unfunded. We need your help to fund these amazing games!'
descriptionContainer.appendChild(contributionsComment);
// descriptionContainer.innerHTML += 'Total Amount Of Contributions: ' + totalUnfundedContributions + '<br>';
// descriptionContainer.innerHTML += 'Total Amount Of Unfunded: ' + (printFundedAllGames - totalUnfundedContributions);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");


const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});
// use destructuring and the spread operator to grab the first and second games
const [item1, item2] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstItemNote = document.createElement("p");
firstItemNote.textContent = item1.name;
firstGameContainer.appendChild(firstItemNote); 
// do the same for the runner up item
const secondItemNote = document.createElement("p");
secondItemNote.textContent = item2.name;
secondGameContainer.appendChild(secondItemNote); 

addGamesToPage(GAMES_JSON)

