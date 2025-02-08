<div id="top"></div>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT NAME AND SCREENSHOT -->
<br />
<div align="center">
  <h3 align="center">BOLÃO BRASILEIRÃO 2023</h3>
</div>

[![Product Name Screen Shot][product-screenshot]](https://bolao2022.vercel.app)

<!-- ABOUT THE PROJECT -->

## About the project

Personal project. For some time I've been running football sweepstakes among friends for fun. I used to organise everything in an automated spreadsheet. It has now become a React app.

The "bolão" (Portuguese for "big ball" - how we call sweepstakes in Brazil), or better the "bolões" (plural) consist of two separate championships - the Série A (Brazilian football league) and the Série B (the second tier).

<p align="right">(<a href="#top">back to top</a>)</p>

### Built with

-   [React.js](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [API Futebol](https://www.api-futebol.com.br/)
-   [Puppeteer](https://github.com/puppeteer/puppeteer)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/alexandreoliv/bolao.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Environment variables (from the API) are stored in .env files, naturally not included here

<p></p>

4. To run the project, type in the root folder:
    ```sh
    npm start
    ```
5. If not automatically opened, open the web browser and enter
    ```sh
    http://localhost:3000/
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. In <i>"Apostas A"</i> or <i>"Apostas B"</i> one can see all the bets, the first column <i>"Equipes"</i> being the "Teams", the second column <i>"Atual"</i> meaning their current standings (taken from an API in the case of "Série A", and hardcoded in the "Série B" — see <i>"Future improvements"</i> below for more details), and the rest of the columns being each bettor's bet for the final standing of that team.

<p></p>

2. In <i>"Classificação A"</i> or <i>"Classificação B"</i> there's the bettor's standings, column <i>"Pontuação"</i> showing their current score.

<p></p>

3. <i>"Distância A"</i> or <i>"Distância B"</i> is similar to <i>"Apostas"</i>, showing how distant to the current standings the bets were. The numbers have conditional formatting - the greener the better, the redder the worse, in a 20-point scale.

<p></p>

4. <i>"Regras"</i> just shows how the scores are calculated. A correct prediction gets 5 points, missing by one position gets you 3 points, missing by 2 gets you 1 point, and so on.

<p></p>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- FUTURE IMPROVEMENTS -->

## Future improvements

When I created the app, the bets had already been made, so there was no need to implement neither the login or "bet" pages, nor a database.

1. Add log in and "bet" pages.
2. Transfer hardcoded data to database.
3. There's currently no free APIs for the Série B league, so I need to update the JSON file semi-manually after each round. Perhaps implement some web scraping or hope for a free API to be released in the future.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexandre-oliv/
[product-screenshot]: images/screenshot.png
