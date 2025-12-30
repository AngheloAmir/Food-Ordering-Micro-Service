import open from 'open';

const ports = [5199, 5200, 5201, 5202, 5203, 5204, 5205, 5206, 5207];

console.log('Opening browser tabs for all services...');

for (const port of ports) {
    try {
        await open(`http://localhost:${port}`);
        console.log(`Opened http://localhost:${port}`);
    } catch (err) {
        console.error(`Failed to open http://localhost:${port}:`, err);
    }
}
