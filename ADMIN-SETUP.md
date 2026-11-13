# Admin პანელის გააქტიურება (ერთჯერადი, ~5 წთ)

1. https://supabase.com → უფასო ანგარიში → **New project**.
2. **SQL Editor** → ჩააკოპირე `supabase/setup.sql`-ის შიგთავსი → **Run**.
   (ქმნის ცხრილს, ფოტოების საცავს და გადააქვს ახლანდელი 6 პროექტი.)
3. **Authentication → Users → Add user** → შეიყვანე შენი ელ-ფოსტა და პაროლი (Auto Confirm ✔).
   **Authentication → Sign In / Providers → Allow new users to sign up** გამორთე, რომ სხვას ვერავინ შექმნას ანგარიში.
4. **Project Settings → API** → დააკოპირე `Project URL` და `anon public` key.
5. Vercel → Project → Settings → Environment Variables:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon key
   შემდეგ **Redeploy**.
   (ლოკალურად: `.env` ფაილში იგივე ორი ცვლადი.)
6. გახსენი `https://codelab.ge/admin` და შედი.
