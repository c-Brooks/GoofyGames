"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const matchesRepo = require('../db/matches.js')(knex);
  const matchmakingRepo = require('../db/matchmaking')(knex);
  const gamesRepo = require('../db/games.js')(knex);

  router.get("/", (req, res) => {
    matchesRepo.getAllMatches().then( (results) => {
      var templateVars = {results: results}
      res.render("matches", templateVars)
    });
  });

// GET NEW PAGE
  router.get('/new', (req, res) => {
    Promise.all([
      gamesRepo.getAllGames(),
      matchesRepo.getAllMatches()
      ])
    .then( (results) => {
      var templateVars = {games: results[0], allMatches: results[1]}
      res.render("searchForNewMatch", templateVars);
    });
  });

// GET GAME PAGE
  router.get("/:id", (req, res) => {
    matchesRepo.getMatchByID(req.params.id)
    .then((match) => {
      let matchData = buildMatchData(match[0],req.cookies['user_id']);
      console.log(matchData);
      let templateVars = { title: 'Match', matchData: matchData };
      res.render("game_table", templateVars);
    });
  });

// POST NEW
  router.post("/", (req, res) => {
    let userID = req.cookies.user_id;

    if(!userID){
      alert('Please login to play!');
      res.redirect('/');
    }

    matchmakingRepo.checkForChallenges(userID, 1).then( (challenge) => {

      if(!challenge){
        matchmakingRepo.new(userID, 1);
        res.redirect('/matches');
      } else { // delete from challenge table, create new match in table
        matchmakingRepo.remove(userID);
        matchmakingRepo.remove(challenge.user_id);
        console.log(challenge);
      }
    });
  });

  return router;
}

function buildMatchData(match, activePlayerID) {
  if (match.player1_id === Number(activePlayerID)) {
    match.activePlayer_id = match.player1_id;
    match.activePlayer_cards = JSON.parse(match.player1_cards);
    match.opponent_cards = countCards(match.player2_cards);
    delete match.player2_cards;
  } else if (match.player2_id === Number(activePlayerID)) {
    match.activePlayer_id = match.player2_id;
    match.activePlayer_cards = JSON.parse(match.player2_cards);
    match.opponent_cards = countCards(match.player1_cards);
    delete match.player1_cards;
  }

  match.deck_cards = JSON.parse(match.deck_cards);

  return match;
}

function countCards(cards) {
  let cardCount = 0;
  let cardsObj = JSON.parse(cards);
  for (var suit in cardsObj) {
    cardCount += cardsObj[suit].length;
  }
  return cardCount;
}
