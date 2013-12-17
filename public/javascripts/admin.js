window.onload = function(){
    var socket = io.connect();

    var opcoesAtendimento = document.getElementById('opcoes_de_atendimento');
    var enviar = document.getElementById('enviar');

    enviar.onclick = function(){
        socket.emit('pedirProximo', {
            tipo: opcoesAtendimento.options[opcoesAtendimento.selectedIndex].text
        });
    };
};
