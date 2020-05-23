var pool = require('../connector');
var rxjsOperators = require('rxjs/operators');

var db_cards = {};

db_cards.getCards = function getCards(setIdNumber, username) {
  return pool.my_db_query(
    `SELECT * from cards
        WHERE SetId=${setIdNumber} AND (CardOwner="global" OR CardOwner="${username}")`
  );
};

db_cards.getKanjiCards = function getKanjiCards(setIdNumber, username) {
  return pool.my_db_query(
    `SELECT * from kanji_cards 
        WHERE SetId=${setIdNumber} AND (CardOwner="global" OR CardOwner="${username}")`
  );
};

module.exports = db_cards;
