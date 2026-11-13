export const makeCode = () => `CLB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
export async function sendForm(data: Record<string, unknown>) {
  const key = import.meta.env.VITE_WEB3FORMS_KEY
  if (!key) throw new Error('VITE_WEB3FORMS_KEY is not set')
  const r = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: key, from_name: 'CodeLab Website', ...data }),
  })
  const j = await r.json()
  if (!j.success) throw new Error(j.message || 'error')
}
