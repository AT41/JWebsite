/**
 * Route for getting sets
 */

var express = require('express');
var router = express.Router();
var db_cards = require('../mySQL/queries/db_cards');

// TODO Username must also match the owner of each 
// card
router.get('/cards', function(req, res, next) {
    const setId = req.query.setId;
    db_cards.getCards(setId).subscribe(val => res.json(val));
});

router.get('/kanji_cards', function(req, res, next) {
    const setId = req.query.setId;
    db_cards.getKanjiCards(setId).subscribe(val => res.json(val));
});

module.exports = router;