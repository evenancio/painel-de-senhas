window.onload = function(){
    var prontoSocorro = document.getElementById('pronto-socorro');
    var pediatria = document.getElementById('pediatria');
    var ginecologista = document.getElementById('ginecologista');
    var radiologista = document.getElementById('radiologista');

    var socket = io.connect();

    socket.emit('registrarPainel', {});

    socket.on('solicitarProximo', function(data){
        var tipo = data.tipo;
        var senha = data.senha;

        switch(tipo)
        {
            case "Pronto-Socorro":
                prontoSocorro.innerHTML = senha;
                break;
            case "Pediatria":
                pediatria.innerHTML = senha;
                break;
            case "Ginecologista":
                ginecologista.innerHTML = senha;
                break;
            case "Radiologista":
                radiologista.innerHTML = senha;
                break;
            default:
        }
    });

};
