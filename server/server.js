const express = require('express');
const path = require('path');
const fs = require('fs');
let app = express();
const bodyParser = require('body-parser');


// app.get('/', (req, res) =>{
// res.sendFile(path.join(__dirname, '../public/index.html'));

// });



app.use((req, res, next) => {
    fs.appendFileSync("./log.txt", req.originalUrl);
    next();
})


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {
   //let data = JSON.parse(fs.readFileSync('./server/log.json', 'utf8'));

    fs.readFile('./server/log.json', 'utf8', (err, data) => {
        
        let myArray = JSON.parse(data);

        let posts = {
            Name: req.body.name,
            Email: req.body.email,
        }

        myArray.push(posts);

        let postString = JSON.stringify(myArray, null, 2);
        fs.writeFileSync("./server/log.json", postString);

   });

    res.redirect('/formsubmissions');
});



app.use(express.static(path.join(__dirname, '../public')));

app.get('/formsubmissions', (req, res) => {
        let data = JSON.parse(fs.readFileSync('./server/log.json', 'utf8'));
     res.send(data);
    
});




app.listen(3000);