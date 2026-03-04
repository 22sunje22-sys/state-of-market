export default async function handler(req, res) {
  const { date } = req.query;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'valid date required (YYYY-MM-DD)' });
  }

  const url = `${process.env.SUPABASE_URL}/rest/v1/ga4_market_daily?select=currency,category,revenue,transactions&report_date=eq.${date}`;

  const response = await fetch(url, {
    headers: {
      'apikey': process.env.SUPABASE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
    }
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'upstream error' });
  }

  const data = await response.json();
  res.status(200).json(data);
}
