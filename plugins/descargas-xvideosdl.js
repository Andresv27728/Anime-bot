import fetch from 'node-fetch';
import axios from 'axios'; // Not used in the provided code, but often included
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix, text }) => {
  const emoji = '🔞'; // Default NSFW emoji
  const emoji2 = '⏳'; // Default processing emoji
  const msm = '❗'; // Default error prefix

  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return conn.reply(m.chat, `${emoji} El contenido NSFW está desactivado en este grupo.\nUn administrador puede activarlo con: #nsfw on`, m);
  }

  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, envía un enlace de Xvideos para descargar el video.`, m);
  }

  try {
    await m.react(emoji2); // Using defined emoji2
    conn.reply(m.chat, `${emoji2} El video está siendo procesado, espera un momento...\n\n- El tiempo de envío depende del peso y duración del mismo.`, m);
        
    const res = await xvideosdl(args[0]);
    if (res && res.result && res.result.url) { // Check if result and URL exist
        conn.sendMessage(m.chat, { document: { url: res.result.url }, mimetype: 'video/mp4', fileName: res.result.title || 'video_xvideos.mp4' }, { quoted: m });
        await m.react('✅');
    } else {
        throw new Error("No se pudo obtener el enlace de descarga del video.");
    }

  } catch (e) {
    await m.react('✖️');
    console.error(e); // Log the actual error
    return conn.reply(m.chat, `${msm} Ocurrió un error.\n\n- Asegúrate de que el enlace sea válido y similar a:\n◉ https://www.xvideos.com/video12345678/nombre_del_video`, m);
  }
};

handler.help = ['xvideosdl <enlace>']; // Added help string
handler.command = ['xvideosdl', 'xvideosdownload']; // Added alias
handler.register = true;
handler.group = false; // Can be used in DMs if general NSFW settings allow (not handled here)
handler.premium = true; // Assuming it's a premium command based on similar downloaders
// handler.coin = 10; // Kept original if it was intended

export default handler;

async function xvideosdl(url) {
  return new Promise((resolve, reject) => {
    if (!url.includes('xvideos.com')) { // Basic URL validation
        return reject(new Error('Enlace inválido. Asegúrate que sea de xvideos.com'));
    }
    fetch(url, { method: 'get' })
      .then(res => {
        if (!res.ok) throw new Error(`Error al acceder al sitio: ${res.statusText}`);
        return res.text();
      })
      .then(html => {
        const $ = cheerio.load(html);
        const title = $("meta[property='og:title']").attr("content") || 'Video de Xvideos';
        const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");

        if (!videoUrl) {
          // Try alternative selectors if the primary one fails
          // This part is tricky without knowing the exact page structure for failed cases
          // For now, we'll rely on the primary selector and throw if not found
          return reject(new Error('No se pudo encontrar el enlace del video en la página.'));
        }

        // Other details are not used in the sendDocument part, so they are optional here
        const keyword = $("meta[name='keywords']").attr("content");
        const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
        const vote = $("div.rate-infos > span.rating-total-txt").text();
        const likes = $("span.rating-good-nbr").text();
        const deslikes = $("span.rating-bad-nbr").text();
        const thumb = $("meta[property='og:image']").attr("content");

        resolve({ status: 200, result: { title, url: videoUrl, keyword, views, vote, likes, deslikes, thumb } });
      })
      .catch(err => reject(err)); // Catches fetch errors and others
  });
}
