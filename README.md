<div id="top"></div>

<!-- PROJECT SHIELDS -->

<!-- PROJECT NAME AND SCREENSHOT -->
<br />
<div align="center">
  <h3 align="center">BOLÃO CAMPEONATO BRASILEIRO ⚽</h3>
</div>

[![Product Name Screen Shot][product-screenshot]](https://bolao-vite.vercel.app/)

<!-- ABOUT THE PROJECT -->

## About the project 🎯

Personal project. For a while, I've been organizing football sweepstakes among friends as a hobby. I used to organise everything in automated spreadsheets. It has since evolved into a React app.

The "bolão" (Portuguese for "big ball"—how we call sweepstakes in Brazil), or better the "bolões" (plural) consist of two separate championships – the Série A (Brazilian football league) and the Série B (the second tier). ⚽

#### 🌐 Live Deployment: [bolao-vite.vercel.app](https://bolao-vite.vercel.app/)

You can also find me on [![LinkedIn][linkedin-shield]][linkedin-url]

### Built with 🛠️

-   [React.js](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Axios](https://axios-http.com/)
-   [Cheerio](https://cheerio.js.org/)
-   [Ant Design](https://ant.design/)
-   [dotenv](https://github.com/motdotla/dotenv)
-   [Python](https://www.python.org/) (optional, for web scraping – see <i>Installation</i>)
-   [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) (optional, for web scraping – see <i>Installation</i>)
-   [Vercel](https://vercel.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation 🛠️

1. Clone the repo
    ```sh
    git clone https://github.com/alexandreoliv/bolao-vite.git
    ```
2. Navigate into the project directory
    ```sh
    cd bolao-vite
    ```
3. Install NPM packages
    ```sh
    npm install
    ```
4. Set up environment variables:
   - Create a `.env` file in the root folder for the backend with the following content:
     ```plaintext
     MONGODB_URI=your-mongodb-connection-string
     ```
     Replace `your-mongodb-connection-string` with your actual MongoDB connection string.

   - <b>Optionally</b>, add the following line to use Python instead of Node.js for web scraping (see <i>Step 5</i>):
     ```plaintext
     PYTHON=1
     ```

   - Under the `frontend` folder, create two environment files:
     - `.env.development` with:
       ```plaintext
       VITE_API_URL=http://localhost:5005/api
       ```
     - `.env.production` with:
       ```plaintext
       VITE_API_URL=https://your-deployment-url/api
       ```
       Replace `https://your-deployment-url` with the URL of your production deployment.

<p></p>

5. <b>(Optional)</b> Set up a Python virtual environment and install dependencies only if you prefer to use the provided Python script instead of the default Node.js implementation:
    ```sh
    cd ../python
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
    ```

6. To run the project, type in the root folder:
    ```sh
    npm run dev
    ```
7. Open your web browser and navigate to:
    ```sh
    http://localhost:5173/
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage ⚽

2. In <i>"Classificação"</i>, bettors' standings are displayed, with the <i>"Pontuação"</i> column showing their current score.

<p></p>

1. In <i>"Apostas"</i>, one can see all the bets; the first column <i>"Equipes"</i> being the "Teams", the second column <i>"Atual"</i> meaning their current standings (fetched via web scraping), and the rest of the columns being each bettor's bet for the final standing of that team.

<p></p>

3. <i>"Distância"</i> is similar to <i>"Apostas"</i>, showing how distant the bets are/were from the current/final standings. The numbers use conditional formatting—greener values indicate better performance, while redder values indicate worse performance, based on a 20-point scale.

<p></p>

4. <i>"Rankings"</i> display the overall ranking of participants based on their performance across all years and series.

<p></p>

5. <i>"Adicionar Aposta"</i> opens a form to place bets on the upcoming championship.

<p></p>

6. <i>"Regras"</i> just shows how the scores are calculated. A correct prediction gets 5 points, missing by one position gets you 3 points, missing by 2 gets you 1 point, and so on.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- TECHNICAL DETAILS -->

## Technical Details 🧩

- **Backend**: Built with Node.js and Express.js, the backend handles API requests and interacts with a MongoDB database using Mongoose for data persistence.
- **Frontend**: Developed with React.js, utilizing Ant Design for UI components to ensure a responsive and user-friendly interface.
- **Data Fetching**: Axios is used for making HTTP requests to fetch data from the backend.
- **Web Scraping**: Cheerio (or, optionally, Beautiful Soup) is used for scraping data from Wikipedia to update standings for the current championship.
- **Environment Management**: dotenv is used to manage environment variables securely.
- **Deployment**: The application is deployed on Vercel.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexandre-oliv/
[product-screenshot]: images/screenshot.png
