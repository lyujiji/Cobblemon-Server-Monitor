export default async function handler(req, res) {
    const serverIp = process.env.MC_SERVER_IP; 
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIp}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch server status" });
    }
}