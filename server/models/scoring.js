mongoose = require('mongoose');

var Player = mongoose.module("Player", {
    name: String,
    matchsticksScore: Number,
    twoThirdsScore: Number,
    piratesScore: Number,
    othelloScore: Number,
    nashScore: Number
}),

function createPlayer(playername) {
    var player = new Player({
        name: playername,
        matchsticksScore: 0,
        twoThirdsScore: 0,
        piratesScore: 0,
        othelloScore: 0,
        nashScore: 0
    });

    player.save(function(err) {
        console.error("DB error: " + error);
    });

    return player;
}

function isGameNameValid(gameName) {
    return gameName == "matchscticks" ||
           gameName == "twoThirds" ||
           gameName == "pirates" ||
           gameName == "othello" ||
           gameName == "nash"
}
function updatePlayerScore(playername, gameName, scoreDelta) {
    Player.find({name: playerName}, function(err, results) {
        assert(results.length == 1);
        var player = results[0];
        
        const errorHandler = function(err) {
            if (err) {
                console.log("player score update error: " + err)
            }
        };

            
        player[gameName + " Score"] += scoreDelta;
        player.save(errorHandler);
        }

    }

}

module.exports = {
    Player,
    createPlayer,
    updatePlayerScore
}
