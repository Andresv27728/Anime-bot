
import fetch from 'node-fetch';
const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`Introduzca el título de la canción.\nEjemplo:\n.${command} where we are`);
  try {
    m.reply(wait);
    const search = await fetch(`https://zenz.biz.id/search/SoundCloud?query=${encodeURIComponent(text)}`);
    const result = await search.json();
    if (!result.status || !result.result || !result.result[0]) {
      return m.reply('Canción no encontrada.');
    }
    const url = result.result[0].url;
    const res = await fetch(`https://zenz.biz.id/downloader/SoundCloud?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    if (!json.status || !json.audio_url) {
      return m.reply('Error al descargar la canción.');
    }
    await conn.sendMessage(m.chat, {
      audio: { url: json.audio_url },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${json.title}.mp3`,
      caption: `Titulo: ${json.title}\nAutor: ${json.author}\nDurasion: ${json.duration}`,
      contextInfo: {
        externalAdReply: {
          title: json.title,
          body: json.author,
          thumbnailUrl: json.thumbnail,
          mediaType: 2,
          mediaUrl: json.source_url,
          sourceUrl: json.source_url,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('Hay un error.');
  }
};
handler.help = ['playsoundcloud *<titulo>*'];
handler.tags = ['downloader'];
handler.command = /^playsoundcloud$/i;
export default handler;