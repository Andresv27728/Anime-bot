import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
// Ensure these keys are managed securely, e.g., via environment variables if this were a real deployment
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) {
await m.react("🎶"); // Added reaction for processing
let media = await q.download()
let ext = mime.split('/')[1]
let filePath = `./tmp/${m.sender}.${ext}` // Defined filePath
fs.writeFileSync(filePath, media)
try { // Added try-catch for the ACRCloud identification
let res = await acr.identify(fs.readFileSync(filePath))
let { code, msg } = res.status
if (code !== 0) {
    console.error(`ACRCloud Error: Code ${code} - ${msg}`);
    // It's better to reply to the user than throw, to prevent crashes
    m.reply(`No se pudo identificar la canción (Error: ${msg}). Intenta con otro audio/video.`);
    await m.react("✖️");
    return; // Exit after error
}
if (res.metadata && res.metadata.music && res.metadata.music.length > 0) {
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
RESULTADOS DE LA BÚSQUEDA

• 🌻 Título: ${title}
• 🍃 Artista: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Desconocido'}
• 💻 Álbum: ${album.name || 'Desconocido'}
• 🍂 Género: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Desconocido'}
• 🪙 Lanzamiento: ${release_date || 'Desconocido'}
`.trim()
fs.unlinkSync(filePath)
m.reply(txt)
await m.react("✅");
} else {
    m.reply("No se encontró información de la canción en los metadatos.");
    await m.react("🤔");
}
} catch (error) {
    console.error("Error identifying music:", error);
    m.reply("Ocurrió un error al procesar el archivo de audio/video.");
    await m.react("✖️");
} finally {
    if (fs.existsSync(filePath)) { // Ensure file is deleted even if an error occurs earlier
        fs.unlinkSync(filePath);
    }
}
} else {
    m.reply('💭 Responde a un audio o video.');
    }
}
handler.command = ['quemusica', 'quemusicaes', 'whatmusic']
handler.help = ['whatmusic (responde a audio/video)']; // Added help text
handler.tags = ['tools']; // Assuming 'tools' is a valid tag
// handler.diamond = 1; // Example if a cost is associated
export default handler
