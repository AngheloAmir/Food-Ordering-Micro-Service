import { Request, Response } from 'express';

export default async function picoXYZStreamHandler(req : Request, res : Response) {
    try {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
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
        }, 50);

    } catch (error) {
        console.error('Stream Error:', error);
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
        }
    }
}