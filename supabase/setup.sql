-- გაუშვი Supabase → SQL Editor-ში (ერთხელ)

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  cat text not null check (cat in ('web','brand','media')),
  year int not null default extract(year from now())::int,
  tags text[] not null default '{}',
  title_ka text not null default '',
  title_en text not null default '',
  goal_ka text not null default '',
  goal_en text not null default '',
  work_ka text[] not null default '{}',
  work_en text[] not null default '{}',
  image_url text,
  link_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;

drop policy if exists "public read" on public.portfolio_items;
create policy "public read" on public.portfolio_items for select using (true);

drop policy if exists "admin write" on public.portfolio_items;
create policy "admin write" on public.portfolio_items for all to authenticated using (true) with check (true);

-- ფოტოების bucket
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects for select using (bucket_id = 'portfolio');

drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio');

drop policy if exists "admin update images" on storage.objects;
create policy "admin update images" on storage.objects for update to authenticated using (bucket_id = 'portfolio');

drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id = 'portfolio');

-- არსებული 6 ნიმუში პროექტი (შეგიძლია admin-იდან წაშალო/შეცვალო)
insert into public.portfolio_items (cat, year, tags, title_ka, title_en, goal_ka, goal_en, work_ka, work_en, sort_order) values
('web',2026,'{React,Vite,Tailwind,SEO}','Aurora Dental — კორპორატიული საიტი','Aurora Dental — corporate website','ონლაინ ჩაწერის გაზრდა და კლინიკის სანდო იმიჯი.','Increase online bookings and build trust in the clinic.','{"UI/UX დიზაინი","დეველოპმენტი","ფოტოგადაღება"}','{"UI/UX design","Development","Photography"}',60),
('web',2025,'{E-commerce,TypeScript,Payments}','Kolkhida Market — ონლაინ მაღაზია','Kolkhida Market — online store','ადგილობრივი პროდუქციის გაყიდვა მთელი ქვეყნის მასშტაბით.','Sell local products nationwide.','{"E-commerce დეველოპმენტი","გადახდის ინტეგრაცია","სიჩქარის ოპტიმიზაცია"}','{"E-commerce development","Payment integration","Performance optimization"}',50),
('brand',2026,'{Logo,Brandbook,Packaging}','Mtkvari Coffee — ბრენდინგი','Mtkvari Coffee — branding','ახალი ყავის ბრენდის იდენტობა და შეფუთვა.','Identity and packaging for a new coffee brand.','{"ლოგო","ბრენდბუქი","შეფუთვის დიზაინი"}','{"Logo","Brandbook","Packaging design"}',40),
('media',2025,'{Video,Drone,"Color grading"}','Vake Residence — პრომო ვიდეო','Vake Residence — promo video','საცხოვრებელი კომპლექსის პრეზენტაცია გაყიდვებისთვის.','Present a residential complex for sales.','{"სცენარი","გადაღება და დრონი","მონტაჟი"}','{"Script","Filming and drone","Editing"}',30),
('web',2026,'{React,Dashboard,API}','Nodes Logistics — ვებ-აპლიკაცია','Nodes Logistics — web app','გზავნილების თვალყურის დევნება და მართვა ერთ პანელში.','Track and manage shipments in a single dashboard.','{"UI/UX","React დეველოპმენტი","API ინტეგრაცია"}','{"UI/UX","React development","API integration"}',20),
('brand',2025,'{Brandbook,Photo,Social}','Sapere Studio — ბრენდბუქი და ფოტო','Sapere Studio — brandbook & photo','ერთიანი ვიზუალური ენა ციფრული და ბეჭდური არხებისთვის.','One visual language across digital and print.','{"ბრენდბუქი","ფოტოგადაღება","სოც. ქსელების შაბლონები"}','{"Brandbook","Photography","Social media templates"}',10);
