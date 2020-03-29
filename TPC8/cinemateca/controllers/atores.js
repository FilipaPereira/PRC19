var Atores = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema" + "?query=" 


Atores.getLista = async function(req){
    var query = `select ?a ?anome ?sexo where {
        ?a a c:Ator .
        ?a c:nome ?anome .
        ?a c:sexo ?sexo .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data.results.bindings
    }
    catch(e){
        throw(e)
    } 
}

Atores.getAtor = async function(id){
    var query = `select ?anome ?sexo where {
        c:${id} a c:Ator .
        c:${id} c:nome ?anome .
        c:${id} c:sexo ?sexo .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var resp = {}
        resp.info = response.data.results.bindings
        resp.starredIn = await this.getAtorFilmes(id)
        return resp
    }
    catch(e){
        throw(e)
    } 
}

Atores.getAtorFilmes = async function(id){
    var query = `select ?f ?titulo where {
        c:${id} a c:Ator .
        c:${id} c:atuou ?f .
        ?f c:título ?titulo .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data.results.bindings
    }
    catch(e){
        throw(e)
    } 
}

