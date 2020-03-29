var Personagens = module.exports
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


Personagens.getLista = async function(req){
    var query = `select ?per ?pnome where {
        ?per a c:Personagem .
        ?per c:nome ?pnome .
    }
    ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data.results.bindings
    }
    catch(e){
        throw(e)
    } 
}

Personagens.getPersonagem = async function(id){
    var query = `select ?pnome where {
        c:${id} a c:Personagem .
        c:${id} c:nome ?pnome .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var resp = {}
        resp.nome = response.data.results.bindings
        resp.personagemDe = await this.getPersonagemFilmes(id)
        resp.representadaPor = await this.getPersonagemAtores(id)
        return resp
    }
    catch(e){
        throw(e)
    } 
}

Personagens.getPersonagemFilmes = async function(id){
    var query = `select ?f ?titulo where {
        c:${id} a c:Personagem .
        c:${id} c:éPersonagemDe ?f .
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

Personagens.getPersonagemAtores = async function(id){
    var query = `select ?ator ?anome where {
        c:${id} a c:Personagem .
        c:${id} c:éRepresentadoPor ?ator .
        ?ator c:nome ?anome .
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




