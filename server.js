"use strict";
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    groups = JSON.parse(fs.readFileSync('data/groups.json', 'utf-8')),
    states = JSON.parse(fs.readFileSync('data/states.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/dist'));

app.get('/api/groups/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > groups.length) {
        top = skip + (groups.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedgroups = groups.slice(skip, top);
    res.setHeader('X-InlineCount', groups.length);
    res.json(pagedgroups);
});

app.get('/api/groups', (req, res) => {
    res.json(groups);
});

app.get('/api/groups/:id', (req, res) => {
    let groupId = +req.params.id;
    let selectedgroup = {};
    for (let group of groups) {
        if (group.id === groupId) {
            selectedgroup = group;
            break;
        }
    }
    res.json(selectedgroup);
});

app.post('/api/groups', (req, res) => {
    let postedgroup = req.body;
    let maxId = Math.max.apply(Math, groups.map((cust) => cust.id));
    postedgroup.id = ++maxId;
    postedgroup.gender = (postedgroup.id % 2 === 0) ? 'female' : 'male';
    groups.push(postedgroup);
    res.json(postedgroup);
});

app.put('/api/groups/:id', (req, res) => {
    let putgroup = req.body;
    let id = +req.params.id;
    let status = false;

    // Ensure state name is in sync with state abbreviation
    const filteredStates = states.filter((state) => state.abbreviation === putgroup.state.abbreviation);
    if (filteredStates && filteredStates.length) {
        putgroup.state.name = filteredStates[0].name;
        console.log('Updated putgroup state to ' + putgroup.state.name);
    }

    for (let i = 0, len = groups.length; i < len; i++) {
        if (groups[i].id === id) {
            groups[i] = putgroup;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/groups/:id', function(req, res) {
    let groupId = +req.params.id;
    for (let i = 0, len = groups.length; i < len; i++) {
        if (groups[i].id === groupId) {
            groups.splice(i, 1);
            break;
        }
    }
    res.json({ status: true });
});

app.get('/api/orders/:id', function(req, res) {
    let groupId = +req.params.id;
    for (let cust of groups) {
        if (cust.groupId === groupId) {
            return res.json(cust);
        }
    }
    res.json([]);
});

app.get('/api/states', (req, res) => {
    res.json(states);
});

app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000);

console.log('Express listening on port 3000.');

//Open browser
var opn = require('opn');

opn('http://localhost:3000').then(() => {
    console.log('Browser closed.');
});