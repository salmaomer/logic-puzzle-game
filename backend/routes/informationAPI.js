
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/api', async (req, res) => {
 try {
    const response = await axios.get('https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple');

    if (response.status !== 200) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = response.data.results;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.json(data);
    console.log("informationAPI:", data);

  } catch (e) {
    console.error('Error fetching data:', e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;