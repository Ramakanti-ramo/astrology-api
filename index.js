const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000; // Choose a port
const bodyParser = require('body-parser');



// Middleware for parsing JSON
app.use(express.json());
// Endpoint for generating Natal Chart
app.get('/generate-chart', (req, res) => {
    // Replace this with actual logic using your astrology library
    const chartData = generateNatalChart(req.query.date, req.query.time, req.query.location);

    res.json({ chartData });
});
// Example function (replace with actual logic)
function generateNatalChart(date, time, location) {
    // Implement logic to generate Natal Chart
    return { date, time, location };
}






app.get('/natal-chart', async (req, res) => {
    try {
        const { date, time, location } = req.query;

        // Call Astrology API using Axios to get Natal Chart details
        const astroData = await getAstrologyData(date, time, location);

        res.json({ natalChart: astroData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// api key ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY
// user id 628934
// Function to fetch Astrology data from the Astrology API
async function getAstrologyData(date, time, location) {
    const apiUrl = `https://astrologyapi.com/api/v1/natal_chart?ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY&date=${date}&time=${time}&place=${location}`;
    const response = await axios.get(apiUrl);
    return response.data;
}








app.use(bodyParser.json());

// Function to fetch transit chart data
async function getTransitChartData(date, birthDate, birthTime, birthLocation) {
    const apiKey = 'ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY'; // Replace with your actual API key
    
    const apiUrl = `https://astrologyapi.com/api/v1/horoscope/${date}/${birthDate}/${birthTime}/${birthLocation}?apiKey=${apiKey}`;
    try {
        // Make API call
        const response = await axios.get(apiUrl);

        // Extract transit chart data from the response
        const transitData = response.data;

        return transitData;
    } catch (error) {
        // Handle API call errors
        console.error(error);
        throw new Error('Failed to fetch transit chart data');
    }
}
app.post('/transitchart', async (req, res) => {
    try {
        const { date, birthDate, birthTime, birthLocation } = req.query;

        // Call Astrology API to get Transit Chart details
        const apiUrl = `https://astrologyapi.com/api/v1/horoscope/${date}/${birthDate}/${birthTime}/${birthLocation}?apiKey=YOUR_API_KEY`;
        const transitData = await getTransitChartData(apiUrl);

        res.json({ transitChart: transitData });
    } catch (error) {
        console.error('Error in API request:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

async function getTransitChartData(apiUrl) {
    const response = await axios.get(apiUrl);
    return response.data;
}




// async function  getSynastryChartData (person1Date, person1Time, person1Location, person2Date, person2Time, person2Location) {
//     // Implement logic to fetch synastry chart data
//     app.get('/synastry-chart', async (req, res) => {
//         try {
//             const { person1Date, person1Time, person1Location, person2Date, person2Time, person2Location } = req.query;
    
//             // Call Synastry Chart API to get astrological information for both individuals
//             const synastryData = await getSynastryChartData(person1Date, person1Time, person1Location, person2Date, person2Time, person2Location);
    
//             res.json({ synastryChart: synastryData });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
    
// }



async function getSynastryChartData(person1Date, person1Time, person1Location, person2Date, person2Time, person2Location) {
    const apiKey = 'ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY'; // Replace with your actual API key
    
    const apiUrl = `https://astrologyapi.com/api/v1/horoscope/${date}/${birthDate}/${birthTime}/${birthLocation}?apiKey=${apiKey}`;
    try {
        // Make API call
        const response = await axios.get(apiUrl);

        // Extract transit chart data from the response
        const synastryDat = response.data;

        return synastryDat;
    } catch (error) {
        // Handle API call errors
        console.error(error);
        throw new Error('Failed to fetch transit chart data');
    }
}
let date = new Date();
let birthDate = new Date();
let birthTime = "your_value_here";
let birthLocation = "New York";


app.get('/synastry-chart', async (req, res) => {
    try {
        const { person1Date, person1Time, person1Location, person2Date, person2Time, person2Location } = req.query;

        // Call Synastry Chart API to get astrological information for both individuals
        const synastryData = await getSynastryChartData(
            person1Date, person1Time, person1Location, person2Date, person2Time, person2Location
        );

        res.json({ synastryChart: synastryData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});














// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
