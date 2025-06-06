import axios from 'axios'
const {proto, generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessageContent, getDevice} = (await import("@whiskeysockets/baileys")).default

let handler = async (message, { conn, text, usedPrefix, command }) => {
  const emoji = '🎵'; // Default emoji
  const emoji2 = '🔍'; // Default search/processing emoji
  const rwait = '⏳'; // Default wait reaction (assuming global or define here)
  const done = '✅'; // Default done reaction (assuming global or define here)
  const dev = 'Bot'; // Default dev text for footer (assuming global or define here)


if (!text) return conn.reply(message.chat, `${emoji} Ingresa tu búsqueda para TikTok.`, message)

async function createVideoMessage(url) {
const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
return videoMessage
}

// Helper function to shuffle array (Fisher-Yates shuffle)
async function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

try {
await message.react(rwait)
// Removed the "Descargando Su Video" message as it's a search, not direct download at this stage.
// A general "searching" or "processing" message could be added if desired, but react is often enough.
// conn.reply(message.chat, `${emoji2} Buscando videos, espera un momento...`, message)

let results = []
let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + encodeURIComponent(text)) // Added encodeURIComponent for robustness
let searchResults = response.data

if (!searchResults || searchResults.length === 0) {
    await message.react('✖️');
    return conn.reply(message.chat, `${emoji} No se encontraron resultados para "${text}".`, message);
}

shuffleArray(searchResults)
let selectedResults = searchResults.slice(0, 7) // Limiting to 7 results for carousel

for (let result of selectedResults) {
// Basic check for necessary properties
if (!result.nowm || !result.title) continue;

results.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }), // Text can be null if header has title
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: global.dev || 'TikTok Search' }), // Using global.dev or fallback
header: proto.Message.InteractiveMessage.Header.fromObject({
title: result.title, // Title of the video
hasMediaAttachment: true,
videoMessage: await createVideoMessage(result.nowm)
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }) // No buttons needed for this card type
})
}

if (results.length === 0) {
    await message.react('✖️');
    return conn.reply(message.chat, `${emoji} No se encontraron videos válidos para mostrar.`, message);
}

const responseMessage = generateWAMessageFromContent(message.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: `${emoji} Resultados para: ${text}` }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Resultados de TikTok' }),
header: proto.Message.InteractiveMessage.Header.create({ title: `Búsqueda: "${text}"`, hasMediaAttachment: false }), // Added a main header for the carousel
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })})}}
}, { quoted: message })

await message.react(done)
await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id })

} catch (error) {
  console.error(error); // Log the full error
  await message.react('✖️');
  await conn.reply(message.chat, `${global.msm || '❗'} Ocurrió un error al buscar en TikTok. Intenta de nuevo.`, message);
}}

handler.help = ['tiktoksearch <texto>', 'ttsearch <texto>'] // Added alias to help
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttsearch', 'ttss', 'tiktoks'] // Added ttsearch alias
handler.register = true
// handler.group = true // Kept original, though it could work in DMs too
handler.cooldown = 10; // Added a cooldown to prevent API spam
// handler.coin = 2 // Kept original if intended

export default handler
