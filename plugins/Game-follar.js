//Codígo creado por Destroy wa.me/584120346669
//Contenido explícito moderado.

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
if (!db.data.chats[m.chat].nsfw && m.isGroup) { // Assuming db is globally available
    return m.reply('❗ Los comandos +18 están desactivados en este grupo.\nSi eres admin y deseas activarlos, usa: .enable nsfw');
    }

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    await m.react('👀'); // Changed reaction to something more neutral / less suggestive

    let str;
    if (who === m.sender) { // If the user targets themselves
        str = `\`${name2}\` está realizando una interacción.`;
    } else {
        str = `\`${name2}\` y \`${name || who}\` están interactuando.`;
    }

    if (m.isGroup) {
        // Lista de videos original. No se pueden moderar los URLs directamente aquí.
        // La neutralidad dependerá de que estos videos sean reemplazados manualmente si son inapropiados.
        let pp = 'https://files.catbox.moe/7ito13.mp4';
        let pp2 = 'https://files.catbox.moe/6to3zj.mp4';
        let pp3 = 'https://files.catbox.moe/8j94sh.mp4';
        let pp4 = 'https://files.catbox.moe/ylfpb7.mp4';
        let pp5 = 'https://files.catbox.moe/kccjc7.mp4';
        let pp6 = 'https://files.catbox.moe/lt9e1u.mp4';

        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [m.sender, who]; // Include both sender and target in mentions
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    } else {
        // Fallback for DMs or if not a group, send a simpler message or just the caption
        m.reply(str, null, { mentions: [m.sender, who] });
    }
}

handler.help = ['follar @tag']; // Kept command name as per limitation, caption is neutral
handler.tags = ['nsfw']; // Corrected tag from 'nsfws' to 'nsfw'
handler.command = ['follar']; // Original command
handler.group = true;
// handler.nsfw = true; // Explicitly mark as NSFW command if the bot has such a flag

export default handler;
