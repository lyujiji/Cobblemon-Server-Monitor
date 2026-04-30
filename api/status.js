import net from 'net';

export default async function handler(req, res) {
    const serverIp = process.env.MC_SERVER_IP;
    // We use 2153 because that is your Playit tunnel port
    const port = 2153; 

    // Create a promise to handle the socket connection
    const checkServer = () => {
        return new Promise((resolve) => {
            const socket = new net.Socket();
            
            // Set a 3-second timeout so the site doesn't hang
            socket.setTimeout(3000);

            socket.on('connect', () => {
                socket.destroy();
                resolve({ online: true });
            });

            socket.on('timeout', () => {
                socket.destroy();
                resolve({ online: false, error: 'Timeout' });
            });

            socket.on('error', () => {
                socket.destroy();
                resolve({ online: false, error: 'Connection Refused' });
            });

            socket.connect(port, serverIp);
        });
    };

    const status = await checkServer();

    // Disable caching so you see the status change instantly
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).json(status);
}