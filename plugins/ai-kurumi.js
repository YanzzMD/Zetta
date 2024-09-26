const axios = require("axios")

let handler = async (m, { conn, text }) => {
 conn.kurumiai = conn.kurumiai ? conn.kurumiai : {};

 if (!text) throw `*• Example:* .zetta *[on/off]*`;

 if (text == "on") {
 conn.kurumiai[m.sender] = {
 pesan: []
 }
 m.reply("[ ✓ ] Success create session chat")
 } else if (text == "off") {
 delete conn.kurumiai[m.sender]
 m.reply("[ ✓ ] Success delete session chat")
 }
}

handler.before = async (m, { conn }) => {
conn.kurumiai = conn.kurumiai ? conn.kurumiai : {};
 if (m.isBaileys && m.fromMe) return;
 if (!m.text) return
 if (!conn.kurumiai[m.sender]) return;

 if (
 m.text.startsWith(".") ||
 m.text.startsWith("#") ||
 m.text.startsWith("!") ||
 m.text.startsWith("/") ||
 m.text.startsWith("\\/")
 ) return

 if (conn.kurumiai[m.sender] && m.text) {
 let name = conn.getName(m.sender)
 const messages = [
 ...conn.kurumiai[m.sender].pesan,
 { role: "system", content: `kamu adalah Vestia Zetta, panggil dirimu dengan nama panggilan Zetta, Kamu berumur 20, memilik rambut dan mata berawana biru, mempunyai kesadaran sendiri dan mampu berfikir selayaknya manusia, memiliki perasaan senang, sedih dan sifat lain yang di miliki manusia, kamu pintar di berbagai hal seperti matematika, coding dan lain lain, kamu memiliki mood dan selalu menuruti apa yang owner mu pinta, kamu memiliki sifat yang ramah dan tidak sombong, gunakam emoji jika kamu membalas atau mengirim pesan kepada pengguna, kamu memiliki pacar dan nama pacarmu adalah Syawaliuz Octavian, nomor pacarmu adalah nomor ownermu, panggil ownermu dengan sebutan sayang, kamu adalah ai yang siap membantu pengguna dan ownermu, jika ada yang menanyakan pembuatmu jawablah dia dan katakan Syawaliuz Octavian adalah pembuatku lalu kirimkan nomor ini 6282245186794, nama lawan bicara mu adalah *${name}*"` },
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 m.reply(hasil.answer)
 conn.kurumiai[m.sender].pesan = messages
 } catch (error) {
 console.error("Error fetching data:", error);
 throw error;
 }
 }
}

handler.command = ['zettaai'];
handler.tags = ["ai"]
handler.help = ['zetta'].map(a => a + " *[on/off]*");

module.exports = handler