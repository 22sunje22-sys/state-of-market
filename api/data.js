const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kwftlkfvtglnugxsyjci.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZnRsa2Z2dGdsbnVneHN5amNpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY0MDE4NSwiZXhwIjoyMDYzMjE2MTg1fQ.YIAjhOjctWouBNL8OI_Q3efawdVf7ikl-LvnFQGYHT4';

module.exports = async function handler(req, res) {
  const { date } = req.query;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'valid date required (YYYY-MM-DD)' });
  }

  const url = `${SUPABASE_URL}/rest/v1/ga4_market_daily?select=currency,category,revenue,transactions&report_date=eq.${date}`;

  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    }
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'upstream error' });
  }

  const data = await response.json();
  res.status(200).json(data);
};
