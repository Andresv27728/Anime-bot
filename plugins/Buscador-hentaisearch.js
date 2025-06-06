//código creado por The Carlos 
import cheerio from 'cheerio';
import axios from 'axios';
const handler = async (m, {conn, text, __dirname, usedPrefix, command}) => {

const gp = global.db.data.chats[m.chat] || {};

if (!gp.nsfw && m.isGroup) return m.reply('❗ Los comandos +18 están desactivados en este grupo.\nSi eres admin y deseas activarlos, usa: .enable nsfw');

  if (!text) throw `ⓘ Ingresa el nombre del hentai a buscar.`;
  const searchResults = await searchHentai(text);
  let teks = '';
  let randomThumbnail;

  if (searchResults.result.length > 0) {
    teks = searchResults.result.map((v, i) => `
❀ ${i+1}. ${v.title}
> Vistas: ${v.views}
> Link: ${v.url}`).join('\n\n');
    const randomIndex = Math.floor(Math.random() * searchResults.result.length);
    randomThumbnail = searchResults.result[randomIndex].thumbnail;
    await conn.sendMessage(m.chat, { image: { url: randomThumbnail }, caption: teks }, { quoted: m });
  } else {
    randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png'; // Default error image
    teks = `✧ No se encontraron resultados.`;
    // Only send the message if no results were found and thus no message sent yet.
    conn.sendFile(m.chat, randomThumbnail, 'error.jpg', teks, m);
  }
  // Removed the redundant conn.sendFile(m.chat, randomThumbnail, 'error.jpg', teks, m); that was outside the else block.
};
handler.command = ['searchhentai', 'hentaisearch', 'htsearch']
export default handler;
async function searchHentai(search) {
  return new Promise((resolve, reject) => {
    axios.get('https://hentai.tv/?s=' + search).then(async ({data}) => {
      const $ = cheerio.load(data);
      const result = {};
      const res = [];
      result.coder = 'rem-comp';
      result.result = res;
      result.warning = 'It is strictly forbidden to reupload this code, copyright © 2024 by rem-comp';
      $('div.flex > div.crsl-slde').each(function(a, b) {
        const _thumbnail = $(b).find('img').attr('src');
        const _title = $(b).find('a').text().trim();
        const _views = $(b).find('p').text().trim();
        const _url = $(b).find('a').attr('href');
        const hasil = {thumbnail: _thumbnail, title: _title, views: _views, url: _url};
        res.push(hasil);
      });
      resolve(result);
    }).catch((err) => {
      console.log(err);
      // It's better to reject the promise on error
      reject(err);
    });
  });
}
