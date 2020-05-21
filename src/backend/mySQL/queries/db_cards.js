var pool = require('../connector');
var rxjsOperators = require('rxjs/operators');

var db_cards = {};

db_cards.getCards = function getCards(setIdNumber, username) {
    return pool.my_db_query(
        `SELECT * from cards
        INNER JOIN base_cards ON base_cards.Id=cards.Id
        WHERE SetId=${setIdNumber} AND (CardOwner="global" OR CardOwner="${username}")`
    );
}

db_cards.getKanjiCards = function getKanjiCards(setIdNumber, username) {
    return pool.my_db_query(
        `SELECT * from kanji_cards 
        INNER JOIN base_cards ON base_cards.Id=kanji_cards.Id
        WHERE SetId=${setIdNumber} AND (CardOwner="global" OR CardOwner="${username}")`
    );
}

module.exports = db_cards;
