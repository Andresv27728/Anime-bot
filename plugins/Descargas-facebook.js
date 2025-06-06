import { igdl } from 'ruhend-scraper'; // igdl usually means Instagram Downloader, but it's used here for Facebook.

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  const rwait = "⏳";
  const error = "✖️";
  const done = "✅";
  // Assuming rcanal, fake, packname, dev, icons, channel, textbot are global or have default values
  const rcanal = global.rcanal;
  const fake = global.fake;
  const packname = global.packname || "Bot";
  const dev = global.dev || "Desarrollador";
  const icons = global.icons || "https://example.com/icon.jpg";
  const channel = global.channel || "https://example.com/channel";
  const textbot = global.textbot || "";

  if (!args[0]) {
    return conn.reply(m.chat, '🚩 Ingresa un enlace de Facebook.', m, rcanal);
  }

  let res;
  try {
    await m.react(rwait);
    conn.reply(m.chat, `🕒 Descargando tu video de Facebook...`, m, {
      contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
      title: packname,
      body: dev,
      previewType: 0,
      thumbnailUrl: icons, // Corrected from thumbnail: icons
      sourceUrl: channel }}
    });
    res = await igdl(args[0]); // The function is igdl, but used for facebook
  } catch (e) {
    console.error("Error en igdl (facebook):", e);
    await m.react(error);
    return conn.reply(m.chat, '🚩 Error al obtener datos. Verifica el enlace e inténtalo de nuevo.', m, fake);
  }

  let result = res.data;
  if (!result || result.length === 0) {
    await m.react(error);
    return conn.reply(m.chat, '🚩 No se encontraron videos en el enlace proporcionado.', m, fake);
  }

  let data;
  try {
    // It seems the original code expects specific resolutions which might not always be present.
    // A more robust way is to pick the best available quality or the first one.
    // For now, sticking to similar logic but simplifying.
    data = result.find(i => i.resolution && (i.resolution.includes("720") || i.resolution.includes("HD"))) ||
           result.find(i => i.resolution && (i.resolution.includes("360") || i.resolution.includes("SD"))) ||
           result[0]; // Fallback to the first result if specific resolutions aren't found
  } catch (e) {
    console.error("Error al seleccionar resolución:", e);
    await m.react(error);
    return conn.reply(m.chat, '🚩 Error al procesar los datos del video.', m, rcanal);
  }

  if (!data || !data.url) {
    await m.react(error);
    return conn.reply(m.chat, '🚩 No se encontró una resolución de video adecuada para descargar.', m, rcanal);
  }

  let videoUrl = data.url;
  try {
    // await m.react(rwait); // Already processing, no need for another rwait unless download is very long
    await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: `🚩 Video de Facebook\n${textbot}`,
        fileName: 'fb_video.mp4', // Generic filename
        mimetype: 'video/mp4'
    }, { quoted: m });
    await m.react(done);
  } catch (e) {
    console.error("Error al enviar video:", e);
    await m.react(error);
    return conn.reply(m.chat, '🚩 Error al enviar el video. Intenta de nuevo más tarde.', m, rcanal);
  }
};

handler.help = ['facebook <enlace>', 'fb <enlace>'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb', 'fbdl']; // Added fbdl alias
handler.register = true;
// handler.cookies = 1; // Kept if it's a specific system in the bot

export default handler;
