import gtts from 'node-gtts';
import {readFileSync, unlinkSync} from 'fs';
import {join} from 'path';
const defaultLang = 'es';
const handler = async (m, {conn, args, usedPrefix, command}) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted?.text) text = m.quoted.text;

  if (!text) {
    return conn.reply(m.chat, `🚩 Ingresa el texto a convertir.\n\nEjemplo:\n${usedPrefix + command} es Hola mundo`, m, global.rcanal); // Assuming rcanal is global
  }

  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    console.error(e); // Log the actual error for debugging
    m.reply('Ocurrió un error al convertir texto a voz. Inténtalo de nuevo.');
    // Fallback to default language if specific language failed and text was initially provided
    if (args.length > 1) { // This implies a language was initially specified
        try {
            text = args.slice(1).join(' '); // Re-join original text without lang
             if (!text && m.quoted?.text) text = m.quoted.text; // Re-assign if it was from quote
            if (!text) return; // Should not happen if caught by initial check, but for safety
            res = await tts(text, defaultLang);
        } catch (e2) {
            console.error(e2);
            return; // If default also fails, do nothing further
        }
    } else {
        return; // If no text or only lang was provided and it failed, do nothing further
    }
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  }
};
handler.help = ['tts <idioma> <texto>']; // Changed lang to idioma
handler.tags = ['tools'];
handler.command = ['tts', 'gtts'];
export default handler;

function tts(text, lang = 'es') {
  console.log(lang, text);
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}
