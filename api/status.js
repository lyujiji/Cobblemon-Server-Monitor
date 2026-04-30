export default async function handler(req, res) {
    const serverIp = process.env.MC_SERVER_IP; // him-bolt.gl.joinmc.link
    
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
        const data = await response.json();

        // This keeps your frontend simple
        res.status(200).json({
            online: data.online,
            players: data.players?.online || 0,
            max: data.players?.max || 0
        });
    } catch (error) {
        res.status(500).json({ online: false });
    }
}