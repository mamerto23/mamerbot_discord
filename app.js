let cuenta = 0;
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  cuenta += 1;
  console.log(Date.now() + " Ping Received" + " Bruh " + cuenta);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fs = require('fs');
const { prefix, token } = require('./config.json');     //Datos del config.json
const Discord = require('discord.js');

const client = new Discord.Client();    //Nuevo cliente
client.comandos = new Discord.Collection();

const archivosComandos = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of archivosComandos) {
    const comando = require(`./comandos/${file}`);
    client.comandos.set(comando.nombre, comando);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const nombreComando = args.shift().toLowerCase();

    const comando = client.comandos.get(nombreComando)
        || client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(nombreComando));

    if (!comando) return;

    if (comando.soloServer && message.channel.type !== 'text') {
        return message.reply('No se puede usar este comando en un MD.');
    }

    if (comando.args && !args.length) {
        let respuesta = `No usaste ningun argumento, ${message.author}.`;

        if (comando.uso) {
            respuesta += `\nEl uso correcto del comando sería: \`${prefix}${comando.nombre} ${comando.uso}\``;
        }

        return message.channel.send(respuesta);
    }

    try {
        comando.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('No se pudo ejecutar el comando');
    }
});

client.login(token);    //Login