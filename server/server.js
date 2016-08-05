var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/:game/leaderboard', function(req, res, next) {
    const gamename = req.params.game;
    console.log("game: " + game);

    if (!isGameNameValid(game)) {
        res.send({
            error: true,
            error_desc: "Game Name prodived Invalid. (" + game + ")"
        });
    }

    Player.find({}, function(err, players) {
        var active_players = players.filter(function(p) { return p[game + "Score"] != 0});
        active_players.sort(players, function(a, b) {
            return a[gamename + "Score"] > b[gamename + "Score"]
        })

        res.json({
            "leaderboard": active_players
        })
    })
    res.send("received request for " + game + "leaderboard");
    
});

app.post('/api/:gamename/:playername/score/add', function(req, res, next) {
    const gamename = req.param('gamename');
    const playername = req.param('playername');
    const scoreDelta = req.query.delta;


    if (!isGameNameValid(gamename)) {
        res.send({
            error: true,
            error_desc: "Game Name prodived Invalid. (" + game + ")"
        });
    }
    Player.count({
        name: playername
    }, function(err, count) {
        assert(count == 0 || count == 1);
        if (count == 0) {
            createPlayer(playername);
        }
        updatePlayerScore(playername, gamename, scoreDelta)

    })
    console.log("game: " + game + "\nplayer: " + player + "\nscoreDelta: " + scoreDelta);
    res.send("received game: " + game  +  " | player: " + player + "score add request")
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
