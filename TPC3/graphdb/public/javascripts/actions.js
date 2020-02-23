$(document).ready(function() {
    $("#limpar").click(e => {
        e.preventDefault()
        $("#resultados").val('')
    })
    $("#exec").click(e => {
        e.preventDefault()
        var q = $("#query").val()
        var rep = $("#rep").val()
        axios.get('http://localhost:3019/query/'+rep+'?query=' + q)
            .then(dados => {
                var res = JSON.stringify(dados.data)
                $("#resultados").val(res);
            })
            .catch(erro => {
                $("#resultados").val(erro.data);
            })
    })
})