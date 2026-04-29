export default async function handler(req, res) {
    const serverIp = process.env.MC_SERVER_IP; 
    
    try {
        // Switching to v3 (better fallback for Playit tunnels)
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverIp}`);
        const data = await response.json();
        
        // Ensure Vercel doesn't cache the "Offline" state too long
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch server status" });
    }
}