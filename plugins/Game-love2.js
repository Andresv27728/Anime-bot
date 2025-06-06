import fs from 'fs';
import path from 'path';
import uploadImage from '../lib/uploadImage.js' // This import seems unused in the provided code.
import { sticker } from '../lib/sticker.js'; // This import also seems unused.

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat; // In DMs, 'who' would be the chat JID, which is the other person.
    if (!who || who === m.sender) { // Added check: if target is self or no one, ask to tag someone else.
        return m.reply('❕️ Etiqueta o menciona a otra persona.');
    }

    let user = global.db.data.users[who]; // This is fine if 'who' is a user JID.
    let name = conn.getName(m.sender);
    let name2 = conn.getName(who);
    await m.react('🤡'); // Kept as per original intent
    let str = `${name} está enamorado/a de ${name2}.`;

    if (m.isGroup){
    let pp = 'https://telegra.ph/file/5fbd60c40ab190ecc8e1c.mp4';
    let pp2 = 'https://telegra.ph/file/ca30d358d292674698b40.mp4';
    let pp3 = 'https://telegra.ph/file/25f88386dd7d4d6df36fa.mp4';
    let pp4 = 'https://telegra.ph/file/eb63131df0de6b47c7ab7.mp4';
    let pp5 = 'https://telegra.ph/file/209990ee46c645506a5fc.mp4';
    let pp6 = 'https://telegra.ph/file/440f276fcbb2d04cbf1d1.mp4';
    let pp7 = 'https://telegra.ph/file/42cea67d9b013ed9a9cd0.mp4';
    let pp8 = 'https://telegra.ph/file/bc0f47b8f3fb9470bc918.mp4';
    let pp9 = 'https://telegra.ph/file/79ae875090b64ab247b7a.mp4';
    let pp10 = 'https://telegra.ph/file/63222faf293e9d086f607.mp4';
    const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10];
    const video = videos[Math.floor(Math.random() * videos.length)];
    conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender, who] },{ quoted: global.fkontak }) // Added 'who' to mentions, assuming fkontak is global
    } else {
      // Optionally, send a simpler message in DMs if video with mention is not desired or possible
      m.reply(str);
    }
}

handler.help = ['love2 @tag', 'enamorado @tag', 'enamorada @tag'];
handler.tags = ['fun'];
handler.command = ['love2', 'enamorada', 'enamorado'];
handler.group = true; // Remains true as the video sending part is for groups

export default handler;
