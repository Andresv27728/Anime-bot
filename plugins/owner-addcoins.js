import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let impts = 0; // This variable seems unused in the provided logic, but kept as it's in original.

let handler = async (m, { conn, text }) => {
    const emoji = 'ℹ️'; // Default info emoji
    const emoji2 = '⚠️'; // Default warning emoji

    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            const quoted = m.quoted ? m.quoted.sender : null;
            // If message is quoted, target the quoted user. Otherwise, target the group itself (might be an error in original logic if intent is never to add to group chat ID).
            // For adding coins, it should always be a user.
            // Correcting to ensure 'who' is a user, or it prompts to mention.
            if (quoted) {
                who = quoted;
            } else {
                 return m.reply(`${emoji} Menciona al usuario para añadirle coins.`);
            }
        }
    } else { // In DMs, target the chat partner (the user)
        who = m.chat;
    }
    
    if (!who || who.endsWith('@g.us')) return m.reply(`${emoji} Menciona al usuario o cita su mensaje.`); // Ensure 'who' is a user JID
    
    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) return m.reply(`${emoji} Ingresa la cantidad a añadir.`);
    if (isNaN(txt)) return m.reply(`${emoji2} Solo números, por favor.`);
    
    let dmt = parseInt(txt);
    // let coin = dmt; // This 'coin' variable wasn't used meaningfully.
    // let pjk = Math.ceil(dmt * impts); // impts is 0, so pjk is always 0.
    // coin += pjk; // Effectively coin = dmt
    
    if (dmt < 1) return m.reply(`${emoji2} La cantidad mínima es 1.`); // Changed 'coin' to 'dmt' for clarity
    
    let users = global.db.data.users;
    if (!users[who]) users[who] = {}; // Initialize user if not exists
    if (!users[who].coin) users[who].coin = 0; // Initialize coins if not exists

    users[who].coin += dmt;
    
    m.reply(`💸 Coins Añadidos:\n\n@${who.split('@')[0]} recibió ${dmt} Coins 💸`, null, { mentions: [who] });
};

handler.help = ['addcoins <@usuario> <cantidad>']; // Clarified help
handler.tags = ['owner'];
handler.command = ['añadircoin', 'addcoin', 'addcoins']; 
handler.rowner = true;

export default handler;
