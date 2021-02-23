var pool = require('../connector');
var rxjsOperators = require('rxjs/operators');

var db_englishdefinitions = {};

db_englishdefinitions.getEnglishDefinitions = function getEnglishDefinitions(definition, username) {
  return pool.my_db_query(
    `SELECT definition from englishdefinition
    WHERE Owner="global" AND INSTR(definition, "${definition}")=1 'LIMIT 20'`
  );
};

db_englishdefinitions.getCardIdDefinition = function getCardIdDefinition(cardIds) {
  return pool.my_db_query(
    `SELECT definition, cardId from englishdefinition 
    WHERE Owner="global" AND CardId IN (${cardIds}) ORDER BY CardId ASC`
  );
};

module.exports = db_englishdefinitions;
