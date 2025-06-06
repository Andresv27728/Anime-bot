import { promises as fs } from 'fs';

// Define file paths at the top for clarity, assuming they are relative to the project root
const charactersFilePath = './src/database/characters.json';
// haremFilePath seems unused in the provided snippet after character status logic was self-contained.
// If it's used elsewhere or for other commands, it should be kept.
// const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading characters.json:", error); // Log full error to console
        throw new Error('Error: No se pudo cargar la base de datos de personajes.'); // User-friendly error
    }
}

// loadHarem function seems unused in the current scope of this handler,
// as userEntry logic is self-contained with character data or a simple flag.
// If harem.json is meant to store who claimed whom, it should be loaded.
// For now, assuming 'claimedBy' or similar field would be in characters.json or this is simplified.

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const emoji = 'ℹ️'; // Default emoji

    if (args.length === 0) {
        await conn.reply(m.chat, `✧ Especifica un personaje para ver su información.\nEjemplo: ${usedPrefix + command} Aika Sano`, m);
        return;
    }

    const characterName = args.join(' ').toLowerCase().trim();
    await m.react("🔍");

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await m.react("❓");
            await conn.reply(m.chat, `✧ No se encontró el personaje "${characterName}".`, m);
            return;
        }

        // Simplified status logic: assumes character object might have a 'claimedBy' field or similar
        // If 'harem.json' is the source of truth for claims, it should be loaded and used here.
        // For this revision, I'll assume character object itself contains claim status if applicable.
        const statusMessage = character.claimedBy
            ? `Reclamado por: @${character.claimedBy.split('@')[0]}`
            : 'Libre';
        
        const message = `❀ Nombre: ${character.name}\n⚥ Género: ${character.gender}\n✰ Valor: ${character.value}\n♡ Estado: ${statusMessage}\n❖ Fuente: ${character.source}`;

        let mentions = [];
        if (character.claimedBy) {
            mentions.push(character.claimedBy);
        }

        await conn.reply(m.chat, message, m, { mentions });
        await m.react("✅");

    } catch (error) {
        console.error("Error en handler gacha-winfo:", error);
        await m.react("✖️");
        // Use the user-friendly error from loadCharacters or a generic one
        const errorMessage = error.message.startsWith("Error:") ? error.message : '✘ Ocurrió un error al obtener la información del personaje.';
        await conn.reply(m.chat, errorMessage, m);
    }
};

handler.help = ['charinfo <personaje>', 'winfo <personaje>', 'waifuinfo <personaje>'];
handler.tags = ['anime', 'gacha']; // Added gacha tag
handler.command = ['charinfo', 'winfo', 'waifuinfo'];
handler.group = true; // Assuming it's a group command
handler.register = true;

export default handler;
