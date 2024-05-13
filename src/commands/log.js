import {SlashCommandBuilder} from 'discord.js';
import {logger} from '../logger.js';
import {log_counter} from '../metrics.js';

const data = new SlashCommandBuilder()
    .setName('log')
    .setDescription('Provides information about the user.')
    .addStringOption(option =>
        option.setName('message')
            .setDescription('The message to log')
            .setRequired(true)
    );


const execute = async interaction => {
    let message;
    try {
        message = interaction.options.getString('message');
        const username = interaction.user.username;
        const content = {username, message};
        await logger.emit('log', content);
        log_counter.inc();
        interaction.reply(`\`\`\`${message}\`\`\` was successfully logged`);
    } catch (error) {
        interaction.reply(`\`\`\`${message}\`\`\` wasn't logged. Something went wrong`);
    }
};

export {data, execute};
