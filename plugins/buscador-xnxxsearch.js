import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, {text, usedPrefix, command}) => {
  const emoji = '🔞'; // Defining a default emoji if not globally defined
  const msm = '❗'; // Defining a default error prefix

  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return conn.reply(m.chat, `${emoji} El contenido NSFW está desactivado en este grupo.\nUn administrador puede activarlo con: #nsfw on`, m);
  }
  
  if (!text) {
    return conn.reply(m.chat, `${emoji} Ingresa tu búsqueda.\nEjemplo: ${usedPrefix + command} Con mi prima`, m);
  }

  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };
    
    if (!global.videoListXXX) {
      global.videoListXXX = [];
    }
    
    if (global.videoListXXX[0]?.from === m.sender) {
      global.videoListXXX.splice(0, global.videoListXXX.length);
    }

    await m.react("🔍"); // Added reaction
    const res = await xnxxsearch(text);
    const json = res.result;

    if (json.length === 0) {
      await m.react("✖️");
      return conn.reply(m.chat, `${emoji} No se encontraron resultados para: ${text.toUpperCase()}`, m);
    }

    let cap = `${emoji} Resultados para: ${text.toUpperCase()}\n\n`;
    let count = 1;

    for (const v of json) {
      const linkXXX = v.link;
      vids_.urls.push(linkXXX);
      cap += `[${count}]\n🎬 Título: ${v.title}\n🔗 Link: ${v.link}\n❗ Info: ${v.info}\n\n`;
      cap += '────────────────────\n\n';
      count++;
    }

    await m.react("✅");
    conn.reply(m.chat, cap.trim(), m); // Trimmed final caption
    global.videoListXXX.push(vids_);
  } catch (e) {
    await m.react("✖️"); // Added reaction for error
    console.error(e); // Log the full error for debugging
    return conn.reply(m.chat, `${msm} Ocurrió un error. Por favor, intenta de nuevo.`, m);
  }
};

handler.help = ['xnxxsearch'].map((v) => v + ' <query>');
handler.tags = ['buscador'];
handler.command = ['xnxxsearch', 'xnxxs'];
handler.register = true; // Assuming this should be true to enable the command
handler.group = false; // Assuming it can be used in DMs if nsfw is not a group concept there

export default handler;

async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com';
    
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
      .then((res) => res.text())
      .then((res) => {
        const $ = cheerio.load(res, {xmlMode: false});
        const title = [];
        const url = [];
        const desc = [];
        const results = [];

        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb').each(function(c, d) {
            url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
          });
        });

        $('div.mozaique').each(function(a, b) {
          $(b).find('div.thumb-under').each(function(c, d) {
            desc.push($(d).find('p.metadata').text());
            $(d).find('a').each(function(e, f) {
              title.push($(f).attr('title'));
            });
          });
        });

        for (let i = 0; i < title.length; i++) {
          results.push({title: title[i], info: desc[i], link: url[i]});
        }

        resolve({code: 200, status: true, result: results});
      })
      .catch((err) => reject({code: 503, status: false, result: err}));
  });
}
