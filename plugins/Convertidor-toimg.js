import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    const emoji = '🖼️'; // Default emoji for this context
    const notStickerMessage = `${emoji} Debes citar un sticker para convertirlo a imagen.`;
    const q = m.quoted || m;
    const mime = q.mediaType || ''; // q.mediaType for Baileys, q.mimetype for older versions if any

    if (!/sticker/.test(mime)) {
        return m.reply(notStickerMessage, null, { quoted: m }); // Ensure original message is quoted for context
    }

    await m.react("🔄"); // Processing reaction

    try {
        const media = await q.download();
        if (!media) {
            await m.react("⚠️");
            return m.reply("No se pudo descargar el sticker.", null, { quoted: m });
        }

        let out = await webp2png(media).catch(e => {
            console.error("Error en webp2png:", e);
            return null; // Return null on error to handle it
        });

        if (!out || out.length === 0) {
            await m.react("✖️");
            return m.reply("Error al convertir el sticker a imagen.", null, { quoted: m });
        }

        await conn.sendFile(m.chat, out, 'output.png', 'Aquí tienes tu imagen:', m); // Added caption
        await m.react("✅");

    } catch (e) {
        console.error("Error en handler toimg:", e);
        await m.react("✖️");
        m.reply("Ocurrió un error procesando tu solicitud.", null, { quoted: m });
    }
}

handler.help = ['toimg (responde a sticker)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'img', 'jpg'];

export default handler;
