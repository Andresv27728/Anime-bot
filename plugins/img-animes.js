/*
AVISO : si vas a usar la api ( https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/anime-${command}.json ) dejale creditos al curly, digo digo, curi
*/

import axios from "axios"

let handler = async (m, {command, conn, usedPrefix}) => {
    // Assuming rcanal is a global variable for context, or define a fallback.
    const rcanal = global.rcanal;

    try {
        await m.react("🖼️"); // Reaction for image search/fetch

        const response = await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/anime-${command}.json`);
        let res = response.data;

        if (!res || res.length === 0) {
            await m.react("❓");
            return conn.reply(m.chat, "No se encontraron imágenes para este personaje o el recurso no está disponible.", m, rcanal);
        }

        let haha = await res[Math.floor(res.length * Math.random())];

        // Capitalize the command for the caption
        let captionText = command.charAt(0).toUpperCase() + command.slice(1);

        await conn.sendFile(m.chat, haha, 'anime_image.jpg', `*${captionText}*`, m, null, rcanal);
        // No need for a success reaction here as the image itself is the success feedback.

    } catch (error) {
        console.error("Error en img-animes:", error);
        await m.react("✖️");
        conn.reply(m.chat, "Ocurrió un error al obtener la imagen del anime. Intenta de nuevo más tarde.", m, rcanal);
    }
}

handler.command = handler.help = [
    'alisa', 'aihoshino', 'remcham', 'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa',
    'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia',
    'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura',
    'kaori', 'keneki', 'kotori', 'kurumitokisaki', 'madara', 'mikasa', 'miku',
    'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura'
];
handler.tags = ['anime'];
// handler.register = true; // Uncomment if registration is required
// handler.group = true; // Uncomment if command should be group-only

export default handler;
