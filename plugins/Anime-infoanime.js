import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) return conn.reply(m.chat, `🍟 Nombre del anime:\n\nEjemplo: ${usedPrefix + command} black clover`, m, rcanal)
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) return conn.reply(m.chat, `🚩 Fallo al buscar.`, m, rcanal)

let json = await res.json()
let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0]
let author = json.data[0].authors[0].name
let animeingfo = `Título: ${title_japanese}
Capítulos: ${chapters}
Tipo: ${type}
Estado: ${status}
Volúmenes: ${volumes}
Favoritos: ${favorites}
Puntaje: ${score}
Miembros: ${members}
URL: ${url}
Autor: ${author}
Trasfondo: ${background}
Sinopsis: ${synopsis}
 `
conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'anjime.jpg', `🚩 *INFO ANIME* 🚩\n\n${animeingfo}`, fkontak, m)

}
handler.help = ['infoanime']
handler.tags = ['anime']
handler.command = ['infoanime', 'animeinfo']

export default handler
