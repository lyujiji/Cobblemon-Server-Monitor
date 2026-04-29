export default async function handler(req, res) {
    // We get the IP from Vercel's Environment Variables (set in Step 4)
    const serverIp = process.env.MC_SERVER_IP; 
    
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIp}`);
        const data = await response.json();
        
        // Send the data back to your website
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch server status" });
    }
}