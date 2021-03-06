var deck_cards = JSON.stringify(
  [
    { suit: 'spades', value: '1' },
    { suit: 'spades', value: '2' },
    { suit: 'spades', value: '3' },
    { suit: 'spades', value: '4' },
    { suit: 'spades', value: '5' },
    { suit: 'spades', value: '6' },
    { suit: 'spades', value: '7' },
    { suit: 'spades', value: '8' },
    { suit: 'spades', value: '9' },
    { suit: 'spades', value: '10' },
    { suit: 'spades', value: '11' },
    { suit: 'spades', value: '12' },
    { suit: 'spades', value: '13' }
  ]);

var player1_cards = JSON.stringify([
  { suit: 'hearts', value: '1' },
  { suit: 'hearts', value: '2' },
  { suit: 'hearts', value: '3' },
  { suit: 'hearts', value: '4' },
  { suit: 'hearts', value: '5' },
  { suit: 'hearts', value: '6' },
  { suit: 'hearts', value: '7' },
  { suit: 'hearts', value: '8' },
  { suit: 'hearts', value: '9' },
  { suit: 'hearts', value: '10' },
  { suit: 'hearts', value: '11' },
  { suit: 'hearts', value: '12' },
  { suit: 'hearts', value: '13' }
]);

var player2_cards = JSON.stringify([
  { suit: 'clubs', value: '1' },
  { suit: 'clubs', value: '2' },
  { suit: 'clubs', value: '3' },
  { suit: 'clubs', value: '4' },
  { suit: 'clubs', value: '5' },
  { suit: 'clubs', value: '6' },
  { suit: 'clubs', value: '7' },
  { suit: 'clubs', value: '8' },
  { suit: 'clubs', value: '9' },
  { suit: 'clubs', value: '10' },
  { suit: 'clubs', value: '11' },
  { suit: 'clubs', value: '12' },
  { suit: 'clubs', value: '13' }
]);

exports.seed = function(knex, Promise) {
  // // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
       return Promise.all([
        // Reset id sequence to start at 1
        knex.schema.raw("select setval('archived_matches_id_seq',1)"),
//        Inserts seed entries
        knex('matches').insert(
        {
          id: 1,
          game_id: 1,
          player1_id: 1,
          player2_id: 2,
          player1_score: 0,
          player2_score: 0,
          whose_move: 1,
          deck_cards: deck_cards,
          player1_cards: player1_cards,
          player2_cards: player2_cards,
          game_start: '1999-01-08 04:05:06'
        })
     ]);
    });
};
