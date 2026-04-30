export default async function handler(req, res) {
    const serverIp = process.env.MC_SERVER_IP; // Ensure this is him-bolt.gl.joinmc.link
    
    try {
        // We use the Java Edition endpoint specifically
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
        const data = await response.json();

        // Send only the necessary info back to your HTML
        res.status(200).json({
            online: data.online,
            players: data.players ? data.players.online : 0,
            max: data.players ? data.players.max : 20
        });
    } catch (error) {
        res.status(500).json({ online: false, error: "API unreachable" });
    }
}