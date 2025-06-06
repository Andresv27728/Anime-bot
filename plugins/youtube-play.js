import fetch from 'node-fetch'
import yts from 'yt-search'
import { createCanvas, loadImage } from 'canvas'

let handler = async (m, { conn: star, command, args, text, usedPrefix }) => {
  if (!text) return m.reply(deco + ' Ingresa el título de un video o canción de *YouTube*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Mc Davo - Debes De Saber`)
    await m.react('🕓')
    try {
    let res = await search(args.join(" "))
    const resImg = await fetch(res[0].image)
  const img = await loadImage(Buffer.from(await resImg.arrayBuffer()))

  const canvas = createCanvas(800, 400)
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, '#121212')
  gradient.addColorStop(1, '#1f1f1f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(img, 40, 80, 240, 240)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 32px Sans'
  const lines = []
  const words = res[0].title.split(' ')
  let line = ''
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > 400 && i > 0) {
      lines.push(line)
      line = words[i] + ' '
    } else {
      line = testLine
    }
  }
  lines.push(line)
  lines.forEach((l, i) => {
    ctx.fillText(l.trim(), 310, 150 + i * 35)
  })

  ctx.fillStyle = '#b3b3b3'
  ctx.font = '24px Sans'
  ctx.fillText(res[0].author.name || 'Desconocido', 310, 240)
  ctx.fillText(secondString(res[0].duration.seconds), 310, 270)

  ctx.fillStyle = '#555'
  ctx.fillRect(310, 300, 400, 6)

  ctx.fillStyle = '#1db954'
  ctx.fillRect(310, 300, 150, 6)

  const buffer = canvas.toBuffer('image/png')
    let img2 = await (await fetch(`${res[0].image}`)).buffer()
    let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
       txt += `\t\t*» Título* : ${res[0].title}\n`
       txt += `\t\t*» Duración* : ${secondString(res[0].duration.seconds)}\n`
       txt += `\t\t*» Publicado* : ${eYear(res[0].ago)}\n`
       txt += `\t\t*» Canal* : ${res[0].author.name || 'Desconocido'}\n`
       txt += `\t\t*» ID* : ${res[0].videoId}\n`
       txt += `\t\t*» Url* : ${'https://youtu.be/' + res[0].videoId}\n\n`
       txt += `> *-* Para descargar responde a este mensaje con *Video* o *Audio*.`
await star.sendFile(m.chat, buffer || img2, 'thumbnail.jpg', txt, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['play *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['play']
handler.register = true 
export default handler

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}

function MilesNumber(number) {
  let exp = /(\d)(?=(\d{3})+(?!\d))/g
  let rep = "$1."
  let arr = number.toString().split(".")
  arr[0] = arr[0].replace(exp, rep)
  return arr[1] ? arr.join(".") : arr[0]
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' Día, ' : ' Días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' Hora, ' : ' Horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minuto, ' : ' Minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' Segundo' : ' Segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function sNum(num) {
    return new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
    return txt
}