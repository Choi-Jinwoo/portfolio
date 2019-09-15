const express = require('express');
const app = express();
const models = require('./models');
const colorConsole = require('./lib/console');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.port || 3000;

const auth = require('./api/auth');
const event = require('./api/event');
const file = require('./api/file');

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use('/static', express.static(__dirname + '/public'));
app.use('/auth', auth);
app.use('/event', event);
app.use('/file', file);

app.listen(port, () => {
	colorConsole.green(`server is running at PORT ${port}`);
})