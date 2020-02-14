module.exports = {
    nombre: 'bruh',
    descripcion: 'bruh',
    args: false,
    soloServer: true,
    execute(mensaje, args){
        if(mensaje.member.voiceChannel) {
            mensaje.member.voiceChannel.join()
                .then(connection => {
                    mensaje.channel.send('bruh');
                    const coso = connection.playFile('./sonidos/bruh.mp3');

                    coso.on('end', () => {
                        setTimeout(function(){
                            mensaje.member.voiceChannel.leave();
                        }, 3000);
                    });
                })
                .catch(console.log);
        } else {
            mensaje.reply('Tenés que estar en un canal de voz para generar un bruh moment.');
        }
    }
}