import { useState } from "react";
import { supabase } from "../lib/supabase";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase!.auth.signInWithPassword({
      email,
      password: pw,
    });
    if (error) setErr("არასწორი ელ-ფოსტა ან პაროლი");
    setBusy(false);
  };
  // return to the admin page if already logged in
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <form onSubmit={submit} className="glass w-full max-w-sm space-y-4 p-8">
        <h1 className="text-2xl font-bold">ადმინისტრატორი</h1>
        <input
          className="input"
          type="email"
          placeholder="ელ-ფოსტა"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="პაროლი"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? "…" : "შესვლა"}
        </button>
      </form>
    </div>
  );
}
