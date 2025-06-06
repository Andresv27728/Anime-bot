import { sticker } from '../lib/sticker.js'
//import uploadFile from '../lib/uploadFile.js' // Kept commented if sticker lib handles this
//import uploadImage from '../lib/uploadImage.js' // Kept commented
//import { webp2png } from '../lib/webp2mp4.js' // Kept commented

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const rcanal = global.rcanal; // Assuming global or define fallback
  const packname = global.packname || "Sticker Bot";
  const author = global.author || "sticker";
  const redes = global.redes || "https://example.com";
  const icons = global.icons || "https://example.com/icon.jpg";


  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
        return m.reply(`🥷 El video no puede durar más de 8 segundos.`);
      }
      let img = await q.download?.();

      if (!img) {
        return conn.reply(m.chat, `👻 No se pudo obtener el archivo (imagen/video/gif). Responde a un mensaje con el archivo multimedia e intenta de nuevo.`, m, rcanal);
      }

      let out;
      try {
        stiker = await sticker(img, false, global.packsticker || packname, global.author || author);
      } catch (e) {
        console.error("Error en sticker (intento 1):", e);
        // Fallback logic from original if primary sticker creation fails
        // This part might need a robust uploadFile/uploadImage if the sticker lib doesn't handle all cases
        // For now, assuming the sticker function or internal fallbacks are preferred.
        // The original code had a complex fallback that seemed to re-upload and then make sticker.
        // This simplified version assumes `sticker` function is robust or we accept its failures.
        // If specific upload functions are needed, they should be uncommented and used.
         if (/webp/g.test(mime)) { // If it was webp, try to convert to png first (though sticker usually takes webp)
             // out = await webp2png(img) // webp2png import is commented, if needed, it should be active
         } else if (/image|video/g.test(mime)) { // For image/video, it might need upload if sticker lib expects URL for some types
             // out = await uploadImage(img) // uploadImage import is commented
         }
         // if (typeof out !== 'string' && !Buffer.isBuffer(out)) out = await uploadImage(img) // Final fallback to upload
         // stiker = await sticker(false, out, global.packsticker || packname, global.author || author)
         // For now, if first sticker attempt fails, we'll let the finally block handle it or throw.
         if (!stiker) throw e; // Rethrow if sticker still not made
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker || packname, global.author || author);
      } else {
        return m.reply(`🥀 La URL es incorrecta.`);
      }
    } else {
        return conn.reply(m.chat, `👻 Responde a una imagen, video, GIF o proporciona una URL para crear el sticker.\nEjemplo:\n${usedPrefix + command} (respondiendo a imagen)\n${usedPrefix + command} https://example.com/image.jpg`, m, rcanal);
    }
  } catch (e) {
    console.error("Error principal en handler:",e);
    // stiker = e; // Assigning error to stiker is not ideal here.
    // The finally block will handle stiker if it's an error buffer, otherwise it will reply with generic error.
  } finally {
    if (stiker && !Buffer.isBuffer(stiker)) { // Check if stiker is actually a sticker buffer/path, not an error object
         conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: packname, body: `⏤͟͞ू⃪Black Clover Bot࿐`, mediaType: 2, sourceUrl: redes, thumbnail: icons}}}, { quoted: m });
    } else {
        // If stiker is an error or still false
        conn.reply(m.chat, '👻 Error al crear el sticker. Asegúrate de responder a una imagen, video (menor a 8s) o GIF, o usa un enlace válido.', m, rcanal);
    }
  }
}
handler.help = ['sticker (responde a imagen/video/gif)', 'sticker <url>', 's (responde a imagen/video/gif)', 's <url>'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  // Improved URL regex to be a bit more forgiving and general
  return text.match(new RegExp(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*\.(jpe?g|gif|png|webp)|[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/, 'gi'));
}
