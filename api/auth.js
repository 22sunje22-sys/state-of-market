export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).end(); }
  }

  const { password } = body || {};
  const ok = typeof password === 'string' && password === process.env.DASHBOARD_PASSWORD;
  res.status(200).json({ ok });
}
