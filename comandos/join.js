module.exports = {
    nombre: 'join',
    descripcion: 'Entra a el canal de voz en el que estés.',
    args: false,
    soloServer: true,
    execute(mensaje, args){
        if (mensaje.member.voiceChannel) {
            mensaje.member.voiceChannel.join()
                .then(connection => {
                    mensaje.reply('Adentro.');
                })
                .catch(console.log);
        } else {
            mensaje.reply('Tenés que estar en un canal primero.');
        }
    }
}