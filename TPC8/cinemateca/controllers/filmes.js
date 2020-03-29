var Filmes = module.exports
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


Filmes.getLista = async function(req){
    var query = `select distinct ?f ?titulo ?duracao ?data ?lingua ?pais where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
        ?f c:temLíngua ?l .
        bind(strafter(str(?l),"cinema#") as ?lingua) .
        filter(?lingua = 'English') .
        ?f c:temPaísOrigem ?p . 
        bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data.results.bindings
    }
    catch(e){
        throw(e)
    } 
}

Filmes.getFilme = async function(id){
    var query = `select ?titulo ?duracao ?data ?lingua ?pais where {
        c:${id} a c:Filme .
        c:${id} c:título ?titulo .
        c:${id} c:duração ?duracao .
        c:${id} c:dataLançamento ?data .
        c:${id} c:temLíngua ?l .
        bind(strafter(str(?l),"cinema#") as ?lingua) .
        filter(?lingua = 'English') .
        c:${id} c:temPaísOrigem ?p . 
        bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        var resp = {}
        resp.info = response.data.results.bindings
        resp.realizadores = await this.getFilmeRealizadores(id)
        resp.produtores = await this.getFilmeProdutores(id)
        resp.atores = await this.getFilmeAtores(id)
        resp.personagens = await this.getFilmePersonagens(id)
        resp.generos = await this.getFilmeGeneros(id)
        return resp
    }
    catch(e){
        throw(e)
    } 
}


Filmes.getFilmeProdutores = async function(id){
    var query = `select ?pnome where {
        c:${id} a c:Filme .
        c:${id} c:foiProduzido ?prod .
        ?prod c:nome ?pnome .
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

Filmes.getFilmeAtores = async function(id){
    var query = `select ?anome where {
        c:${id} a c:Filme .
        c:${id} c:temAtor ?a .
        ?a c:nome ?anome .
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


Filmes.getFilmeRealizadores = async function(id){
    var query = `select ?rnome where {
        c:${id} a c:Filme .
        c:${id} c:temRealizador ?r .
        ?r c:nome ?rnome .
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

Filmes.getFilmePersonagens = async function(id){
    var query = `select ?pnome where {
        c:${id} a c:Filme .
        c:${id} c:temPersonagem ?per .
        ?per c:nome ?pnome .
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

Filmes.getFilmeGeneros = async function(id){
    var query = `select ?genero where {
        c:${id} a c:Filme .
        c:${id} c:temGénero ?g .
        ?g c:nome ?genero .
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