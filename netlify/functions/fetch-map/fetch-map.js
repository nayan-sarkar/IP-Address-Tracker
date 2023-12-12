import dotenv from 'dotenv';

dotenv.config();

const handler = async (event) => {

const API_KEY = process.env.VITE_GEO_API;

  try {
    const domain = event.queryStringParameters.domain

    const fetchMapData = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${domain}`)
            
    const MapData = await fetchMapData.json();

    return {
      statusCode: 200,
      body: JSON.stringify(MapData),
 
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

export { handler };

