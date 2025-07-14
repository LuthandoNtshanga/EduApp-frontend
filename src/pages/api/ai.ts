import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Return a static AI response
    return res.status(200).json({
      reply: "Hello, I&apos;m your learning assistant."
    });
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }
} 