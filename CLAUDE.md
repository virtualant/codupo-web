# CODUPO Compliance, novi web

Dokumentacija projekta: što je napravljeno, kojih se pravila držimo i što treba napraviti za preostale stranice.

**Status (4. 11. 2026.):** gotove su naslovna stranica (`index.html`) i Rješenja (`rjesenja.html`). Ostale stranice radimo tek kad vlasnik projekta da dopuštenje, jednu po jednu ili u dogovorenim skupinama.

GitHub: https://github.com/virtualant/codupo-web (remote `origin`). Remote `jure006` pokazuje na https://github.com/jure006/codupo-web i za sada je prazan.

---

## 1. O tvrtki i publici

CODUPO Compliance (CODUPO d.o.o., Zagreb) savjetuje i educira organizacije u području usklađenosti, etike, integriteta i antikorupcije.

Slogan: *CODUPO Compliance promiče izvrsnost u poslovanju i pomaže organizacijama uspostaviti visoke standarde poslovanja.*

Publika su organizacije: uprave, compliance officeri, pravni odjeli, HR, interna revizija, državna poduzeća i javni sektor.

### Usluge

1. Implementacija i dizajn compliance programa
2. Izrada GAP analize i evaluacija compliance programa
3. Eksternalizirana funkcija usklađenosti
4. Eksternalizirana funkcija povjerljive osobe
5. Integrity Line
6. Izrada etičkog kodeksa
7. Izgradnja compliance kulture (Integrity Culture)
8. Compliance mentoring & coaching

### Kontakt podaci (sa starog weba)

- CODUPO d.o.o., Kutnjački put 15, HR-10000 Zagreb
- +385 1 3862 961, info@codupo.hr
- OIB 39562727688, MBS 080723230
- LinkedIn: https://www.linkedin.com/company/codupo

Sadržaj se preuzima sa https://codupo.hr/. Ne izmišljamo činjenice, brojke, cijene ni datume. Ako podatak nedostaje, pitamo vlasnika ili ga ostavljamo kao otvoreno pitanje (vidi poglavlje 7).

---

## 2. Pravila izrade (obavezna)

Ova pravila zadao je vlasnik projekta i vrijede za svaku stranicu.

### Raspored i CSS

- **Samo flexbox** za raspored. Bez CSS grida.
- **Bez `position: absolute` i `position: fixed`.** Jedina iznimka je sticky navigacija (`site-header` ima `position: sticky`).
- **Sve vrijednosti iz `:root`.** Svaka boja, font, veličina fonta i razmak definira se jednom kao custom property u `:root` i koristi kroz `var()`. Nigdje nema tvrdo upisane boje ni veličine.
  - Iznimka: brojevi breakpointa u `@media` (1024px i 640px), jer media upiti ne mogu čitati custom properties.
- **Nazivi fontova u navodnicima** (`"Barlow"`). Generički `sans-serif` ostaje bez navodnika, jer bi ga navodnici pretvorili u ime fonta i fallback ne bi radio.
- **Jedna kratka opisna klasa po vizualnom uzorku** (`card-service`, `button-primary`) koja se ponovno koristi svaki put. Bez gomila utility klasa.
- **Naslov se ne stilizira djelomično.** Ako dio teksta treba drugu boju, to je zaseban element.
- **Bez vidljivih pseudo-elemenata** (`::before`, `::after`). Točke, oznake i ukrasi su pravi elementi.
- **Header i footer postoje samo jednom**, kao komponente u `js/components.js`. Sadržaj stranice počinje ispod navigacije i završava iznad footera.

### Slike

- Koristimo fotografije i logo iz `assets-src/` i **zadržavamo izvorne nazive datoteka**. Slika koju stranica koristi kopira se u `images/`.
- Artlist (konektor za generiranje slika) smijemo koristiti samo uz dogovor, jer troši kredite. Fotografije vlasnika služe kao stilska referenca, a generirane slike mijenjaju loše snimke s mobitela. Bez Artlista ne izmišljamo druge slike.
- Shutterstock fotografije u `assets-src/` imaju licencu za stari web. Prije korištenja na novom webu treba potvrditi da licenca to dopušta.

### Obrasci

- Svaki obrazac (kontakt, prijava na edukaciju, newsletter) je **samo vizualni mockup**: bez logike slanja, `type="button"` umjesto submit, i jasno označen klasom `.mockup-tag` (npr. „Mockup obrasca, ne šalje podatke”).

### Prikazi

- Svaka stranica se dizajnira i prikazuje za **desktop (1440), tablet (820) i mobitel (390)**.
- Mobitel se slaže namjerno, ne samo „sve jedno ispod drugoga”: horizontalni scroll-snap redovi za kartice, kraći tekst, gumbi preko cijele širine.

### Pisanje teksta

- Hrvatski jezik, kao da piše čovjek: kratko i konkretno.
- **Bez em crtica (—)** bilo gdje, ni u tekstu ni u kodu ni u dokumentaciji. Za raspone koristimo „do” ili običnu crticu.
- Bez lorem ipsuma i placeholder teksta.
- Izbjegavamo floskule tipa „unlock”, „elevate”, „seamless”, „in today's fast-paced world”, „nije samo X, nego Y”, i njihove hrvatske ekvivalente („otključajte”, „podignite na višu razinu”, „besprijekorno”, „u današnjem užurbanom svijetu”).

### Smjer dizajna

Poslovni stil, inspiriran stranicom pecb.com te Themeforest kitovima Probiz i Primoire. Primjeri kitova su iza Cloudflare zaštite pa nisu pregledani, a raspored prati PECB i uobičajene uzorke konzultantskih predložaka.

---

## 3. Tehnička struktura

```
index.html            naslovna stranica
css/styles.css        svi stilovi, tokeni u :root
js/components.js      <site-header> i <site-footer> (Custom Elements)
images/               slike koje stranica koristi (izvorni nazivi)
assets-src/           izvorni WordPress uploads 2020 do 2026 (1595 datoteka)
screens/              snimke zaslona: <stranica>-desktop/-tablet/-mobile.png
preview/frame.html    pomoćna stranica za snimku mobitela (iframe zadane širine)
.claude/launch.json   lokalni server "codupo-static" na portu 5510
```

Bez build koraka: čisti HTML, CSS i JS.

### Komponente

- `<site-header active="kljuc">`: topbar (adresa, telefon, e-mail, LinkedIn, HR | EN) i navigacija s logom. Ključevi za `active`: `home`, `rjesenja`, `edukacije`, `savjetovanje`, `konferencija`, `blog`, `o-nama`. Gumb „Kontakt” vodi na `kontakt.html`.
  - Na tabletu i mobitelu izbornik se skriva iza gumba `.nav-toggle` i otvara u normalnom toku stranice (klasa `.is-open`), bez apsolutnog pozicioniranja.
- `<site-footer>`: logo, kratki opis, newsletter mockup, stupci Rješenja / CODUPO / Kontakt, donja traka s godinom i pravnim poveznicama.
- Novu stavku navigacije dodajemo samo u `NAV_ITEMS` u `js/components.js`.

### Kostur svake stranice

```html
<!doctype html>
<html lang="hr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Naslov stranice | CODUPO Compliance</title>
  <link rel="icon" href="images/CODUPO-icon.png">
  <!-- Google Fonts: Barlow + Barlow Semi Condensed, isto kao index.html -->
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/components.js" defer></script>
</head>
<body>
  <site-header active="kljuc"></site-header>
  <main>
    ...sekcije...
  </main>
  <site-footer></site-footer>
</body>
</html>
```

### Dizajn tokeni (`:root` u `css/styles.css`)

- **Boje** (uzorkovane s loga):
  - `--c-teal` #308681 (glavna boja), `--c-teal-dark`, `--c-teal-tint`
  - `--c-charcoal` #2B2A29, `--c-ink` #0D2928 (tamne pozadine), `--c-ink-soft`
  - `--c-gold` #C9A227 (naglasak)
  - `--c-text`, `--c-muted`, `--c-line`, `--c-bg`, `--c-bg-soft`, `--c-white`, `--c-white-10/20/60/80`
  - `--c-overlay-start/end`, `--c-shadow`, `--c-shadow-strong`
- **Fontovi:** `--f-head` "Barlow Semi Condensed" (naslovi), `--f-body` "Barlow" (tekst).
- **Veličine fonta:** `--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl`, `--fs-2xl`, `--fs-stat`, `--fs-hero`. Težine `--fw-*`, prored `--lh-*`, razmak slova `--ls-*`.
- **Razmaci:** `--sp-0` do `--sp-11`, plus `--section-y`, `--hero-y`, `--gutter`.
- **Raspored:** `--container` (76rem), `--split-media-basis`, `--split-content-basis`, `--card-basis`, `--card-scroll-w`, `--media-h`, `--media-tall-h`, `--portrait-h` i ostali `*-basis`, `*-h`, `*-w` tokeni.
- **Ostalo:** `--radius*`, `--border*`, `--icon-*`, `--z-header`, `--t-fast`, `--zero`, `--full`, `--half`, `--viewport-h`.
- Media upiti za tablet (≤1024px) i mobitel (≤640px) **redefiniraju tokene u `:root`**, a pravila za raspored mijenjaju se samo gdje je potrebno.

### Postojeći uzorci (klase za ponovnu upotrebu)

Prije nove klase provjeri postoji li već uzorak:

| Uzorak | Klase |
|---|---|
| Sekcije i naslovi | `.section`, `.section-soft`, `.section-head`, `.section-head-center`, `.section-head-row`, `.section-title`, `.section-title-light`, `.section-lead`, `.eyebrow`, `.eyebrow-light`, `.eyebrow-mark`, `.body-text`, `.text-light` |
| Gumbi i poveznice | `.button-primary`, `.button-outline`, `.button-ghost`, `.button-light`, `.button-row`, `.link-arrow`, `.link-arrow-mark` |
| Dvostupčani raspored | `.split`, `.split-media`, `.split-content`, `.split-start`, `.split-top`, `.media-photo`, `.media-tall`, `.media-portrait` |
| Kartice | `.card-row`, `.card-row-scroll`, `.card-solution`, `.card-step`, `.card-event`, `.card-value`, `.card-post`, `.card-label`, `.card-title`, `.card-text`, `.card-kicker`, `.icon-tile` |
| Brojke | `.stat-row`, `.stat-row-light`, `.stat-item`, `.stat-number`, `.stat-label` |
| Usluge | `.service-list`, `.service-item`, `.service-num`, `.service-title`, `.service-text` |
| Edukacije | `.event-list`, `.card-event`, `.event-date`, `.event-day`, `.event-month`, `.event-tag`, `.event-title`, `.event-meta`, `.meta-list`, `.meta-item`, `.meta-dot`, `.price` |
| Oznake | `.tag-row`, `.tag`, `.chip-row`, `.chip` |
| Ostalo | `.hero`, `.hero-card`, `.proof`, `.note-box`, `.inhouse-card`, `.conference`, `.book-row`, `.cta-band`, `.mockup-tag`, `.field-input` |
| Podstranice | `.page-hero`, `.breadcrumb`, `.tool-visual`, `.compare-table`, `.compare-row`, `.page-hero-rjesenja` (primjer stranici specifičnog modifikatora za `.page-hero` s Artlist pozadinom) |

### Pregled i snimke zaslona

- Lokalni server: `python3 -m http.server 5510` (konfiguracija `codupo-static`), stranica na http://localhost:5510. Na ovom računalu `preview_start` iz Browser pane alata ne može pokrenuti Python (sandbox nema pravo na `os.getcwd()`), pa se server pokreće izravno u pozadini preko Bash alata, a preglednik se onda otvara na `http://localhost:5510/<stranica>.html`.
- Desktop, tablet i mobitel: headless Google Chrome (`--headless --window-size=<širina>,<visina> --screenshot=screens/<stranica>-<veličina>.png`), jer msedge na ovom Macu nije dostupan. Chrome ide i ispod 500px širine, pa `preview/frame.html` više nije potreban za mobilne snimke, no datoteka ostaje u repozitoriju za slučaj da zatreba.
- `min-height: 100vh` ostavlja bijeli pojas na dugim snimkama ako je stranica kraća od `--window-size` visine; visinu prozora postavljamo na stvarni `document.documentElement.scrollHeight` (izmjeren u Browser pane alatu) pa se pojas ne pojavljuje.
- Snimke idu u `screens/` kao `<stranica>-desktop.png`, `<stranica>-tablet.png`, `<stranica>-mobile.png`.

### Provjera prije predaje

- `grep` po `display: grid`, `position: absolute|fixed`, `::before|::after`, `—` (em crtica), `style=` (inline stilovi): rezultat mora biti prazan.
- Nema hex boja ni `px`/`rem` vrijednosti izvan `:root` (osim breakpointa).
- Na 390px nema horizontalnog scrolla (`document.documentElement.scrollWidth === 390`).
- Izbornik se otvara i zatvara na mobitelu, a u konzoli nema grešaka.

---

## 4. Mapa stranica

| Stranica | Datoteka | `active` | Status |
|---|---|---|---|
| Naslovna | `index.html` | `home` | **Gotovo** |
| Rješenja | `rjesenja.html` | `rjesenja` | **Gotovo** |
| IntegrityUP | `integrityup.html` | `rjesenja` | Čeka dopuštenje |
| ComplianceUP | `complianceup.html` | `rjesenja` | Čeka dopuštenje |
| VoiceUP | `voiceup.html` | `rjesenja` | Čeka dopuštenje |
| Edukacije | `edukacije.html` | `edukacije` | Čeka dopuštenje |
| Savjetovanje | `savjetovanje.html` | `savjetovanje` | Čeka dopuštenje |
| Konferencija | `konferencija.html` | `konferencija` | Čeka dopuštenje |
| Prethodne konferencije | `prethodne-konferencije.html` | `konferencija` | Čeka dopuštenje |
| Blog i novosti | `blog.html` | `blog` | Čeka dopuštenje |
| Članak (predložak) | `clanak.html` | `blog` | Čeka dopuštenje |
| O nama | `o-nama.html` | `o-nama` | Čeka dopuštenje |
| Kontakt | `kontakt.html` | (nijedan, gumb Kontakt) | Čeka dopuštenje |

Napomena: naslovna i footer trenutno vode na sidra `rjesenja.html#integrityup`, `#complianceup`, `#voiceup`, `#integrityline` i na `konferencija.html#prethodne`. Kad nastanu podstranice, te poveznice treba prebaciti na nove datoteke (ili zadržati sidra na pregledu i iz njih voditi dalje).

---

## 5. Naslovna stranica (gotovo)

Datoteka `index.html`, snimke `screens/home-desktop.png`, `home-tablet.png`, `home-mobile.png`.

Sekcije redom:

1. **Hero** (`.hero`)
   - Pozadina: fotografija s konferencije 2025 (`Compliance-konferencija-2025_RG-60-scaled.jpg`) s tamnim prijelazom.
   - Nadnaslov „Compliance & Ethics · Zagreb”, H1 „Usklađenost koju vaši ljudi razumiju i primjenjuju”, uvodni tekst.
   - Gumbi: „Dogovorite uvodni razgovor” (kontakt) i „Kalendar edukacija”.
   - Kartica „Sljedeća edukacija”: ISO 37301 Lead Implementer, 9. do 12. studenoga 2026., online 09:00 do 15:00 h, četiri dana nastave uživo, 1.150 € + PDV, gumb „Prijava”.
2. **Dokazi** (`.proof`): PECB značka („PECB Authorized Silver Partner, četvrtu godinu zaredom”, `PECB-approval-2022.png`) i brojke 9+ zemalja, 2050+ polaznika, 185+ programa, 25+ godina iskustva.
3. **Rješenja**: „Četiri alata za svakodnevni compliance”. Četiri `.card-solution` (IntegrityUP, ComplianceUP, VoiceUP, IntegrityLine) s ikonom, oznakom, naslovom, tekstom i poveznicom.
4. **Savjetovanje** (`.section-soft`): „Od prve analize do funkcije koja radi”.
   - Lijevo: slika `Eksternalizirana-funkcija.png` i `.note-box` o Pravilniku za državna poduzeća koji vrijedi od 18. kolovoza 2026.
   - Desno: osam usluga (01 do 08), oznake ISO 37301 / 37001 / 37002 / 37000 / 31000, gumb „Sve usluge savjetovanja”.
5. **Kako radimo**: „Četiri koraka, jasni rokovi”. Razgovor i analiza, Plan i dizajn, Uvođenje i edukacija, Praćenje i poboljšanje.
6. **Edukacije** (`.section-soft`): „Otvorene edukacije i programi za organizacije”, poveznica „Cijeli kalendar”.
   - Četiri termina:

     | Datum | Edukacija | Cijena |
     |---|---|---|
     | 9. do 12. 11. 2026. | ISO 37301 Lead Implementer | 1.150 € |
     | 27. 11. 2026. | Novi regulatorni okvir za državna poduzeća | 265 € |
     | 30. 11. do 3. 12. 2026. | ISO 31000 Lead Risk Manager | 1.150 € |
     | 4. 12. 2026. | Funkcija usklađenosti u državnim poduzećima | 265 € |

   - Kartica in-house radionica @Work (`sto-je-posao-CO.png`) s gumbom „Zatražite ponudu”.
7. **Konferencija** (tamna, `.conference`): „Najveće regionalno okupljanje compliance struke”.
   - Konferencija 29. 9. 2026., tema „Novi standardi i nove odgovornosti”, 290 sudionika iz 14 zemalja. Govornici iz OECD-a, UNODC-a, UN Global Compacta i LEGO-a.
   - Brojke 290 / 14 / 3 / 8 (sudionika, zemalja, pozornice, kategorije nagrada).
   - Gumbi „Program i predavači” i „Prethodne konferencije”.
8. **O nama**: „Bavimo se samo usklađenošću i integritetom”.
   - Portret i biografija Silvije Vig (`SilvijaVig202211-scaled.jpg`): CCEP-I, LPEC, PECB Gold Trainer za ISO 37301, predsjednica Etičkog povjerenstva INA Grupe.
   - Spomen Ljiljane Hrastinski Jurčec.
   - Vrijednosti Integritet, Inovativnost, Izvrsnost.
   - Knjiga „Poslovna etika” (VERN i CODUPO, `PoslovnaEtika2023-3D.png`), gumb „Više o nama”.
9. **Blog** (`.section-soft`): „Stručni članci i aktualnosti”. Tri članka: Pravilnik (18. 8. 2026.), EU Direktiva (11. 5. 2026.), KPI/KRI (21. 1. 2026.).
10. **CTA traka** (`.cta-band`): „Recite nam gdje ste danas”, gumbi „Dogovorite razgovor” i broj telefona.

Prilagodba:

- **Tablet:** izbornik iza gumba, hero u jednom stupcu, slike iznad teksta, kartice dvije po dvije.
- **Mobitel:** u topbaru ostaju samo telefon i jezik, a gumbi idu preko cijele širine.
  - Brojke su 2 × 2.
  - Rješenja i blog su horizontalni scroll redovi, a koraci kratka okomita lista.
  - Termin edukacije ima datum i naslov u retku i gumb „Prijava” ispod.

Otvoreno na naslovnoj: tekst kartica IntegrityUP, ComplianceUP, VoiceUP i IntegrityLine napisan je bez izvora na starom webu i treba ga potvrditi vlasnik.

---

## 6. Plan za preostale stranice

Za svaku stranicu vrijedi:

- Header i footer su komponente.
- Prva sekcija je **page hero**: kraći od naslovnog hera, s nadnaslovom, H1, jednom rečenicom i po potrebi „mrvicama” (Početna / Stranica).
  - Treba dodati novi uzorak `.page-hero` (+ `.breadcrumb`), jednom, i koristiti ga na svim podstranicama.
- Stranica završava `.cta-band` trakom s porukom prilagođenom toj stranici.
- Snimke za desktop, tablet i mobitel idu u `screens/`.

### 6.1 Rješenja (`rjesenja.html`) — Gotovo

Svrha: pregled četiriju digitalnih alata i ulaz u podstranice.

Napomena o slikama: pregledano je preko 30 fotografija iz `assets-src/` za ova četiri bloka. Velika većina je otrcan WordPress stock/clipart (natpisi „COMPLIANCE”, „INTEGRITY” preko slike, crtani kompasi, grupa s podignutim palčevima, stock modeli) koji ne pristaje uz pecb.com smjer, ili su doslovno `shutterstock_*`/`Depositphotos_*` datoteke s neriješenom licencom (otvoreno pitanje 4). Vlasnik je 4. 11. 2026. potvrdio da ipak koristimo najbolje dostupno umjesto `.tool-visual` ikonskog panela za sva četiri bloka:
- **IntegrityUP** → `images/compliance-bez-ičega-scaled.jpg` (čovjek radi na laptopu).
- **ComplianceUP** → `images/codupo-edukacije-checking-results.jpg` (dvoje ljudi pregledava izvještaj na ekranu).
- **VoiceUP** → `images/Slider01.jpg` (ruka zaustavlja domino kockice).
- **IntegrityLine** → `images/codupo-edukacije-discussion.jpg` (siluete u sastanku, dvostruka ekspozicija nebodera).

Sve četiri su stock fotografije bez `shutterstock_` oznake u nazivu, ali izvor/licenca nije posebno provjerena (vidi otvoreno pitanje 4). `.tool-visual` uzorak ostaje u CSS-u za buduću upotrebu, ali se trenutno nigdje ne koristi na ovoj stranici. Kad vlasnik nabavi prave fotografije alata ili CODUPO-ove snimke, sve četiri bi trebalo zamijeniti. Tekst za sva četiri alata (uključujući VoiceUP i IntegrityLine, prošireno naspram naslovne) i dalje čeka potvrdu vlasnika (otvoreno pitanje 1).

Page hero pozadina: `.page-hero-rjesenja` (modifikator na `.page-hero`) postavlja `images/rjesenja-page-hero-mesh.png`, Artlist generaciju (Nano Banana 2, 16:9, 2k) odobrenu 6. 11. 2026. kao test (otvoreno pitanje 3). Ilustrirana svjetlucava mreža (plexus) s compliance ikonama (štit, vaga, dokument, lokot, povećalo, rukovanje) na lijevom i desnom rubu, prazan prolaz po sredini gdje sjedi tekst, u stilu hero sekcije na conference.codupo.hr. Isti postojeći gradient overlay (`--c-overlay-start/end`) iz `.hero` koristi se i ovdje za čitljivost teksta.

Sekcije:

1. Page hero: „Rješenja”, rečenica o tome da alati pokrivaju edukaciju, upravljanje usklađenošću i prijavu nepravilnosti.
2. Četiri velika bloka (izmjenični `.split` lijevo/desno), svaki sa sidrom `#integrityup`, `#complianceup`, `#voiceup`, `#integrityline`:
   - **IntegrityUP**, digitalne edukacije: za koga je, što dobivate, gumb na podstranicu.
   - **ComplianceUP**, upravljanje usklađenošću: registar obveza, rizici, dokazi, izvještaji (potvrditi sadržaj).
   - **VoiceUP**, vanjska povjerljiva osoba: zakonska obveza, kako radi, gumb na podstranicu.
   - **IntegrityLine**, vanjski sustav za prijavu nepravilnosti: anonimnost, rokovi, EU Direktiva o zaštiti zviždača. Nema zasebnu podstranicu, sve je ovdje.
3. Usporedna tablica „Koji alat vam treba” (flexbox redovi, ne `<table>` s gridom): potreba → alat.
4. CTA: „Pokažemo vam alat na vašem primjeru”, demo razgovor.

### 6.2 IntegrityUP (`integrityup.html`)

Digitalne edukacije.

1. Page hero s mrvicama Rješenja / IntegrityUP, gumb „Zatražite demo”.
2. Problem i rješenje: zašto godišnja edukacija na papiru ne radi, što IntegrityUP mijenja.
3. Katalog tema (kartice): etički kodeks, antikorupcija, sukob interesa, zaštita prijavitelja, GDPR i druge (potvrditi popis).
4. Kako funkcionira, u 3 do 4 koraka: uvođenje, prilagodba sadržaja, praćenje polaznika, izvještaji.
5. Za upravu i compliance officera: što vide u izvještajima.
6. Brojke ili reference klijenata (ako postoje podaci).
7. Česta pitanja (otvaranje odgovora bez JS-a, `<details>` elementi s vlastitom oznakom kao pravim elementom).
8. CTA.

### 6.3 ComplianceUP (`complianceup.html`)

Upravljanje usklađenošću. Ista struktura kao IntegrityUP:

1. Page hero.
2. Problem i rješenje.
3. Moduli (kartice; sadržaj potvrditi s vlasnikom).
4. Kako funkcionira.
5. Za koga je (državna poduzeća i Pravilnik od 18. 8. 2026., financijski sektor, velike organizacije).
6. Česta pitanja.
7. CTA.

### 6.4 VoiceUP (`voiceup.html`)

Vanjska povjerljiva osoba.

1. Page hero.
2. Zakonski okvir: tko mora imati povjerljivu osobu, što kaže zakon (provjeriti s vlasnikom točne reference).
3. Što preuzimamo: zaprimanje prijava, komunikacija s prijaviteljem, rokovi, izvještavanje.
4. Kako teče prijava (koraci).
5. Povezanost s IntegrityLine sustavom.
6. Česta pitanja.
7. CTA.

### 6.5 Edukacije (`edukacije.html`)

Dvije cjeline: kalendar otvorenih edukacija i programi za organizacije.

1. Page hero: „Edukacije”, gumbi-sidra „Kalendar” i „Programi za organizacije”.
2. **Kalendar otvorenih edukacija** (`#kalendar`):
   - Filtar po vrsti (certifikacijske PECB, poludnevne, online) kao vizualni čipovi. Filtriranje može raditi jednostavnim JS-om ili ostati vizualno, dogovoriti.
   - Popis `.card-event` po mjesecima, studeni 2026. do veljače 2027., sa starog weba: datum, naziv, format, trajanje, cijena (265 € poludnevne, 1.150 € certifikacijske + PDV), gumb „Prijava”.
3. **PECB certifikacije**: Silver Partner, popis ISO 37301 / 37001 / 37002 / 31000 tečajeva (Lead Implementer, Lead Auditor, Lead Risk Manager), što uključuje.
4. **Programi za organizacije** (`#programi`): in-house radionice @Work, teme kao čipovi, kako dogovaramo trajanje i format, gumb „Zatražite ponudu”.
5. **Mockup prijave na edukaciju**: ime, organizacija, e-mail, odabrani termin. Označen `.mockup-tag`.
6. Izjave polaznika (samo ako postoje stvarne na starom webu).
7. CTA.

### 6.6 Savjetovanje (`savjetovanje.html`)

Četiri cjeline iz briefa, osam usluga raspoređenih unutar njih.

1. Page hero: „Savjetovanje”.
2. **GAP analize** (`#gap`): GAP analiza i evaluacija compliance programa, što dobivate (izvještaj, plan, prioriteti).
3. **Uspostava i razvoj compliance funkcije** (`#funkcija`): eksternalizirana funkcija usklađenosti, mentoring i coaching, Pravilnik za državna poduzeća (`Pravilnik-o-funkcij-PU.png`, `Eksternalizirana-funkcija.png`).
4. **Implementacija sustava** (`#implementacija`): dizajn compliance programa, ISO 37301 / 37001 / 37002, Integrity Line, eksternalizirana povjerljiva osoba.
5. **Politike i ostale savjetodavne usluge** (`#politike`): etički kodeks, politike (sukob interesa, darovi, antikorupcija), izgradnja compliance kulture (Integrity Culture).
6. Kako radimo: ponoviti četiri koraka s naslovne (`.card-step`).
7. ISO norme (`.tag-row`) i PECB značka.
8. CTA: „Dogovorite uvodni razgovor”.

### 6.7 Konferencija (`konferencija.html`)

Tri dijela iz briefa: program, predavači, prijave.

1. Page hero (tamni, fotografija s konferencije): naziv, datum, mjesto (Hilton Garden Inn, Zagreb), tema.
   - Napomena: konferencija 29. 9. 2026. je već održana. Dogovoriti s vlasnikom prikazujemo li 2026. kao „održano” ili najavu 2027.
2. Brojke: 290 sudionika, 14 zemalja, 3 pozornice, 8 kategorija nagrada.
3. **Program** (`#program`): raspored po pozornicama, vremenski blokovi kao kartice ili lista (flexbox stupci po pozornici, na mobitelu kartice).
4. **Predavači** (`#predavaci`): kartice s fotografijom, imenom, funkcijom i organizacijom. Samo stvarni predavači sa starog weba.
5. **Nagrade**: osam kategorija.
6. **Prijave** (`#prijave`): kotizacije (ako postoje podaci), mockup obrasca prijave s `.mockup-tag`.
7. Partneri i sponzori (logotipi iz `assets-src/`).
8. Poveznica na prethodne konferencije.
9. CTA.

### 6.8 Prethodne konferencije (`prethodne-konferencije.html`)

1. Page hero s mrvicama Konferencija / Prethodne konferencije.
2. Po godini jedan blok (najnovija prva): tema, datum, brojke, nekoliko fotografija iz `assets-src/` (npr. `CODUPO-Compliance-konferencija-2024-017.jpg`), poveznica na galeriju ili sažetak.
3. Galerija fotografija: flexbox s prelamanjem, na mobitelu horizontalni scroll.
4. CTA: prijava na sljedeću konferenciju.

### 6.9 Blog i novosti (`blog.html`)

Tri kategorije iz briefa: stručni članci, aktualnosti, IntegrityTalk.

1. Page hero: „Blog i novosti”.
2. Kategorije kao čipovi/kartice: Stručni članci, Aktualnosti, IntegrityTalk (vizualni filtar).
3. Istaknuti članak (veliki `.split`).
4. Popis članaka `.card-post` (naslovi i datumi sa starog weba), s prelamanjem u redove. Na mobitelu jedan stupac.
5. **IntegrityTalk** blok: što je (podcast/razgovori, potvrditi format), zadnje epizode.
6. Newsletter poziv (isti mockup kao u footeru ili poveznica na njega).
7. Paginacija kao vizualni element.

### 6.10 Članak, predložak (`clanak.html`)

1. Mrvice, kategorija, datum, naslov, autor.
2. Naslovna slika.
3. Tekst članka (uska kolona za čitljivost, stilovi za podnaslove, liste, citate; citat s pravim elementom za oznaku).
4. Autor (kratka biografija).
5. Povezani članci (3 × `.card-post`).
6. CTA.

Sadržaj za predložak: jedan stvarni članak sa starog weba (npr. o Pravilniku od 18. 8. 2026.).

### 6.11 O nama (`o-nama.html`)

Šest cjelina iz briefa:

1. Page hero: „O nama”.
2. **Tko je CODUPO i kome pomaže**: kratka priča, kome pomažemo (državna poduzeća, financijski sektor, velike i srednje organizacije), 9 zemalja.
3. **Kako radimo**: pristup i četiri koraka.
4. **Misija, vizija, vrijednosti**: tekstovi sa starog weba, vrijednosti Integritet / Inovativnost / Izvrsnost (`.card-value`).
5. **Ljudi iza CODUPO-a**: Silvija Vig, Ljiljana Hrastinski Jurčec i ostali tim (stvarni podaci i fotografije). Snimke s mobitela (npr. EFFECTUS) zamijeniti generiranim verzijama samo uz dogovor.
6. **Dokazi iskustva**: brojke, PECB Silver Partner (četvrtu godinu zaredom), logotipi klijenata iz 9 zemalja (iz `assets-src/`, uz potvrdu da ih smijemo prikazati).
7. **Autorski rad i doprinos struci**: knjiga „Poslovna etika” (VERN i CODUPO), popis predavanja i nastupa sa starog weba, članstva i funkcije (npr. Etičko povjerenstvo INA Grupe).
8. CTA.

### 6.12 Kontakt (`kontakt.html`)

1. Page hero: „Kontakt”.
2. Dvostupčani `.split`:
   - **Lijevo:** kontakt podaci (adresa, telefon, e-mail, OIB, MBS, LinkedIn), radno vrijeme ako postoji podatak.
   - **Desno:** **kontakt obrazac kao mockup** (ime i prezime, organizacija, e-mail, telefon, tema kao izbor: savjetovanje / edukacije / rješenja / konferencija / ostalo, poruka, privola). Jasno označen `.mockup-tag` „Mockup obrasca, ne šalje podatke”, gumb `type="button"`.
3. Karta: statična slika ili poveznica „Otvori u Google kartama”. Bez iframea koji zahtijeva kolačiće, osim ako se dogovori drugačije.
4. Kratki FAQ: kako izgleda uvodni razgovor, koliko traje, je li besplatan (potvrditi).

---

## 7. Otvorena pitanja za vlasnika

1. Potvrda teksta za IntegrityUP, ComplianceUP, VoiceUP i IntegrityLine (opisi su sada napisani bez izvora).
2. Konferencija: prikazati 2026. kao održanu ili najaviti 2027.? Ima li datum i tema za 2027.?
3. ~~Smijemo li koristiti Artlist za zamjenu loših fotografija (troši kredite)?~~ Vlasnik je 6. 11. 2026. odobrio test: generirana je `images/rjesenja-page-hero-mesh.png` (ilustrirana mreža s compliance ikonama, stil prema conference.codupo.hr) za pozadinu `.page-hero` na Rješenjima, 260 Artlist kredita potrošeno (2 generacije, 130 svaka). Za daljnju upotrebu Artlista na drugim stranicama/slikama treba ponovno pitati, dogovor vrijedi po slučaju.
4. Licence za Shutterstock fotografije na novom webu. Četiri slike bez `shutterstock_` oznake su u upotrebi na `rjesenja.html` (`compliance-bez-ičega-scaled.jpg`, `codupo-edukacije-checking-results.jpg`, `Slider01.jpg`, `codupo-edukacije-discussion.jpg`) uz vlasnikovo dopuštenje da koristimo najbolje dostupno iz `assets-src/`, ali izvor/licenca tih četiriju nije posebno provjerena.
5. Smijemo li prikazati logotipe klijenata?
6. Format IntegrityTalka (podcast, video, članci).
7. Engleska verzija: preklopnik HR | EN postoji u headeru, ali EN stranice nisu u planu. Radimo li ih?
8. Treba li filtriranje kalendara i bloga stvarno raditi (JS) ili ostaje vizualno?

---

## 8. Radni dogovor

- Ne radimo nove stranice bez izričitog dopuštenja vlasnika.
- Nakon svake stranice: provjera pravila (poglavlje 3), snimke za tri veličine, kratak sažetak vlasniku.
- Commit poruke na hrvatskom. Push na `origin` (virtualant/codupo-web).
