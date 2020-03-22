var fs = require('fs')

function cleanDados(data){
    
    return data.results.bindings.map(element => {
        var filmid = element.f.value.split('/')[element.f.value.split('/').length - 1]
        var d = element.dir.value.split('/')[element.dir.value.split('/').length - 1]
        d = d.replace(/\_?\([^)]*\) */g,'')
        d = d.replace(/'/g,"_")
        d = d.replace(/_?&_?/g,'_')
        d = d.replace(/\./g,'')
        d = d.replace(/,/g,'')
        d = d.replace(/\-/g,'_')
        d = d.replace(/:/g,'')
        d = d.replace(/\)/g,'')
        d = d.replace(/_?=_?/g,'_')
        d = d.replace(/\?/g,'')
        d = d.replace('’','')
        
        filmid = filmid.replace(/\_?\([^)]*\) */g,'')
        filmid = filmid.replace(/'/g,"_")
        filmid = filmid.replace(/_?&_?/g,'_')
        filmid = filmid.replace(/\./g,'')
        filmid = filmid.replace(/!/g,'')
        filmid = filmid.replace(/:/g,'')
        filmid = filmid.replace(/,/g,'')
        filmid = filmid.replace(/\-/g,'_')
        filmid = filmid.replace(/%22/g,'')
        filmid = filmid.replace(/%3F/g,'')
        filmid = filmid.replace(/\)/g,'')
        filmid = filmid.replace(/_?–_?/g,'_')
        filmid = filmid.replace(/_?=_?/g,'_')
        filmid = filmid.replace(/_?\+_?/g,'_')
        filmid = filmid.replace(/\*/g,'_')
        filmid = filmid.replace(/\$/g,'_')
        filmid = filmid.replace(/…/g,'')
        filmid = filmid.replace(/_×_/g,'_')

        var writers = element.writers.value.split(',')
        var ws = writers.map(w => {
            w = w.split('/')[w.split('/').length - 1]
            w = w.replace(/\_?\([^)]*\) */g,'')
            w = w.replace('(','')
            w = w.replace(')','')
            w = w.replace(/'/g,"_")
            w = w.replace(/_?&_?/g,'_')
            w = w.replace(/\./g,'')
            w = w.replace(/\-/g,'_')
            w = w.replace(/:/g,'')
            w = w.replace('’','')
            w = w.replace(';','')
            w = w.replace(/%3F/g,'')
            return w
        })

        var composers = element.composers.value.split(',')
        var comps = composers.map(c => {
            c = c.split('/')[c.split('/').length - 1]
            c = c.replace(/\_?\([^)]*\) */g,'')
            c = c.replace(/'/g,"_")
            c = c.replace(/_?&_?/g,'_')
            c = c.replace(/\./g,'')
            c = c.replace(/\-/g,'_')
            c = c.replace(/\–/g,'_')
            c = c.replace(/%22/g,'')
            c = c.replace(/:/g,'')
            c = c.replace(/\)/g,'')
            c = c.replace(/_?=_?/g,'_')
            c = c.replace(/\?/g,'')
            return c
        })

        var countries = element.countries.value.split(',')
        var languages = element.languages.value.split(',')
        var tit = element.title.value.replace(/\"/,'')
        return {
            id : filmid,
            title : tit,
            director : d,
            composers : comps,
            writers : ws,
            countries : countries,
            languages : languages,
            abs : element.abs.value
        }
    });
}

function gather(dados) {
    var directors = []
    var composers = []
    var writers = []
    var languages = []
    var countries = []

    dados.forEach(element => {
        directors.push(element.director)
        element.composers.forEach(c => {
            composers.push(c)
        })
        element.writers.forEach(w => {
            writers.push(w)
        })
        element.languages.forEach(l => {
            languages.push(l)
        })
        element.countries.forEach(cr => {
            countries.push(cr)
        })
    });
    var dirs = new Set(directors)
    var comps = new Set(composers)
    var ws = new Set(writers)
    var langs = new Set(languages)
    var crs = new Set(countries)
    return {dirs, comps, ws, langs, crs}

}

function lang2TTL(ls){

    ls.forEach(l => {
        l = l.split('\n')[0]
        l = l.replace('*', '')
        l = l.replace(/\s+/g, '')
        l = l.replace(/\-/g,'_')
        l = l.replace(/\//g,'_')
        var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${l}
:${l} rdf:type owl:NamedIndividual ,
                :Língua .
`
        fs.appendFileSync('linguas.ttl', res);
    })

}

function country2TTL(crs){
    crs.forEach(cr => {
        cr = cr.split('\n')[0]
        cr = cr.replace(/\s+/g, '')
        cr = cr.replace('*', '')
        cr = cr.replace('&', '')
        cr = cr.replace(/\./g,'')
        cr = cr.replace(/\-/g,'_')
        cr = cr.replace(/\//g,'_')
        cr = cr.replace(/\)/g,'')
    var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${cr}
:${cr} rdf:type owl:NamedIndividual ,
                :País .
`
        fs.appendFileSync('paises.ttl', res);
    })
}


function directors2TTL(dirs){
    dirs.forEach(d => {
    var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${d}
:${d} rdf:type owl:NamedIndividual ,
                :Pessoa .
`
        fs.appendFileSync('diretores.ttl', res);
    })
}

function writers2TTL(ws){
    ws.forEach(w => {
    var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${w}
:${w} rdf:type owl:NamedIndividual ,
                :Pessoa .
`
        fs.appendFileSync('escritores.ttl', res);
    })
}

function composers2TTL(cps){
    cps.forEach(c => {
    var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${c}
:${c} rdf:type owl:NamedIndividual ,
                :Pessoa .
`
        fs.appendFileSync('compositores.ttl', res);
    })
}

function movies2TTL(films){
    films.forEach(m =>{
        var cr = m.countries[0]
        cr = cr.split('\n')[0]
        cr = cr.replace(/\s+/g, '')
        cr = cr.replace('*', '')
        cr = cr.replace('&', '')
        cr = cr.replace(/\./g,'')
        cr = cr.replace(/\-/g,'_')
        cr = cr.replace(/\//g,'_')
        cr = cr.replace(/\)/g,'')
        var res = 
`###  http://prc.di.uminho.pt/2020/cinema#${m.id}
:${m.id} rdf:type owl:NamedIndividual ,
                  :Filme ;
         :temPaísOrigem :${cr} ;
         :temRealizador :${m.director} ;
         :temArgumento :Argumento_${m.id} ;
`
    if(m.languages.length == 1){
        res2 += `                   :temLíngua :${m.languages[0]} .\n`
    }
    else {
        m.languages.forEach((lang,index) => {
            lang = lang.split('\n')[0]
            lang = lang.replace('*', '')
            lang = lang.replace(/\s+/g, '')
            lang = lang.replace(/\-/g,'_')
            lang = lang.replace(/\//g,'_')
            if(index == 0) {
                res += `         :temLíngua :${lang} ,\n`
            }
            else if(index == m.languages.length - 1)
                res += `                    :${lang} ;\n`
            else res += `                    :${lang} ,\n`
         })
    }

    res += `         :título "${m.title}"^^xsd:string .\n\n`
    fs.appendFileSync('filmes.ttl', res);

    var res2 = 
`###  http://prc.di.uminho.pt/2020/cinema#Argumento_${m.id}
:Argumento_${m.id} rdf:type owl:NamedIndividual ,
                            :Argumento ;
`
    if(m.writers.length == 1){
        res2 += `                   :foiEscrito :${m.writers[0]} .\n`
    }
    else {
        m.writers.forEach((w, index2) => {
            if(index2 == 0) {
                res2 += `                   :foiEscrito :${w} ,\n`
            }
            else if(index2 == m.writers.length - 1)
                res2 += `                                :${w} .\n\n`
            else res2 += `                                :${w} ,\n`
        })
    }
    

    fs.appendFileSync('argumentosWriters.ttl', res2);
    })
}

function getAtores(dados){
    return dados.results.bindings.map(a => {

        var actorid = a.a.value.split('/')[a.a.value.split('/').length - 1]
        actorid = actorid.replace(/\_?\([^)]*\) */g,'')
        actorid = actorid.replace(/\./g,'')
        actorid = actorid.replace(/'/g,"_")
        actorid = actorid.replace(/,/g,'')
        actorid = actorid.replace(/%22/g,'')
        return {
            id : actorid,
            name : a.aname.value,
            gender : a.gender.value,
            birthdate : a.bdate.value,
            abs : a.abs.value
        }
    })
}

function actors2TTL(actors){

    actors.forEach(a => {
        var res =
`###  http://prc.di.uminho.pt/2020/cinema#${a.id}
:${a.id} rdf:type owl:NamedIndividual ,
                           :Pessoa ;
`
        if (a.gender == "male")
            var gender = "M"
        else var gender = "F"
        res += `                  :sexo "${gender}"^^xsd:string .\n`

        fs.appendFileSync('actors.ttl', res)
    })
    
}


var input = fs.readFileSync('dbpedia-films.json').toString();
var rs = JSON.parse(input)
var dados = cleanDados(rs)
var individuals = gather(dados)

var atorInput = fs.readFileSync('dbpedia-actors.json').toString();
var rs2 = JSON.parse(atorInput)
var atores = getAtores(rs2)

lang2TTL(individuals.langs)
country2TTL(individuals.crs)
writers2TTL(individuals.ws)
directors2TTL(individuals.dirs)
composers2TTL(individuals.comps)
movies2TTL(dados)
actors2TTL(atores)
