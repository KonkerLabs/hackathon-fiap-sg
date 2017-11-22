var fs = require('fs');
var path = require('path');
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var app = express();

var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/cavalete-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/cavaletes', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/cavalete/:id/coords', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            if (json[i]['id'] == req.params.id) {

                let token = '';

                axios.get(
                    'https://api.demo.konkerlabs.net/v1/hackathonsaintgobain/incomingEvents?q=channel%3A' + json[i]['imei'] + '&sort=newest&limit=100',
                    {
                        headers: { Authorization: "bearer" + token }
                    }
                ).then((response) => {
                    res.json(response.data.result)
                    return
                }).catch(err => {
                    console.error(err);
                    process.exit(1);
                })

                break;
            }
        }
    });

})

app.get('/api/cavalete/:id', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for(var i = 0; i < json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.post('/api/cavalete/create', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var cavaletes = JSON.parse(data);

        var newCavalete = {
            id: Date.now(),
            name: req.body.name,
            type: req.body.type,
        };
        cavaletes.push(newCavalete);
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(cavaletes, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(cavaletes);
        });
    });
});

app.patch('/api/cavalete/edit/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var cavaletes = JSON.parse(data);

        for(var i = 0; i < cavaletes.length; i++)
        {
            if(cavaletes[i]['id'] == req.params.id)
            {
                var cavalete = cavaletes[i];
                cavalete.name = req.body.name;
                cavalete.type = req.body.type;

                cavaletes.splice(i, 1);
                cavaletes.push(cavalete);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(cavaletes, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(cavaletes);
                });
                break;
            }
        }
    });
});

app.delete('/api/cavalete/delete/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var cavaletes = JSON.parse(data);

        for(var i = 0; i < cavaletes.length; i++)
        {
            if(cavaletes[i]['id'] == req.params.id)
            {
                cavaletes.splice(i, 1);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(cavaletes, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(cavaletes);
                });
                break;
            }
        }
    });
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});