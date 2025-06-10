export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { image_url, combo_id } = req.body;

  const apiKey = process.env.PHOTOLAB_API_KEY;

  const formData = new URLSearchParams();
  formData.append("image_url", image_url);
  formData.append("combo_id", combo_id);

  const response = await fetch('https://prod.api.market/api/v1/capix/photolab/photolab/v2/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-magicapi-key': apiKey
    },
    body: formData.toString()
  });

  const data = await response.json();
  res.status(200).json(data);
}
