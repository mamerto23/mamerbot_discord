module.exports = {
    nombre: 'ping',
    descripcion: 'Ping',
    args: false,
    soloServer: false,
    execute(mensaje, args) {
        mensaje.channel.send('.gnoP');
    },
};