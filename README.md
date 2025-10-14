# Velvet Skills FullStack Aplikacija

Velvet Skills je full-stack aplikacija za upravljanje veštinama i kredencijalima. Frontend je razvijen u React-u (SPA), UI je minimalističan sa naglaskom na brzinu i jasnoću, a backend je Laravel REST API sa MySQL bazom. Aplikacija podržava uloge admin, moderator i korisnik, izvoz podataka u Excel.

---

## Tehnologije i arhitektura

Frontend: React 18, React Router, Chart lib (npr. react-chartjs-2 ili recharts), deljeni shared.css.

Backend: Laravel (REST API), Eloquent modeli (User, Skill, UserSkill, Credential), resursi i policy/middleware zaštita.

Baza: MySQL (relacije: korisnik–veštine M:N preko user_skills; korisnik–kredencijali 1:N; veština–kredencijal 1:N).

Autentikacija: Bearer token; token i osnovni profil čuvaju se u sessionStorage ili localStorage.

Export: Laravel + Maatwebsite/Excel za generisanje .xlsx (npr. exportSkills()).

---

## 



---



---




## Pokretanje projekta
---------------------------

1. Klonirajte repozitorijum:

2. Pokrenite backend:
```bash
   cd velvetskillsBE
   composer install
   php artisan migrate:fresh --seed
   php artisan serve
```
    
3. Pokrenite frontend:
```bash
   cd velvetskillsfe
   npm install
   npm start
```
    
4.  Frontend pokrenut na: [http://localhost:3000](http://localhost:3000) Backend API pokrenut na: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)