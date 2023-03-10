import { tiktokdl, tiktokdlv2, tiktokdlv3 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Input URL! contoh : ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`

  const { author: { nickname }, video, description } = await tiktokdl(args[0])
        .catch(async _ => await tiktokdlv2(args[0]))
        .catch(async _ => await tiktokdlv3(args[0]))
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
    if (!url) throw 'Can\'t download video!'
    conn.sendHydrated(m.chat, `β·${htki} π½ππ πΊππ ${htka}β`, `β Ι΄Ιͺα΄α΄Ι΄α΄α΄α΄ : ${nickname}${description ? `\nβ α΄α΄sα΄ΚΙͺα΄α΄Ιͺα΄Ι΄ : \n${description}` : ''}`, await (await fetch(url)).buffer(),
        url, 'π s α΄ α΄ Κ α΄ α΄', null, null, [
        ['α΄α΄Ι΄α΄κ±Ιͺ', `.donasi`],
        ['α΄α΄α΄Ιͺα΄', `.tiktokaudio ${args}`],
        [null, null]], m)
}
handler.help = ['tiktok', 'tiktokdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tik(tok)?(tok)?(dl)?)$/i

export default handler
