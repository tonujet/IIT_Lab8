import {SlashCommandBuilder} from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

const execute = interaction => {
    interaction.reply('Дороу, кого пінгуєш?)))))!');
};

export {data, execute};