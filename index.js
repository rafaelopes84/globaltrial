const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
  host     : '187.45.216.34',
  user     : 'usrglobaltrial',
  password : '123wazxc@10',
  database : 'globaltrial',
  insecureAuth: true
});

app.get('/website', function(req, res) {

  connection.query('SELECT * from tbnewwebsite order by id desc', function (error, results) {
  		if (error) {
			console.error(error);
			res.status(500).send('Request failed.')
        } else
            res.send(results);
	});

})


app.post('/website', function(req, res) {
  //const title = req.body.title,
  // if (!title)
  //   res.status(400).send()
  const data = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    subjecturl: req.body.subjecturl
  }
  console.log(data)
    // Insert

    const query = 'INSERT INTO tbnewwebsite set ?';
	connection.query(query, data, function (error) {
  		if (error) {
			console.error(error);
			res.status(500).send('Request failed.')
		} else
            res.send("Ok")

	});


})

//app.listen(8080, () => console.log('App listening on port 8080!'))
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
