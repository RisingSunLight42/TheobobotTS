// Import dependencies
import { Client, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
require("dotenv").config();

// Impot client variables
const clientToken = process.env.CLIENT_TOKEN;

// Create new client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

//* Récupère les events
const eventFiles = readdirSync(path.join(__dirname, ".", "events")).filter(
    (file) => file.endsWith(".js") || file.endsWith(".ts")
);

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(clientToken);
