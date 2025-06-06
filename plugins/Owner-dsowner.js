/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {
  // Assuming rcanal, rwait, done are global or have default values defined elsewhere
  const rcanal = global.rcanal;
  const rwait = global.rwait || '⏳';
  const done = global.done || '✅';

  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, '🚩 Usa este comando solo en el número principal del Bot.', m, rcanal);
  }
  await conn.reply(m.chat, '🚩 Iniciando eliminación de archivos de sesión (excepto creds.json)...', m, rcanal);
  await m.react(rwait); // Use await for react

  // Default 'sessions' path, ensure 'sessions' variable is defined globally or passed correctly.
  // For this context, I'll assume 'sessions' is a global variable like 'global.sessions'.
  // If not, it should be './sessions/' or similar depending on project structure.
  const sessionPath = `./${global.sessions || 'sessions'}/`;

  try {
    if (!existsSync(sessionPath)) {
      // If the directory itself doesn't exist, it's effectively empty or not set up.
      return await conn.reply(m.chat, '🚩 La carpeta de sesiones no existe o no está configurada.', m, rcanal);
    }
    let files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') { // Keep creds.json
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    if (filesDeleted === 0 && files.includes('creds.json') && files.length === 1 || files.length === 0) {
      // If only creds.json remains, or folder was empty to begin with.
      await conn.reply(m.chat, '🚩 La carpeta de sesiones ya está limpia (excepto creds.json).', m, rcanal);
    } else {
      await m.react(done);
      await conn.reply(m.chat, `🚩 Se eliminaron ${filesDeleted} archivos de sesión (excepto creds.json).`, m, rcanal);
      conn.reply(m.chat, `🚩 Sesiones limpiadas. ¿Funcionando correctamente?`, m, rcanal);
    }
  } catch (err) {
    console.error('Error al leer la carpeta o los archivos de sesión:', err);
    await m.react('✖️'); // Error reaction
    await conn.reply(m.chat, '🚩 Ocurrió un error al limpiar las sesiones.', m, rcanal);
  }
}
handler.help = ['clearallsession', 'dsowner']; // More descriptive help
handler.tags = ['owner']; // Corrected tag from ['fix', 'owner']
handler.command = ['delai', 'delyaemori', 'dsowner', 'clearallsession'];
handler.rowner = true;

export default handler;
