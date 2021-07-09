const express = require('express');
const request = require('request-promise');


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const genarateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



// welcome route
app.get('/' , (req , res) => {
    res.send('Welcome to amazon web scrapper API');
});

//get product details
app.get('/products/:productId' , async (req , res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${genarateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//get product reviews
app.get('/products/:productId/reviews' , async (req , res) => {
    const {productId} = req.params;
    const {api_key} = req.query;   
    try {
        const response = await request(`${genarateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//get product reviews
app.get('/products/:productId/offers' , async (req , res) => {
    const {productId} = req.params;
    const {api_key} = req.query;    
    try {
        const response = await request(`${genarateScrapperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET search ressult
app.get('/search/:searchQuery' , async (req , res) => {
    const {searchQuery} = req.params;
    const {api_key} = req.query;    
    try {
        const response = await request(`${genarateScrapperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT , () => console.log(`server running on port ${PORT}`));