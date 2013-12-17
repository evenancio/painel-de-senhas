var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var panel = require('./routes/panel');
var http = require('http');
var path = require('path');

var app = express();

var server = http.createServer(app);

var SocketIO = require('socket.io');
var io = SocketIO.listen(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/admin', admin.admin);
app.get('/panel', panel.panel);

var paineis = [];
var socketId = 0;
var prontoSocorroContador = 0;
var pediatriaContador = 0;
var ginecologistaContador = 0;
var radiologistaContador = 0;

io.sockets.on('connection', function(socket){
    socket.on('registrarPainel', function(mensagem){
        paineis.push({
            id : socketId++,
            socket : socket
        });
        console.log('Painel ' + socketId + ' registrado.');
        socket.emit('solicitarProximo', {"tipo": 'Pronto-Socorro', "senha" : prontoSocorroContador});
        socket.emit('solicitarProximo', {"tipo": 'Pediatria', "senha" : pediatriaContador});
        socket.emit('solicitarProximo', {"tipo": 'Ginecologista', "senha" : ginecologistaContador});
        socket.emit('solicitarProximo', {"tipo": 'Radiologista', "senha" : radiologistaContador});
    });

    socket.on('pedirProximo', function(mensagem){
        var tipo = mensagem.tipo;
        var senha = 0;
        switch(tipo)
        {
            case "Pronto-Socorro":
                senha = (prontoSocorroContador++) + 1;
                break;
            case "Pediatria":
                senha = (pediatriaContador++) + 1
                break;
            case "Ginecologista":
                senha = (ginecologistaContador++) + 1
                break;
            case "Radiologista":
                senha = (radiologistaContador++) + 1
                break;
        }
        paineis.forEach(function(item){
            item.socket.emit('solicitarProximo', {"tipo": tipo, "senha" : senha});
        });
    });
});

server.listen(3001);