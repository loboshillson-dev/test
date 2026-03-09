const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for calculations
app.post('/calculate', async (req, res) => {
    const { equation } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: `Calculate the following: ${equation}` }]
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });
        const result = response.data.choices[0].message.content;
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});