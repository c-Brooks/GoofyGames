const _ = require('underscore');
const match = require('../db/matches.js');

const MATCH_ID = 1;
//const game = require('./goofspiel_gamestate');

var goofObj = {};



module.exports = (knex) => {

  match(knex).updateMatch(MATCH_ID, move);



  };



function move(match, p1bid , p2bid, prize) {
  var newState = {};
  // remove  cards from hand and deck
  newState.player1_cards = _.without(match.player1_cards, p1bid);
  newState.player2_cards = _.without(match.player2_cards, p2bid);
  newState.deck_cards    = _.without(match.deck_cards, prize);
  // Winner gets the value of prize
  if(p1bid  > p2bid ) {
    newState.player1_score += prize;
  } else if (p2bid  > p1bid ) {
    newState.player2_score += prize;
  }
  console.log(match.keys);
  if(checkGameEnd(match)){
    console.log('Game End!'); // Do some logic
  }
};




  function checkGameEnd(match){
    if(match.deck_cards){
      return match.deck_cards.length === 0;
    }
  };




/*
function() {
    obj.p1.cards   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    obj.p1.score   = 0;
    obj.p1.suit    = 'spades';
    obj.p2.cards   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    obj.p2.score   = 0;
    obj.p2.suit    = 'hearts';
    //obj.game.deck.cards = obj.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    //obj.game.deck.suit  = 'diamonds';
  }

/*


console.log(obj)

// to test
// goofObj.game = game(knex, 1);
// console.log('GAME ', game(knex, 1))


/* Face cards represented as numbers for convienience
 * Jack - 11
 * Queen - 12
 * King - 13
 */
/*
  goofObj.initGame = function() {
    this.game.p1.cards   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.game.p1.score   = 0;
    this.game.p1.suit    = 'spades';
    this.game.p2.cards   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.game.p2.score   = 0;
    this.game.p2.suit    = 'hearts';
    this.game.deck.cards = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    this.game.deck.suit  = 'diamonds';
  };

  // Shuffles array of cards randomly
  function shuffle (cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
  };

// Takes 'bids' (card played by players) and 'prize' (top card on deck) as parameters
// Note: on ties, the prize is discarded
  function move (p1bid , p2bid, prize) {
    // remove  cards from hand and deck
    this.game.p1.cards = _.without(this.game.p1.cards, p1bid);
    this.game.p2.cards = _.without(this.game.p2.cards, p2bid);
    this.game.deck.cards = _.without(this.game.deck.cards, prize);
    // Winner gets the value of prize
    if(p1bid  > p2bid ) {
      this.game.p1.score += prize;
    } else if (p2bid  > p1bid ) {
      this.game.p2.score += prize;
    }
    if(this.checkGameEnd()){
      console.log('Game End!'); // Do some logic
    }
  };

*/