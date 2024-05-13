import {Client, Events, GatewayIntentBits} from 'discord.js';
import {discord} from './config.js';
import {putCommands, setupCommands} from './command.js';


const client = new Client({intents: [GatewayIntentBits.Guilds]});
const commands = [];

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }

});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('ready', async () => {
    const guilds = client.guilds.cache.map(guild => guild.id);
    for (const id of guilds) {
        await putCommands(id, commands);
    }
});

client.on('guildCreate', async guild => {
    const guildId = guild.id;
    await putCommands(guildId, commands);
});

const startBot = async () => {
    await setupCommands(client, commands);
    await client.login(discord.bot_token);
};

export default startBot