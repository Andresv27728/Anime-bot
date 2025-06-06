import axios from 'axios';
import * as cheerio from 'cheerio';

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } })
    if (!text) return m.reply(' *[ ! ]* Primero ingresa el Link/Consulta ')
    return new Promise(async (revolse) => {
        if (/open\.spotify\.com/.test(text)) {
            if (!/open\.spotify\.com/.test(text)) return m.reply("⚠️ ¡El enlace no es de Spotify!");
            await downloaderSpotify(text).then(async (a) => {
                const caption = `
╭───────────────────────────────╮
│  🔥 WAGURI SPOTIFY DOWNLOADER  │
├───────────────────────────────┤
│ 🎵 ${a.metadata.name || ''}               
│ 🎤 ${a.metadata.artists.map((artist) => artist.name).join(" & ") || ''}          
│ 💿 ${a.metadata.album.name || ''} 
│ 🔗 ${a.metadata.external_urls.spotify || ''} 
├───────────────────────────────┤
│ 🗡️ (•̀ᴗ•́)و ︻デ═一            
│ 📥 Descargando...              
│ 💽 Formato: MP3               
╰───────────────────────────────╯
"No está mal... para la música humana." - Waguri Ai`;
                await conn.sendMessage(m.chat, {
                    text: caption
                }, {
                    quoted: m
                })
                await conn.sendMessage(m.chat, { react: { text: '😆', key: m.key } })
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: a.download
                    },
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })
            }).catch((err) => {
                m.reply(' *[ ! ]* Lo sentimos, error, quizás tengas demasiadas solicitudes');
                console.log('msg:', err);
            });
        } else {
            await spsearch(text).then(async (search) => {
                const randomFive = search.sort(() => Math.random() - 0.5).slice(0, 5);

                const listMessage = {
                    title: 'Seleccionar canción',
                    sections: [{
                        title: 'Busqueda de Spotify',
                        rows: randomFive.map((a, i) => ({
                            title: `[ ${i + 1} ]. ${a.title}`,
                            description: `${a.duration} / ${a.artist}`,
                            id: `${usedPrefix + command} ${a.url}`
                        }))
                    }]
                };

                const messageText = `
╭────────────────────────────╮
│ 🔥 WAGURI SPOTIFY PICKS     │
├────────────────────────────┤
│ Seleccione una canción de los resultados aleatorios:
│
${randomFive.map((a, i) => `│ ${i + 1}. ${a.title} - ${a.artist}`).join('\n')}
╰────────────────────────────╯
Responda con el número (1-5).`;

                await conn.sendMessage(m.chat, { react: { text: '😆', key: m.key } })
                await conn.sendMessage(m.chat, {
                    text: messageText,
                    buttons: [{
                        buttonId: 'action',
                        buttonText: {
                            displayText: 'Este es un mensaje interactiveMeta'
                        },
                        type: 4,
                        nativeFlowInfo: {
                            name: "single_select",
                            paramsJson: JSON.stringify(listMessage),
                        },
                    }],
                    headerType: 1,
                    viewOnce: true
                }, {
                    quoted: m
                });
            }).catch((err) => {
                m.reply(' *[ ! ]* Lo sentimos, error, quizás tengas demasiadas solicitudes');
                console.log('msg:', err);
            });
        };
    });
};

async function spotifyCreds() {
    try {
        const response = await axios.post(
            TOKEN_ENDPOINT,
            "grant_type=client_credentials", {
                headers: {
                    Authorization: "Basic " + basic
                },
            },
        );
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        return {
            status: false,
            msg: "Failed to retrieve Spotify credentials."
        };
    }
}

const toTime = (ms) => {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
};

async function spsearch(query, type = "track", limit = 20) {
    try {
        const creds = await spotifyCreds();
        if (!creds.status) return creds;

        const response = await axios.get(
            `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=${type}&offset=0&limit=${limit}`, {
                headers: {
                    Authorization: "Bearer " + creds.data.access_token
                },
            },
        );

        if (
            !response.data[type + "s"] ||
            !response.data[type + "s"].items.length
        ) {
            return {
                msg: "Music not found!"
            };
        }

        return response.data[type + "s"].items.map((item) => ({
            title: item.name,
            id: item.id,
            duration: toTime(item.duration_ms),
            artist: item.artists.map((artist) => artist.name).join(" & "),
            url: item.external_urls.spotify,
        }));
    } catch (error) {
        return {
            status: false,
            msg: "Error searching for music. " + error.message,
        };
    }
};

async function downloaderSpotify(spotifyUrl) {
    try {
        // Step 1: Visit homepage to get cookie and token
        const homeRes = await axios.get('https://spotmate.online/en', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
            },
        });

        const setCookieHeader = homeRes.headers['set-cookie'];
        if (!setCookieHeader) throw new Error('Cookie tidak ditemukan.');

        const cookie = setCookieHeader.map(c => c.split(';')[0]).join('; ');
        const $ = cheerio.load(homeRes.data);
        const token = $('meta[name="csrf-token"]').attr('content');
        if (!token) throw new Error('Token CSRF tidak ditemukan.');

        const headers = {
            'authority': 'spotmate.online',
            'accept': '*/*',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'cookie': cookie,
            'origin': 'https://spotmate.online',
            'referer': 'https://spotmate.online/en',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
            'x-csrf-token': token,
        };

        // Step 2: Get track info (optional, useful for debug or metadata)
        const infoRes = await axios.post(
            'https://spotmate.online/getTrackData', {
                spotify_url: spotifyUrl
            }, {
                headers
            }
        );

        // Step 3: Convert Spotify URL
        const convertRes = await axios.post(
            'https://spotmate.online/convert', {
                urls: spotifyUrl
            }, {
                headers
            }
        );

        // Combine info and result (optional)
        return {
            metadata: infoRes.data,
            download: convertRes.data.url,
        };

    } catch (err) {
        throw new Error(`Gagal memproses Spotify URL: ${err.message}`);
    }
}

handler.help = ['splay', 'spotifyplay', 'playspotify'].map(v => v + ' *<consulta/link>* ');
handler.tags = ['downloader'];
handler.command = /^(spotifyplay|playspotify|splay)$/i;

export default handler;