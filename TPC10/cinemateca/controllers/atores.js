var Atores = module.exports
const axios = require('axios')

function myNormalize(r) {
    return r.results.bindings.map(o =>{
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo;
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema-v2" + "?query=" 


Atores.getLista = async function(){
    var query = `select ?idAtor ?anome ?sexo where {
        ?a rdf:type c:Ator .
        ?a c:nome ?anome .
        ?a c:sexo ?sexo .
        bind(strafter(str(?a), 'cinema#') as ?idAtor) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getFilmesDoAtor = async function(idAtor){
    var query = `select ?idFilme ?tit ?idPersonagem ?pnome where {
        c:${idAtor} c:representa ?per .
        ?per c:nome ?pnome .
        ?f c:temPersonagem ?per .  
        ?f c:título ?tit .
        bind(strafter(str(?f), 'cinema#') as ?idFilme)
        bind(strafter(str(?per), 'cinema#') as ?idPersonagem)
    }
    order by ?tit` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


async function getAtorAtomica(idAtor){
    var query = `select ?anome ?sexo where {
        c:${idAtor} c:nome ?anome .
        c:${idAtor} c:sexo ?sexo .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Atores.getAtor = async function(idAtor){
    try{
        var atomica = await getAtorAtomica(idAtor)
        var filmes = await Atores.getFilmesDoAtor(idAtor)
        var ator = {
            info : atomica[0],
            filmes : filmes
        }
        return ator
    }
    catch(e){
        throw(e)
    } 
}




