import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Collection, REST, Routes} from 'discord.js';
import {discord} from './config.js';


const rest = new REST().setToken(discord.bot_token);

const setupCommands = async (client, commands) => {
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename);
    const foldersPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
    client.commands = new Collection();
    for (const file of commandFiles) {
        const filePath = `file://${path.join(foldersPath, file)}`;

        const command = await import(filePath);

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};


const putCommands = async (guildId, commands) => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(discord.clientId, guildId),
            {body: commands},
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
};

export {setupCommands, putCommands};
