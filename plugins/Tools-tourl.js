// OfcKing >> https://github.com/OfcKing
/* ARCHIVO EDITADO , CREADO O MEJORADO
POR The Carlos
*/
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch'; // fetch is imported but not used directly in this handler

let handler = async (m, { conn, usedPrefix, command }) => {
  const devSignature = global.dev || ''; // Fallback for dev signature

  try {
    if (!m.quoted) {
      return m.reply(`⚔️ Responde a una imagen para convertirla en URL.\nEjemplo: ${usedPrefix + command}`);
    }

    const q = m.quoted;
    const mime = q.mimetype || q.mediaType || '';
    if (!mime.includes('image')) {
      return m.reply('✐ El archivo citado debe ser una imagen.');
    }

    await m.react("⬆️"); // Uploading reaction

    const media = await q.download();
    if (!media) {
      await m.react("⚠️");
      return m.reply('⚔️ No se pudo descargar la imagen. Asegúrate de responder a una imagen válida.');
    }

    let url = '';
    // The original logic implies uploadImage is for images and uploadFile for other types,
    // but the mime check already restricts to 'image'. So, uploadImage should be sufficient.
    // If uploadFile is a more generic uploader that also handles images to specific services, it's fine.
    // For now, maintaining the original distinction if it exists.
    if (mime.startsWith('image/')) { // Explicitly check for image mime types
      url = await uploadImage(media);
    } else {
      // This 'else' block might be unreachable if the mime check is strictly 'image'.
      // If other image-like types could pass (e.g. image/webp if not caught by startsWith('image/')),
      // then uploadFile might be a fallback.
      // However, the previous check `!mime.includes('image')` should prevent non-images.
      // To be safe, let's assume uploadImage is the primary for actual images.
      // If the intent was for any file type if not image, the initial mime check was too restrictive.
      // Given the command context (to URL for an image), will stick to uploadImage.
      // If uploadFile is meant for other types, this command should be clearer.
      // For now, let's assume any 'image/*' goes to uploadImage.
      // If uploadImage fails, the catch block will handle it.
      url = await uploadImage(media);
    }

    if (!url) {
      await m.react("✖️");
      return m.reply('⚔️ No se pudo generar la URL de la imagen.');
    }

    await m.react("✅");
    m.reply(`🔗 Enlace de tu Imagen:\n\n${url}\n\n${devSignature}`);
  } catch (error) {
    console.error("Error en Tools-tourl:", error);
    await m.react("✖️");
    m.reply('⚔️ Ocurrió un error al generar la URL. Intenta de nuevo.');
  }
};

handler.help = ['tourl (responde a imagen)']; // Clarified help
handler.tags = ['tools'];
handler.command = ['tourl', 'upload', 'subirimagen']; // Added aliases
// handler.diamond = true; // Example if a cost is associated

export default handler;
