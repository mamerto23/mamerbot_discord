module.exports = {
    nombre: 'leave',
    aliases: ['disconnect'],
    descripcion: 'El bot se desconecta del canal en el que esté',
    args: false,
    soloServer: true,
    execute(mensaje, args){
        mensaje.member.voiceChannel.leave();
    }
}