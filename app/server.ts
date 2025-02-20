const { createServer } = require('node:http');
const { getJson } = require("serpapi");

const SERP_API_KEY = "6bf08b0972334a9d88db8aab837149c4d9c31155435d563fce028f9039455132"

const hostname = '127.0.0.1';
const port = 3001;

const server = createServer((req, res) => {
    const allowed_domain = '*'
    res.setHeader('Access-Control-Allow-Origin', allowed_domain);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const query = searchParams.get('query');

    getJson({
        engine: "google",
        api_key: SERP_API_KEY,
        q: query
    }).then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }).catch((e) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: e.message }));
    });

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});