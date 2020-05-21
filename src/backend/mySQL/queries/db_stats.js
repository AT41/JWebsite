var pool = require('../connector');

var db_stats = {};

db_stats.getStats = function getStats(statOwner, cardId) {
    return pool.my_db_query(
        `SELECT * from stats WHERE StatOwner=${statOwner} AND CardId=${cardId}`
    );
}

db_stats.incrementStats = function incrementStats(isCorrect, statOwner, cardId) {
    console.log(isCorrect);
    return pool.my_db_query(
        `UPDATE stats SET Correct = Correct + ${isCorrect === 'true' ? 1 : 0}, Incorrect = Incorrect + ${isCorrect === 'false' ? 1 : 0}
        WHERE StatOwner='${statOwner}' AND CardId=${cardId}`
    );
}

db_stats.createStats = function createStats(statOwner, cardId, correct = 0, incorrect = 0) {
    return pool.my_db_query(
        `INSERT INTO stats (StatOwner, CardId, Correct, Incorrect) 
        VALUES ('${statOwner}', ${cardId}, ${correct}, ${incorrect})`
    );
}

module.exports = db_stats;