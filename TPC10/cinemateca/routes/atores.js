var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')

router.get('/', function(req, res, next) {
    Atores.getLista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
  });

router.get('/:id', function(req, res, next) {
    Atores.getAtor(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).send(`Erro na listagem do ator ${req.params.id}: ${e}`))
});
  



module.exports = router;