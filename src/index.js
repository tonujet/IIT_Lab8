import startBot from './discord-bot.js';
import startServer from './web-server.js';


await startServer();
await startBot();

