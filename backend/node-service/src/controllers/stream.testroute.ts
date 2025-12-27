import { Request, Response } from 'express';

export default async function picoXYZStreamHandler(req : Request, res : Response) {
    try {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const content = "" +
`
Whispers of Dawn

The morning hums a gentle tune,
As sunlight spills across the silver lake.
Every ripple dances with a fleeting grace,
Awakening the world from its quiet slumber.

Breezes carry secrets through the trees,
Rustling leaves like soft-spoken words.
Birds take flight with hearts unburdened,
Tracing arcs of freedom in the endless sky.

And in the hush between day and night,
Moments linger like a whispered prayer.
Time drifts softly, a candle’s flame,
`;
        const words   = content.split(' ');
        let i = 0;

        const interval = setInterval(() => {
            if (i < words.length) {
                res.write(words[i] + (i === words.length - 1 ? '' : ' '));
                i++;
            } else {
                clearInterval(interval);
                res.end();
            }
        }, 100);

    } catch (error) {
        console.error('Stream Error:', error);
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
        }
    }
}