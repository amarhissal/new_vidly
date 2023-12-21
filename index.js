const express = require('express');
const app = express();


app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();




const port = 3000 || process.env.Port;

const server = app.listen(port,()=>{
    console.log(`Listening on port ${port} ...`);
});

module.exports = server;
