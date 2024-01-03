const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./src/db/db');
const apis = require('./src/routes/routes');
const cron = require('node-cron');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express()

cron.schedule('0 * * * *', () => {
    console.log('running task ');
    client.sendMessage("917734839066@c.us", "your lease is about to expire");
    client.sendMessage("919588205114@c.us", "your lease is about to expire");
    
  });


// port from env file
dotenv.config({ path: '.env' })
const port = process.env.PORT;
console.log(port)

app.use(cors())

//body parser
app.use(bodyParser.json());

//routes setup
app.use('/', apis);

//Server setup
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
//////////////////////////////////////////
const path = require("path")
const _dirname=path.dirname("")
const buildpath = path.join(_dirname,"./client/build")
app.use(express.static(buildpath))



////////////////////////////////////////////

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        handleSIGINT: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("919588205114@c.us", "test123");
});
client.initialize();

//Closing correcily using CTRL+C 
process.on('SIGINT', async() => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});
