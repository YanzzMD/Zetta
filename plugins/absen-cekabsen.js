
let handler = async (m, { conn, prefix,usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) await conn.reply(m.chat, `_*Tidak ada absen berlangsung digrup ini!*_\n\n*${prefix}mulaiabsen* - untuk memulai absen`, m)
            
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `nih ${i + 1}.  @${v.split`@`[0]}`).join('\n')
            let caption = `* TANGGAL *\n${date}
${conn.absen[id][2]}

* SUDAH ABSEN *
*Total:* ${absen.length}


`

await conn.reply(m.chat, caption, m, { mentions: conn.parseMention(caption) })

}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i
handler.group = true
module.exports = handler;
