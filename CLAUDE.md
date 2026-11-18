# CODUPO Compliance, novi web

Dokumentacija projekta: što je napravljeno, kojih se pravila držimo i što treba napraviti za preostale stranice.

**Header adresa uklonjena, "Pročitajte više" za biografije i uvećana kartica knjige na O nama (18. 11. 2026.):** na vlasnikov zahtjev, iz razloga privatnosti ("to je lijepo i profesionalno ali kako je to i moja adresa stanovanja, ne bi je baš toliko isticala") - sve tri izmjene su prvo izrađene i potvrđene u Claude Design canvasu, pa tek onda prenesene na stvarnu stranicu.
- **Adresa uklonjena iz headera** (`js/components.js`, `<site-header>`): `topbar-item` raspon s adresom "Kutnjački put 15, Zagreb" obrisan je iz topbara koji se prikazuje na SVIM stranicama (header je zajednička komponenta). Adresa u footeru (`<site-footer>`) namjerno NIJE dirana - vlasnik je tražio izmjenu samo u headeru, footer i dalje ispravno prikazuje pune pravne podatke tvrtke. Posljedično je uklanjanje otkrilo i ispravljeno dva responsive CSS pravila u `css/styles.css` koja su ovisila o poziciji adrese kao prvog djeteta `.topbar-group`: na tabletu (≤1024px) `.topbar-group .topbar-item:first-child { display: none; }` više nije bilo ispravno (sakrilo bi sad telefon, koji je postao prvo dijete) - pravilo je uklonjeno u cijelosti; na mobitelu (≤640px) `.topbar-group .topbar-item:nth-child(3)` promijenjen je u `:nth-child(2)` (e-mail je sad drugo, ne treće dijete), tako da topbar na mobitelu i dalje ispravno prikazuje samo telefon i jezični preklopnik, kako komentar u kodu i opisuje.
- **"Pročitajte više" za biografije** (`o-nama.html`, sekcija "Naš tim"): i Silvija Vig i Ljiljana Hrastinski Jurčec sad imaju samo prvi odlomak biografije vidljiv izravno na stranici, a preostala četiri odlomka svakog teksta su u novom `.bio-more` uzorku (`<details>`/`<summary>`, bez JS-a, isti obrazac kao postojeći FAQ accordion) s poveznicom "Pročitajte više" koja se pri otvaranju mijenja u "Prikaži manje". Novi CSS uzorak u `css/styles.css`: `.bio-more`, `.bio-more-toggle`, `.bio-more-show`/`.bio-more-hide` (prikaz/skrivanje teksta linka preko `[open]` selektora, ne pseudo-elementa), `.bio-more-body`.
- **Uvećana, klikabilna kartica knjige** (`o-nama.html`, sekcija "Autorski rad"): dotadašnji mali `.book-row` zamijenjen je novim, znatno većim `.book-feature` uzorkom (`<details>`/`<summary>`, isti bez-JS obrazac) - korica knjige je sad vidljivo veća (novi token `--book-w-lg: 9rem` nasuprot `--book-w: 4.5rem`), a klikom na karticu otvara se dodatni opis knjige i gumb "Naručite knjigu" koji vodi na https://www.poslovnaetika.com/. **Napomena:** opisni tekst unutar proširene kartice je privremen, izmišljen za ovu priliku jer je https://www.poslovnaetika.com/ nedostupan iz ovog okruženja (ECONNREFUSED na WebFetch, odbijeno i u Browser pane) - vlasnik je izričito rekao da će poslati novi, stvaran tekst ("za sada napravi nešto, ispiriraj se starim"), pa ovaj opis treba zamijeniti prije objave. Nijedna cijena, ISBN ni prodajni podatak nije izmišljen. Novi CSS uzorak: `.book-feature`, `.book-feature-summary`, `.book-feature-cover`, `.book-feature-body`, `.book-feature-title`, `.book-feature-toggle`, `.book-feature-show`/`.book-feature-hide`, `.book-feature-expand`, uz mobilni override `.book-feature-summary { flex-direction: column }`.
- **Napomena o testiranju:** Browser pane je i ovaj put uporno posluživao staru, predizmjensku verziju `js/components.js` (stvaran uzrok - `customElements.define` ne dopušta ponovnu registraciju iste oznake, pa uobičajeni trik zamjene `<script src>` oznake ne radi za ovu datoteku, za razliku od `css/styles.css` gdje isti trik radi) čak i u potpuno novom tabu - potvrđeno da je riječ isključivo o artefaktu alata za pregled u ovoj sesiji (ne o serverskom ili kodnom problemu) kroz izravan `fetch(url, {cache:'no-store'})` koji je dosljedno vraćao ispravan sadržaj. Zaobiđeno za vizualnu provjeru tako da je svježi JS dohvaćen i ručno primijenjen na već postojeće `<site-header>`/`<site-footer>` elemente u DOM-u (bez `customElements.define`). Konačne snimke zaslona (`screens/o-nama-*.png`) napravljene su kroz uobičajeni headless Chrome postupak (poglavlje 3) izravno protiv lokalnog servera, što zaobilazi Browser pane keširanje u potpunosti i potvrđeno prikazuje ispravan, ažuran sadržaj.

**Naslovnica, hero slider s tri najave (17. 11. 2026.):** stari jednostruki `.hero` zamijenjen je rotirajućim sliderom od tri najave, PECB-stil, na vlasnikov zahtjev. Stara `.hero` CSS klasa i njezin sadržaj nisu dirani (i dalje ih koristi `index-v1.html`) - slider koristi potpuno nov, paralelan skup klasa (`.hero-slider`, `.hero-slider-viewport`, `.hero-slider-track`, `.hero-slide` + tri modifikatora), a `.hero-inner`/`.hero-content`/`.hero-title`/`.hero-lead` su ponovno iskorišteni bez izmjene unutar svakog `.hero-slide`. Tri najave (redoslijed ispravljen 18. 11. 2026. - vidi dopunu niže, ovdje su već navedene ispravnim, trenutnim redoslijedom):
1. **Naslovna poruka** - identičan sadržaj i fotografija (`Eksternalizirana-funkcija.png`) kao prijašnji jedinstveni `.hero` (nepromijenjen tekst, isti gumbi). Prvi slajd, `is-active is-visible` izravno u HTML-u.
2. **Rješenja** - naslov i uvodni tekst doslovno preuzeti s `rjesenja.html` page-hero (`.page-hero-rjesenja`), ne izmišljeni iznova. Gumbi vode na `rjesenja.html`/`kontakt.html`. Fotografija nova, Artlist (Nano Banana 2, 16:9, 2K, 130 kredita): profesionalka pregledava povjerljivi izvještaj na laptopu - prvi pokušaj generiranja prikazao je vidljiv Apple logo na laptopu (zaštitni znak), ponovno generirano s eksplicitnom uputom za generički laptop bez oznaka.
3. **Compliance konferencija** - eyebrow „Prijave uskoro · Compliance konferencija 2027.”, naslov „Najveće regionalno okupljanje compliance struke”, datum 28. rujna 2027. preuzet doslovno iz postojeće potvrđene sekcije „Compliance konferencija” niže na istoj stranici (ne izmišljen iznova). Gumbi vode na `konferencija.html`/`prethodne-konferencije.html`, isti obrazac kao postojeća sekcija. Fotografija nova, Artlist (Nano Banana 2, 16:9, 2K, 130 kredita): dvorana s govornicom na pozornici pred publikom. Napomena: istraživan je i stvarni, već objavljeni web `conference.codupo.hr/compliance-konferencija-2026/` radi stilske inspiracije i provjere činjenica - ta stranica opisuje VEĆ ODRŽANU konferenciju 2026. („Novi standardi i nove odgovornosti”, 29. 9. 2026.), pa njezina tema/program NISU preneseni na slide (bilo bi pogrešno predstaviti prošli događaj kao najavu); slide ostaje namjerno general/teaser za sljedeće, 2027. izdanje, bez izmišljene teme ili lokacije za 2027. jer te činjenice još nisu potvrđene.

Ukupno 260 novih Artlist kredita za uvodnu verziju slidera (2 generacije po 130).

**Dopuna 18. 11. 2026. (redoslijed slajdova ispravljen, + sinkronizacija s Claude Design canvasom):** vlasnik je, gledajući Claude Design canvas (zaseban sustav od stvarne stranice, vidi niže), zatražio drugačiji redoslijed - Naslovna poruka prva, Rješenja druga, Konferencija zadnja (prvotni redoslijed, konferencija prva, bio je moj vlastiti izbor pri izradi, nije bio izričito zadan). Redoslijed `.hero-slide` elemenata u `index.html` promijenjen (JS ne ovisi o redoslijedu, radi generički po indeksu, nikakve izmjene koda nisu bile potrebne osim premještanja HTML blokova i koje slajd nosi `is-active is-visible`).

**Claude Design canvas (sinkronizacija 18. 11. 2026.):** uz stvarnu stranicu (`index.html`, `css/styles.css`), postoji i zaseban Claude Design canvas (`https://claude.ai/artifact/SodY8bP2NFejm5f9f5q4GZ`) koji vlasnik koristi za pregled dizajna - to je POTPUNO ODVOJEN sustav s vlastitim kopijama HTML/CSS datoteka (`project/Naslovna-desktop/tablet/mobile.dc.html`, `project/styles.css` u canvas-u), koji se NE ažurira automatski kad se mijenja stvarna stranica. Vlasnik je primijetio da canvas prikazuje staru naslovnicu (bez slidera, bez hover efekta na karticama) jer sve izmjene od 17. 11. nadalje (hero slider, `.card-spotlight` hover kartice, svi bugfixevi) nisu bile ručno prenesene u canvas. Sinkronizirano: canvas `styles.css` dobio je sve nove tokene (`--spotlight-h`, `--spotlight-lift`, `--nav-btn`, `--progress-h`) i CSS blokove (`.button-fill`/`.button-fill-icon`, cijela `.hero-slider*` sekcija, `.card-spotlight*` sekcija), a tri Naslovna board datoteke dobile su novi hero slider i hover kartice. Pet novih Artlist fotografija (dvije za hero slider, tri za card-spotlight) uploadano je u canvas kroz `asset: true` upload (canvas ima svoj odvojeni `/_blob/` sustav slika, ne dijeli `images/` mapu sa stvarnom stranicom) - fotografija za srednji slajd (sad prvi, Naslovna poruka) ponovno koristi već postojeći canvas blob za `Eksternalizirana-funkcija.png`.

Prvi pokušaj sinkronizacije prikazao je samo JEDAN statični slajd bez rotacije (isti obrazac kao raniji Blog canvas board, koji također nema replicirani JS filtar - canvas boardovi su dotad tretirani kao čisto vizualni mockupi, bez funkcionalnog JS-a). Vlasnik je odmah uočio da se slajdovi ne mijenjaju i da gumbi prethodna/sljedeća ne rade, pa je i to ispravljeno: canvas sad sadrži sva tri slajda (ispravnim redoslijedom) i identičan JS kao stvarna stranica (obična `<script>` oznaka ubačena nakon canvas-ovog vlastitog `DCLogic` komponentnog scripta, omotana u `window.addEventListener("load", ...)` kao dodatna mjera opreza jer nije poznato točno vrijeme kad canvas-ov `x-dc` sustav završi renderiranje svog sadržaja u DOM). Ovo je prvi put da je canvas boardu dodana prava interaktivnost (ne samo vizualni prikaz) - ako ubuduće treba ponoviti za druge stranice (npr. Blog filtar), isti obrazac (plain `<script>` iza DCLogic bloka, `window.addEventListener("load", ...)`) trebao bi raditi, ali nije posebno testiran izvan ovog slučaja.

**Napomena o održavanju:** canvas i stvarna stranica sad trebaju ostati ručno sinkronizirani ubuduće - svaka nova izmjena dizajna na `index.html`/`css/styles.css` koju vlasnik želi vidjeti i u canvasu zahtijeva zaseban korak ažuriranja canvas datoteka (nije automatsko).

**Dopuna 17. 11. 2026. (fade tranzicija, postepeno pojavljivanje teksta, nove kontrole):** na vlasnikov zahtjev, horizontalni slide-in (translateX na flex traci širokoj 300%) zamijenjen je fade tranzicijom, a dots su zamijenjeni brojačem/trakom trajanja/strelicama.
- **Fade umjesto slide-a:** `.hero-slider-track` više nije flex red - `.hero-slide` elementi su sad slagani u normalnom toku, svaki `display: none` po defaultu, samo `.is-active` dobiva `display: block` i `.is-visible` dodatno `opacity: 1` (base `.hero-slide{opacity:0}`, `transition: opacity 0.5s ease`). Pravo preklapanje dva slajda (klasičan crossfade) nije moguće bez `position: absolute` ili CSS grid stacka (oboje zabranjeno poglavljem 2), pa je umjesto toga napravljen "fade kroz tamno": JS prvo makne `.is-visible` sa starog slajda (fade-out 0.5s na providno), nakon 500ms (`setTimeout`) mu makne `.is-active` (display:none, već nevidljiv) i doda `.is-active` na novi slajd (opacity 0 po defaultu), forsira reflow (`void next.offsetWidth`), pa doda `.is-visible` (fade-in 0.5s). Budući da `.hero-slider` ima `background-color: var(--c-ink)`, kratki trenutak između dva slajda izgleda kao suptilan fade kroz tamnu pozadinu, ne kao prazna bljeskalica.
- **Postepeno pojavljivanje teksta/gumba:** novi `@keyframes hero-reveal` (opacity 0→1 + `translateY(var(--sp-4))→0`) primijenjen na `.hero-slide.is-visible .eyebrow-light/.hero-title/.hero-lead/.button-row > *` sa stupnjevanim `animation-delay` (0.1s/0.25s/0.4s/0.55s/0.68s - oba gumba u retku imaju zaseban delay). Budući da prvi slajd već ima `is-active is-visible` izravno u HTML-u, animacija se odigra i kod prvog učitavanja stranice, ne samo kod promjene slajda.
- **Nove kontrole umjesto `.hero-slider-dots`/`.hero-slider-dot`** (potpuno uklonjeni): `.hero-slider-controls` je flex red s tri dijela - `.hero-slider-counter` lijevo (npr. „2 / 3”, trenutni broj ažurira JS, ukupno je statično u HTML-u), `.hero-slider-progress`/`.hero-slider-progress-fill` u sredini (tanka traka, `--progress-h`, koja se puni zlatnom bojom slijeva nadesno kroz `width` tranziciju sinkroniziranu s 7-sekundnim automatskim ciklusom - `transition: width 7000ms linear` + reset na 0% prije svakog novog slajda), `.hero-slider-nav` desno s dva `.hero-slider-nav-btn` kvadratna gumba (`--nav-btn`, providna pozadina, bijeli `--border-strong` obrub, strelice kao SVG istog outline stila kao ostale ikone na stranici) za ručni prethodni/sljedeći. Klik na strelicu odmah mijenja slajd i resetira i timer i traku trajanja. Funkcije `stop()`/`freezeFill()` ostaju u kodu samo za taj ručni klik (pauziraju stari ciklus prije nego start() pokrene novi).

**Dopuna 18. 11. 2026.:** automatska rotacija više se NE zaustavlja na `mouseenter`/ne nastavlja na `mouseleave` (ranije ponašanje, uklonjeno na izričit zahtjev vlasnika - "neka ide slobodno cijelo vrijeme"). Slider se sad vrti kontinuirano bez obzira prelazi li se mišem preko njega; jedini način da se promijeni slajd mimo automatskog ciklusa su gumbi prethodna/sljedeća.

**Dopuna 18. 11. 2026. (kontrole premještene na dno fotke, pa ispravljene nakon što je vlasnik prijavio bug):** na vlasnikov zahtjev, donja traka (brojač, traka trajanja, strelice) više nije zaseban tamni box ispod slidera - sjedi izravno na dnu fotografije, preklapajući je (isti redoslijed kao prije: brojač na početku, traka u sredini, strelice na kraju trake).

Prvi pokušaj (ugrađivanje trake u svaki aktivni `.hero-slide` kao zadnje dijete, uz `margin-top: auto` da je gura do dna, i JS koji je `appendChild`-om fizički premještao jedini dijeljeni element iz starog u novi aktivni slajd) uveo je bug koji je vlasnik odmah uočio: traka trajanja se punila pri prvom učitavanju, ali je nakon prelaska na sljedeći slajd ostajala "zamrznuta" puna, kao da svaki slajd ima svoju vlastitu traku. Stvaran uzrok: u trenutku `current.classList.remove("is-active")` (slajd koji nestaje dobiva `display: none`), traka trajanja je tada JOŠ UVIJEK bila dijete tog (sad skrivenog) slajda i usred vlastite `width` CSS tranzicije - element unutar `display: none` roditelja prestaje sudjelovati u rendiranju, pa se njegova tekuća tranzicija odmah prekida i "skoči" na krajnju vrijednost (100%), bez obzira koliko je stvarno napredovala. Tek nakon toga JS premjesti (već "zamrznuti" na 100%) element u novi slajd - pa izgleda kao da je traka odmah puna.

**Ispravljeno** vraćanjem trake na razinu JEDNOG STALNOG elementa koji NIKAD nije dijete pojedinog `.hero-slide` i nikad se ne premješta: `.container.hero-slider-controls-inner` je sad izravan sibling `.hero-slider-viewport`-a unutar `.hero-slider` (ne ulazi u `.hero-slider-track` ni u pojedine slajdove), pa njegova `width` tranzicija na traci trajanja nikad nije izložena tuđem `display: none` prekidu. Vizualno preklapanje dna fotke postignuto je BEZ `position: absolute` kroz negativnu gornju marginu izračunatu iz postojećih tokena: `margin-top: calc((var(--nav-btn) + var(--sp-6) * 2) * -1)` - ta vrijednost točno odgovara prirodnoj visini samog kontrolnog retka (najviši element u retku su `--nav-btn` kvadratni gumbi, uz `--sp-6` padding odozgo i odozdo), pa red "povuče" sam sebe gore za točno svoju visinu i slijeće preko zadnjeg dijela fotografije ispod njega u normalnom toku dokumenta - bez da ita pomakne ukupnu visinu stranice. `.hero-slide` je vraćen na jednostavni `display: block`/`none` (bez `flex-direction: column`, taj sloj više nije potreban). JS više ne radi `appendChild` - `goTo()` samo resetira/pokreće traku (`resetFill()`/`runFill()`) kao i prije, a sama traka ostaje netaknuta DOM-om tijekom cijele promjene slajda. Potvrđeno mjerenjem u pregledniku: `fillWidth` korektno pada na `0px` pri svakom prijelazu i raste linearno do sljedećeg, bez ikad "zamrzavanja" na punoj širini.

**Dopuna 18. 11. 2026. (traka više ne "nestaje" pri resetu):** vlasnik je nakon prethodne ispravke uočio da traka trajanja pri svakoj promjeni slajda vizualno "nestane pa se pojavi, kao i tekst" - iako je traka strukturno odvojena od slajdova (gore potvrđeno), njezin reset je i dalje koristio `transition: none` + trenutačni skok na `width: 0%` (pa tek onda 7-sekundnu tranziciju na 100%), što vizualno izgleda kao da se žuti dio trake trenutno izbriše, sličan dojam kao i prekid teksta. Ispravljeno u `resetFill()`/`runFill()`: umjesto trenutačnog skoka bez tranzicije, smanjenje na 0% sad traje 0.3s uz blagi `ease` (`transition: "width 0.3s ease"`), a tek nakon tog kratkog, vidljivog skupljanja (`setTimeout(..., 300)`) kreće standardna 7-sekundna tranzicija punjenja. Traka je time uvijek vidljiva i u pokretu, bez trenutačnog iščezavanja.
- **Napomena o testiranju (throttling pozadinskog taba):** tijekom provjere ove izmjene, mjerenja u NOVOOTVORENOM, pozadinskom Browser pane tabu davala su nasumično "zamrznute"/nepravilne rezultate (traka naizgled uopće ne mijenja širinu kroz cijelu sekundu, pa odjednom skoči) - uzrok je Chromeov throttling JS tajmera (`setTimeout`/`setInterval`) i renderiranja u tabovima koji nisu u prednjem planu. Mjerenja postaju točna i pravilna tek kad se tab prvo dovede u prednji plan (`tabs_select`). Treći ovakav "lažni bug" u ovoj sesiji (uz raniju zabunu s automatskim ciklusom i CSS keširanjem) - vrijedi uvijek prvo posumnjati na artefakt alata za testiranje prije zaključka da je kod pogrešan, pogotovo kad se ponašanje razlikuje između "stvarnog" korisničkog pregleda i automatiziranog mjerenja.

**Dopuna 18. 11. 2026. (traka potpuno odvojena od JS logike slajdova):** vlasnik je i dalje primjećivao da element sa žutom trakom "nestaje" prilikom učitavanja novog slajda, i izričito zatražio da animacije slajda uopće nemaju utjecaj na taj element. Iako je traka već bila strukturno izvan `.hero-slide` elemenata (vidi gore), i dalje je bila JS-om RESETIRANA (`resetFill()`/`runFill()`) pri svakoj promjeni slajda (`goTo()`, `start()`, `stop()`/`freezeFill()`) - svaki reset, čak i uz blagi 0.3s `ease`, ostaje vidljiva promjena širine koja se poklapa s trenutkom promjene slajda, pa je djelovala kao da je "dio" te tranzicije.

**Konačno rješenje:** traka trajanja sad je potpuno samostalna, beskonačno ponavljajuća CSS animacija, bez ikakvog JS upravljanja: `.hero-slider-progress-fill { animation: hero-slider-fill 7s linear infinite; }` s `@keyframes hero-slider-fill { from { width: 0% } to { width: 100% } }`. JS (`resetFill`/`runFill`/`freezeFill` funkcije, svi pozivi iz `goTo()`/`start()`/`stop()`) potpuno uklonjen - preostali JS upravlja isključivo promjenom slajdova (`goTo`/`next`/`prev`/`updateCounter`/`setInterval`) i uopće više ne dira traku. Budući da su oba ciklusa (JS `setInterval` za slajdove i CSS `animation` za traku) postavljena na identičnih 7 sekundi i oba kreću od učitavanja stranice, ostaju vizualno usklađena kod automatske rotacije; ručni klik na strelicu i dalje odmah mijenja slajd i resetira JS timer (`start()` radi `clearInterval` + novi `setInterval`), ali VIŠE NE DIRA traku - traka nastavlja svoj vlastiti, neprekinuti 7-sekundni ciklus bez obzira na ručnu navigaciju, točno kako je vlasnik tražio ("slide animacije nemaju utjecaj na element sa žutom trakom"). Potvrđeno mjerenjem u prednjem planu (foreground tab) da `fillWidth` raste glatko i monotono kroz klik na strelicu i promjenu slajda, bez ikakvog prekida ili skoka.
- **Napomena o CSS keširanju otkrivenom tijekom ove izmjene:** Browser pane u ovoj sesiji je uporno posluživao STARU verziju `css/styles.css` (prije izmjene, `display: block` umjesto `display: flex`) čak i nakon `location.reload(true)` i otvaranja potpuno novih tabova - potvrđeno da je problem isključivo u pregledniku, ne na serveru (`curl http://localhost:5510/css/styles.css` i `fetch(..., {cache:'no-store'})` iz iste stranice oboje su odmah vraćali ispravan, svježi sadržaj). Zaobiđeno mijenjanjem `href` postojećeg `<link>` elementa u `/css/styles.css?bust=<timestamp>` kroz JS, što je prisililo pravi mrežni dohvat. Ovo je artefakt alata za pregled u ovoj sesiji, ne problem u kodu ili na serveru - vlasnik to neće iskusiti u normalnom radu/objavljenoj stranici, ali vrijedi zapamtiti ako se ubuduće opet pojavi "promjena se ne vidi unatoč ispravnom kodu" u ovom razvojnom okruženju.
- **Bug uočen i ispravljen tijekom izrade:** prva verzija fade-a nije imala pravilo `.hero-slide.is-visible { opacity: 1 }` (samo animacije za djecu), pa je cijeli slajd (fotografija, tekst) ostajao nevidljiv - vizualno prazna tamna pozadina. Ispravljeno dodavanjem tog pravila.
- **Napomena o testiranju:** tijekom provjere u Browser pane alatu, stvarni korisnik je paralelno klikao po istom dijeljenom tabu dok se slider testirao, što je nekoliko puta privremeno djelovalo kao bug (slajd/brojač "skaču" sami od sebe) - uzrok je bio automatska rotacija koja se odvijala usporedno s korisnikovom interakcijom, ne greška u kodu. Konačna provjera napravljena je u zasebnom, izoliranom tabu (klik naprijed/natrag/naprijed potvrđen kao 1→2→3→2).

**Dopuna 18. 11. 2026. (tri stvarna buga koje je prijavio vlasnik nakon isprobavanja uživo):**
1. **Slajdovi su se odjednom počeli prebrzo izmjenjivati.** Stvaran uzrok: `start()` nije prije stvaranja novog `setInterval` čistila prethodni (`timer = setInterval(...)` je samo prepisivao varijablu, bez `clearInterval(timer)` ispred). Ako se `start()` pozvala dvaput zaredom bez da je `stop()` stigla očistiti prethodni interval između (npr. zbog promjene visine `.hero-slide` između slajdova različite dužine teksta, koja može izazvati lažni `mouseenter`/`mouseleave` par na `.hero-slider` čak i bez stvarnog pomaka miša), nastajala su DVA paralelna intervala koja su oba zasebno, svakih 7 sekundi, pozivala `next()` - zbrajanjem kroz vrijeme to je izgledalo kao da se slideovi "odjednom" ubrzavaju. Ispravljeno dodavanjem `clearInterval(timer)` na sam početak `start()`, čime je zajamčeno da u svakom trenutku postoji najviše jedan aktivni interval. Provjereno izravno u pregledniku (ne kroz zasebne alate-pozive koji unose svoje kašnjenje) kroz `MutationObserver` koji je mjerio stvarni razmak između promjena brojača - rezultat je točno 7000 ms između ciklusa, bez odstupanja.
2. **Žuta traka trajanja se nije punila.** Stvaran uzrok: `resetFill()`/`runFill()` pozivale su se samo unutar `start()` (dakle samo pri prvom učitavanju i pri ručnoj pauzi/nastavku/navigaciji gumbima), ali NE i unutar `goTo()` - što znači da je automatska rotacija (`next()` pozvan iz intervala) mijenjala slajd bez ikad resetirati traku, pa je traka samo JEDNOM ispunila do kraja i ostala zauvijek puna za sve sljedeće cikluse automatske rotacije. Ispravljeno premještanjem `resetFill(); runFill();` i u `goTo()`, tako da se traka resetira i ponovno puni pri SVAKOJ promjeni slajda, bilo automatskoj bilo ručnoj.
3. **Elementi donje trake (brojač, traka, strelice) stajali su uz sam rub ekrana.** Uzrok: `.hero-slider-controls` nije koristio `.container` wrapper (za razliku od `.hero-inner` unutar svakog slajda, koji ga koristi), pa nije imao `--gutter` padding sa strana. Ispravljeno dodavanjem `.container.hero-slider-controls-inner` unutar `.hero-slider-controls` (isti obrazac kao `.container.hero-inner`) - `.hero-slider-controls` sad nosi samo gornji/donji padding, a `.hero-slider-controls-inner` flex-red i bočni gutter nasljeđuje iz `.container`.

**Naslovnica, hover efekt na "Brzi odabir" (15. 11. 2026.):** na zahtjev vlasnika, tri kartice u sekciji "Stručna podrška za odgovornije i otpornije poslovanje" (Savjetovanje, Edukacije, Rješenja) dobile su PECB-stil hover interakciju. Nova `.card-spotlight` klasa (modifikator na `.card-solution`, samo za ove tri kartice) fiksira visinu kartice (`--spotlight-h`, 22rem desktop/20rem tablet/auto mobitel jer hover nema smisla na dodir) i na hover mijenja `background-image` s obične bijele pozadine na fotografiju s tamnim gradient overlayem (isti `--c-overlay-start/end` par koji već koriste `.hero`/`.page-hero-*`), bez dodatnih elemenata ili `position: absolute` - fotografija je samo `background-image` samog elementa, iza flex djece kao i inače. Tri specifične modifikator-klase (`.card-spotlight-savjetovanje`, `-edukacije`, `-rjesenja`, isti obrazac kao `.page-hero-rjesenja` i slični) svaka nosi svoju Artlist fotografiju (`images/card-spotlight-*.png`, Nano Banana 2, 3:2, 2K, 130 kredita svaka, 390 ukupno - generirano nakon što je vlasnik eksplicitno potvrdio čekanje na ponovno spajanje Artlist konektora koji je bio privremeno nedostupan u sesiji). Na hover: ikona ostaje vidljiva, samo joj boja (`.card-spotlight-icon`, preko `currentColor`) i prozirna pozadina pločice prelaze u bijelo (dopuna 15. 11. 2026. - prvotno rješenje je ikonu skrivalo kroz `opacity: 0`, vlasnik je zatražio da ostane vidljiva i samo promijeni boju), naslov i tekst postaju bijeli, a gumb (nova `.button-fill` klasa, zamijenio `.link-arrow`) prelazi s teal obruba/teksta na bijeli obrub/tekst. Sadržaj (naslov, tekst, gumb) raspoređen je po cijeloj visini kartice kroz postojeće `.card-solution .card-text { flex-grow: 1 }` pravilo (gumb time ostaje prizemljen na dnu kartice, bez novog CSS-a). `.button-fill` je novi gumb uzorak: zaobljeni obrub (`--radius-pill`), bez pozadine po defaultu, s fill animacijom na hover kroz `background-size` trik (`background-image: linear-gradient(teal, teal)` + `background-size: 0% 100% → 100% 100%`, bez pseudo-elemenata) - gumb uvijek filla u teal/zelenu boju bez obzira je li kartica hoverana ili ne, samo mu se default (ne-hover) boja obruba/teksta mijenja ovisno o stanju kartice. Unutar gumba, prije teksta, nalazi se nova `.button-fill-icon` strelica-u-krugu (isti outline SVG stil kao ostale ikone na stranici, `currentColor`) koja je po defaultu skupljena na širinu 0 i providna, a na hover gumba (ne cijele kartice) širi se i postaje vidljiva ispred teksta (`width`/`margin-right`/`opacity` tranzicija, bez pseudo-elemenata). Dopuna 15. 11. 2026.: cijela kartica na hover dobiva lift efekt (`transform: translateY` prema gore za 10px, novi token `--spotlight-lift: 0.625rem`, uz pojačanu sjenu iz `--shadow-y-lg`/`--shadow-blur-lg` tokena, isti parovi tokena koji već postoje za `.hero-card`), a `.card-spotlight-icon` pločica dobiva bijeli obrub (`border-color` tranzicija s providne na `--c-white`) uz postojeću promjenu boje ikone. **Napomena (bug uočen i ispravljen pri ovoj dopuni):** prvi pokušaj lifta koristio je `calc(var(--zero) - var(--spotlight-lift))`, isti obrazac kao postojeći `calc(var(--zero) - var(--gutter))` na `.card-row-scroll` (negativna margina za full-bleed scroll na mobitelu). Taj obrazac je tehnički nevažeći CSS - oduzimanje duljine (`rem`) od bezjedinične nule nije dopušteno unutar `calc()`, pa se cijela deklaracija tiho odbacuje i vraća na initial vrijednost (`transform: none`, odnosno `margin: 0`). Za `transform` je ovo bilo odmah vidljivo (lift se nije dogodio), pa je ispravljeno na `calc(var(--spotlight-lift) * -1)` (množenje duljine s brojem je valjano). Za `.card-row-scroll` posljedica je manje uočljiva (margina ostaje 0 umjesto negativne), što znači da mobilni horizontalni scroll redovi (kartice/objave) vjerojatno nisu stvarno "full-bleed" kako je izvorno zamišljeno - vidi prijavljeni zadatak za ispravak tog obrasca na svim mjestima gdje se koristi.

**Status (14. 11. 2026.):** gotove su naslovna stranica (`index.html`, verzija 2 - vidi napomenu niže), Rješenja (`rjesenja.html`, verzija 2 - vidi napomenu niže), VoiceUP (`voiceup.html`), IntegrityLine (`integrityline.html`), Edukacije (`edukacije.html`), O nama (`o-nama.html`, verzija 2 - vidi napomenu niže), Savjetovanje (`savjetovanje.html`), Kontakt (`kontakt.html`) i Blog i novosti (`blog.html`, sadržaj izmišljen na vlasnikov izričit zahtjev - vidi napomenu niže i otvoreno pitanje 20). Ostale stranice radimo tek kad vlasnik projekta da dopuštenje, jednu po jednu ili u dogovorenim skupinama.

**Blog i novosti (14. 11. 2026.):** `blog.html` izrađen na vlasnikov zahtjev. Stari blog (https://www.codupo.hr/blog/) nije bio dostupan iz ovog okruženja (connection timeout na WebFetch, curl i Browser pane, pokušano i preko web.archive.org uz korisnikovo pitanje zašto - korisnik je tada eksplicitno rekao da izmislimo naslove objava, nazive kategorija filtra i fotografije kroz Artlist, umjesto daljnjeg pokušaja dohvata stvarnog sadržaja. **Ovo je jedino mjesto na stranici gdje je sadržaj izmišljen, a ne preuzet ili potvrđen s vlasnikom** - iznimka od pravila u poglavlju 1 ("ne izmišljamo činjenice"), izričito odobrena ovom uputom. Prikazano je 6 objava (traženo). Tri su stvarne, već ranije korištene na `index.html` (preuzete sa starog weba: Pravilnik o funkciji usklađenosti 18. 8. 2026., EU Direktiva o antikorupciji 11. 5. 2026., KPI/KRI članak 21. 1. 2026., iste slike `images/Pravilnik-o-funkcij-PU.png`/`direktiva.png`/`slika-za-danas.png`). Tri su izmišljene za ovu priliku (naslovi, datumi, kategorije i Artlist fotografije, ukupno 390 kredita, Nano Banana 2, omjer 3:2, 2K): „Zaštita prijavitelja nepravilnosti...” (3. 12. 2025., kategorija Regulativa, `images/blog-zastita-prijavitelja.png`), „Kako izgraditi kulturu integriteta...” (15. 10. 2025., Poslovna etika, `images/blog-kultura-integriteta.png`), „Zašto jednom godišnje nije dovoljno...” (2. 9. 2025., Edukacija, `images/blog-kontinuirano-ucenje.png`). **Prije stvarne objave stranice treba zamijeniti sve izmišljene naslove i opcionalno fotografije stvarnim objavama.** Filtar po kategoriji (Sve objave / Regulativa / Antikorupcija / Stručni članci / Poslovna etika / Edukacija, nazivi kategorija također izmišljeni na zahtjev) stvarno radi - obična JS skripta na dnu `blog.html` (izvan `js/components.js`, samo za ovu stranicu) prebacuje `.is-hidden` klasu na `.card-post` elementima prema `data-category` atributu i `.tag.is-active` stanju na odabranom gumbu. Ovo djelomično rješava otvoreno pitanje 8 (filtriranje bloga sad stvarno radi; kalendar edukacija i dalje ostaje samo vizualan dok se posebno ne zatraži). Nova CSS stanja: `.tag.is-active` (odabrana kategorija, teal pozadina) i `button.tag` (cursor pointer, ne utječe na `.tag` kao `<span>` na `edukacije.html`), te `.is-hidden` utility klasa (namjerno na samom kraju `styles.css` da uvijek pobijedi u cascade-u nad komponentskim pravilima kao `.card-post { display: flex }`).

**Dopuna 14. 11. 2026. (razmak i Artlist hero):** vlasnik je zatražio više razmaka između filtra kategorija i kartica objava, i Artlist pozadinu za hero u stilu ostalih stranica (dotad je `blog.html` imao običan tamni `.page-hero` jer vlasnik ranije bio tražio fotografije samo za objave, ne za hero). Dodan `.blog-filter { margin-bottom: var(--sp-7) }` (ne globalno na `.tag-row`, da ne poremeti razmak oko `.tag-row` na `edukacije.html` gdje `.month-heading` već ima vlastiti `padding-top`). Generirana `images/blog-page-hero-mesh.png` (130 kredita, Nano Banana 2, 16:9, 2K), ista plexus mreža, ikone promijenjene u četiri blog teme (olovka/uređivanje, dokument s tekstom, govorni oblačić, megafon). Nova `.page-hero-blog` CSS klasa, isti obrazac kao ostalih pet stranica s Artlist herojem.

**Kontakt (14. 11. 2026.):** `kontakt.html` izrađen prema tekstu koji je vlasnik dao izravno u chatu (adresa, e-mail, telefon, OIB, MBS, upis u sudski registar, temeljni kapital, IBAN) uz staru stranicu https://www.codupo.hr/kontakt/ kao referencu za strukturu (obrazac za upit, bez kopiranja teksta). Sekcije: page hero (`.page-hero-kontakt`, nova Artlist mesh pozadina s ikonama poruke/telefona/chata/lokacije, isti postupak kao za `rjesenja.html`/`edukacije.html`/`o-nama.html`/`savjetovanje.html`, 130 kredita), split s kontakt podacima (`.meta-list` s ikonama + `.note-box` za pravne podatke o tvrtki) i mockup kontaktnim obrascem u novoj `.form-card` kartici (ime, e-mail, predmet, poruka, checkbox „Nisam robot”, poveznica na Politiku privatnosti - vodi na `#` kao i u footeru, jer stranica politike privatnosti još ne postoji), te sekcija „Lokacija” s poveznicom na Google karte (bez iframea, prema pravilu). `<site-header>` na ovoj stranici nema `active` atribut jer Kontakt nije u `NAV_ITEMS` nego zaseban gumb (postojeći obrazac iz mape stranica, poglavlje 4). Novi CSS uzorci: `.form-card` (bijela kartica sa zlatnom gornjom trakom za sadržaj obrasca izvan centriranog `.mockup-form` konteksta), `.mockup-textarea`/`.mockup-check-row`/`.mockup-consent` (textarea i checkbox varijante mockup polja, nedostajale su), `.meta-icon` (ikona umjesto točke u `.meta-item`), `.link-plain` (obična linkana riječ u tekstu, teal boja, podcrtavanje na hover - nedostajala je za telefon/e-mail/LinkedIn poveznice izvan headera/footera).

**O nama verzija 2 (14. 11. 2026.):** `o-nama.html` potpuno presložen prema vlasnikovim gotovim tekstovima (poslanim izravno u chatu, ne kao `.docx`), koji zamjenjuju raniji sadržaj preuzet s https://codupo.hr/o-nama/. Stara verzija sačuvana je kao `o-nama-v1.html`, namjerno nigdje nepovezana (isti obrazac kao `index-v1.html`/`edukacije-v1.html`) - rekonstruirana iz razgovora jer `o-nama.html` prije ove izmjene nikad nije bio commitan u git (nema povijesti za vraćanje). Vidi poglavlje 6.11a za detalje.

**Savjetovanje (13. 11. 2026.):** `savjetovanje.html` izrađen prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Savjetovanje_web_tekstovi_i_dizajn.docx` (strukturni brief: hero, šest kartica područja u mreži 3×2, traka „Kako radimo”, kontaktni poziv; napomena „ne kopirati PECB vizualni identitet” - stranica koristi postojeći CODUPO identitet, ne PECB) i `SAVJETOVANJE.docx` (dovršeni tekstovi po pojedinom području, za buduće podstranice). Izrađena je samo pregledna stranica, u skladu s dogovorenim obrascem (jedna stranica odjednom) - vlasnik je zatražio „stranicu za savjetovanje” (jednina). Šest kartica (GAP analize, Implementacija sustava, Funkcija usklađenosti, ERM i unutarnje kontrole, Interni auditi, Poslovna etika) vodi izravno na buduće podstranice (`gap-analiza.html`, `implementacija-sustava.html`, `funkcija-uskladenosti.html`, `erm-unutarnje-kontrole.html`, `interni-auditi.html`, `poslovna-etika.html`), isti obrazac kao za VoiceUP/IntegrityLine: poveznica postoji prije stranice, gradi se kad vlasnik da dopuštenje (tekst za sve već postoji u `SAVJETOVANJE.docx`). Naslovna (`index.html`) ažurirana da njezinih šest kartica u sekciji „Savjetovanje” vodi izravno na iste buduće podstranice umjesto na `savjetovanje.html` sa ili bez sidra. „Kako radimo” traka ponovno koristi postojeći četverokoračni `.card-step` uzorak identičan onome na `o-nama.html`, radi dosljednosti. Brief traži padajući izbornik „Savjetovanje” sa šest podstranica u navigaciji - nije izrađeno, isti otvoreni arhitekturni razlog kao za Edukacije (vidi otvoreno pitanje 17).

**Ispravak razmaka u `.inhouse-body` (12. 11. 2026.):** donji razmak u kartici `.inhouse-card` (koristi se na `index.html` i `edukacije.html`) bio je vizualno prekratak ispod gumba „Saznajte više o edukaciji” iako je CSS padding bio jednak sa svih strana - gumb kao istaknut, obojen element optički djeluje bliže rubu nego tekst pri istom broju piksela. Ispravljeno asimetričnim paddingom: `padding: var(--sp-7) var(--sp-7) var(--sp-9) var(--sp-7)` na desktopu/tabletu, `var(--sp-6) var(--sp-6) var(--sp-8) var(--sp-6)` na mobitelu (donji razmak veći od ostalih). Snimke za `index.html` i `edukacije.html` osvježene na sve tri veličine.

**Edukacije verzija 2 (12. 11. 2026.):** `edukacije.html` je potpuno presložen prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Edukacije_web_tekstovi_i_dizajn.docx` (strukturni brief, traži da stranica bude lako pretraživa i da se ne mora puno skrolati) i `EDUKACIJE.docx` (dovršeni tekstovi po pojedinim temama). Stara verzija sačuvana je kao `edukacije-v1.html`, namjerno nigdje nepovezana, isti obrazac kao za `index-v1.html`. Vidi poglavlje 6.5a za detalje nove strukture.

Napomena: prvi pokušaj te večeri (nadopuna stare stranice bogatim in-house sadržajem izravno na glavnoj stranici) ispostavio se predug i suprotan briefu, koji traži kratku, pretraživu glavnu stranicu s poveznicama na zasebne kataloške podstranice. Taj pokušaj je zamijenjen pravim v2 rasporedom ispod.

**VoiceUP i IntegrityLine (12. 11. 2026.):** izrađene prema `/Users/jure/Documents/Projects/Codupo/tekstovi/RJEŠENJA.docx` (noviji, dovršeniji brief s konkretnim pravnim rokovima i FAQ odgovorima, koji nadopunjuje/precizira tekst iz `CODUPO_Rjesenja_web_tekstovi_i_dizajn.docx`). Obje su nove stranice (`active="rjesenja"`), gumbi na `rjesenja.html` sad vode na njih umjesto na „#”. Novi CSS uzorci: `.faq-list`/`.faq-item`/`.faq-question`/`.faq-icon`/`.faq-answer` (accordion na `<details>`, bez JS-a, „+” se rotira u „×” preko `[open]`), `--card-basis-duo` + `.card-row-duo` (dvije široke kartice u retku, za VoiceUP-ove dvije usluge). `rjesenja.html` dodatno nadopunjen (nije promijenjena struktura, samo dva kratka teksta pod VoiceUP/IntegrityLine karticama usklađena s preciznijom formulacijom iz novog dokumenta).

**Naslovnica verzija 2 (11. 11. 2026.):** `index.html` je potpuno presložen prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Naslovnica_web_tekstovi_i_dizajn.docx` (vlasnikov brief s gotovim tekstovima, strukturom i uputama za dizajn). Stara naslovnica sačuvana je kao `index-v1.html`, namjerno nigdje nepovezana (nema je u navigaciji ni u poveznicama), za slučaj da zatreba. Vidi poglavlje 5a za detalje nove strukture.

**Rješenja verzija 2 (12. 11. 2026.):** `rjesenja.html` je presložen prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Rjesenja_web_tekstovi_i_dizajn.docx` (vlasnikov brief). Glavna promjena: stranica sad ističe samo VoiceUP i IntegrityLine kao aktivna rješenja (svaki s kratkim opisom i gumbom prema budućoj zasebnoj podstranici), dok su IntegrityUP i ComplianceUP prikazani diskretno, označeni oznakom „U pripremi” (nova `.card-soon`/`.badge-soon` klasa), čime je riješeno otvoreno pitanje 12. Usporedna tablica iz stare verzije uklonjena je jer je brief ne predviđa u novom rasporedu. Vlasnik je potvrdio (odgovor „Možeš, pa ćemo ih kasnije lako nadopuniti”, zatim suženo na „prvo samo preslaganje glavne stranice”) da podstranice `voiceup.html` i `integrityline.html` dolaze kasnije, kad se za njih da dopuštenje - brief već sadrži gotov tekst za obje (hero, značajke/usluge, FAQ za VoiceUP, koraci za IntegrityLine), pa ih kad se krene graditi treba raditi iz tog istog dokumenta, ne iznova. Gumbi na `rjesenja.html` ("Saznajte više o VoiceUP-u", "Istražite IntegrityLine", "Uskoro više" za IntegrityUP/ComplianceUP) već vode na `voiceup.html`/`integrityline.html`/`integrityup.html`/`complianceup.html` (isti obrazac kao ranije za IntegrityUP/ComplianceUP: poveznica postoji prije nego stranica, gradi se kad vlasnik da dopuštenje). Footer (`js/components.js`) i naslovna (`index.html`) ažurirani su da VoiceUP/IntegrityLine vode izravno na te buduće stranice umjesto na sidra unutar `rjesenja.html`.

**Napomena:** od 6. 11. 2026. ne radimo git commit/push nakon svake stranice - vlasnik je jedini koji radi na ovom repozitoriju i sam upravlja commitovima. I dalje radimo provjeru pravila i snimke zaslona, samo bez git koraka na kraju.

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

- `<site-header active="kljuc">`: topbar (adresa, telefon, e-mail, LinkedIn, HR | EN) i navigacija s logom. Ključevi za `active`: `home`, `rjesenja`, `edukacije`, `savjetovanje`, `konferencija`, `blog`, `o-nama`. Gumb „Kontakt” vodi na `kontakt.html`. Redoslijed u izborniku (`NAV_ITEMS` niz): Savjetovanje, Rješenja, Edukacije, Konferencija, O nama, Blog i novosti (promijenjeno 11. 11. 2026. prema brief dokumentu za naslovnicu verziju 2, poglavlje 5a).
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
| Gumbi i poveznice | `.button-primary`, `.button-outline`, `.button-ghost`, `.button-light`, `.button-fill` (zaobljeni obrub bez pozadine, fill animacija na hover kroz `background-size`, npr. naslovna „Brzi odabir”), `.button-row`, `.link-arrow`, `.link-arrow-mark` |
| Dvostupčani raspored | `.split`, `.split-media`, `.split-content`, `.split-start`, `.split-top`, `.media-photo`, `.media-tall`, `.media-portrait` |
| Kartice | `.card-row`, `.card-row-scroll`, `.card-row-wide`, `.card-row-duo` (dvije šire kartice u retku, npr. VoiceUP usluge), `.card-solution` (+ modifikator `.card-soon` za diskretne „u pripremi” kartice, + modifikator `.card-spotlight` i specifične `.card-spotlight-savjetovanje`/`-edukacije`/`-rjesenja` za PECB-stil hover s fotografijom, samo na naslovnoj), `.card-step`, `.card-event`, `.card-value`, `.card-post`, `.card-label`, `.card-title`, `.card-text`, `.card-kicker`, `.icon-tile` (+ `.card-spotlight-icon` za ikonu koja nestaje na hover) |
| Brojke | `.stat-row`, `.stat-row-light`, `.stat-item`, `.stat-number`, `.stat-label` |
| Usluge | `.service-list`, `.service-item`, `.service-num`, `.service-title`, `.service-text` |
| Edukacije | `.event-list`, `.card-event`, `.event-date`, `.event-day`, `.event-month`, `.event-tag`, `.event-title`, `.event-meta`, `.meta-list`, `.meta-item`, `.meta-dot`, `.price` |
| Oznake | `.tag-row`, `.tag` (+ `.is-active` kad je `.tag` ujedno i klikabilan filter gumb, npr. `blog.html`), `.chip-row`, `.chip`, `.badge-soon` (diskretna „U pripremi” oznaka, npr. na `rjesenja.html`) |
| Ostalo | `.hero`, `.hero-card`, `.proof`, `.note-box`, `.inhouse-card`, `.conference`, `.book-row`, `.cta-band`, `.mockup-tag`, `.field-input` |
| Podstranice | `.page-hero`, `.breadcrumb`, `.tool-visual`, `.compare-table`, `.compare-row`, `.page-hero-rjesenja` (primjer stranici specifičnog modifikatora za `.page-hero` s Artlist pozadinom), `.month-heading` (grupiranje kalendara po mjesecima), `.faq-list`/`.faq-item`/`.faq-question`/`.faq-icon`/`.faq-answer` (accordion bez JS-a, `<details>`/`[open]`) |
| Mockup obrasci | `.mockup-form`, `.mockup-field`, `.mockup-label`, `.mockup-input` (svijetla pozadina; `.field-input`/`.newsletter-label` ostaju za tamnu pozadinu kao u footeru), `.search-row` (mockup tražilice na tamnoj pozadini, npr. hero na `edukacije.html`) |
| Raspored | `.block-stack` (okomito slaganje više blokova unutar jednog containera s razmakom, npr. dva `.split` bloka jedan ispod drugog) |

### Pregled i snimke zaslona

- Lokalni server: `python3 -m http.server 5510` (konfiguracija `codupo-static`), stranica na http://localhost:5510. Na ovom računalu `preview_start` iz Browser pane alata ne može pokrenuti Python (sandbox nema pravo na `os.getcwd()`), pa se server pokreće izravno u pozadini preko Bash alata, a preglednik se onda otvara na `http://localhost:5510/<stranica>.html`.
- Desktop, tablet i mobitel: headless Google Chrome (`--headless --window-size=<širina>,<visina> --screenshot=screens/<stranica>-<veličina>.png`), jer msedge na ovom Macu nije dostupan. Chrome ide i ispod 500px širine, pa `preview/frame.html` više nije potreban za mobilne snimke, no datoteka ostaje u repozitoriju za slučaj da zatreba.
- `min-height: 100vh` ostavlja bijeli pojas na dugim snimkama ako je stranica kraća od `--window-size` visine; visinu prozora postavljamo na stvarni `document.documentElement.scrollHeight` (izmjeren u Browser pane alatu) pa se pojas ne pojavljuje.
- Snimke idu u `screens/` kao `<stranica>-desktop.png`, `<stranica>-tablet.png`, `<stranica>-mobile.png`.
- Čitanje `.docx` brief dokumenata (npr. vlasnikovi tekstovi za stranice): `pandoc` nije instaliran na ovom računalu, pa se dokument otvara ručno - `unzip` na `word/document.xml`, pa Python (`xml`/regex) izvlači tekst i stilove (`w:pStyle`) paragraf po paragraf. Za obradu fotografija instaliran je Pillow (`pip3 install --user Pillow`) jer `sips --cropOffset` centrirano reže sliku na nepredvidiv način za precizno kadriranje.

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
| Rješenja | `rjesenja.html` | `rjesenja` | **Gotovo** (verzija 2) |
| IntegrityUP | `integrityup.html` | `rjesenja` | Čeka dopuštenje |
| ComplianceUP | `complianceup.html` | `rjesenja` | Čeka dopuštenje |
| VoiceUP | `voiceup.html` | `rjesenja` | **Gotovo** |
| IntegrityLine | `integrityline.html` | `rjesenja` | **Gotovo** |
| Edukacije | `edukacije.html` | `edukacije` | **Gotovo** (verzija 2) |
| Otvorene edukacije | `otvorene-edukacije.html` | `edukacije` | Čeka dopuštenje |
| Certifikacijski programi | `certifikacijski-programi.html` | `edukacije` | Čeka dopuštenje |
| Compliance akademija | `compliance-akademija.html` | `edukacije` | Čeka dopuštenje |
| In-house edukacije | `in-house-edukacije.html` | `edukacije` | Čeka dopuštenje |
| Ljudska strana Compliance-a | `ljudska-strana-compliancea.html` | `edukacije` | Čeka dopuštenje |
| Savjetovanje | `savjetovanje.html` | `savjetovanje` | **Gotovo** |
| GAP analize i procjene usklađenosti | `gap-analiza.html` | `savjetovanje` | Čeka dopuštenje |
| Implementacija sustava upravljanja | `implementacija-sustava.html` | `savjetovanje` | Čeka dopuštenje |
| Uspostava i razvoj funkcije usklađenosti | `funkcija-uskladenosti.html` | `savjetovanje` | Čeka dopuštenje |
| ERM i unutarnje kontrole | `erm-unutarnje-kontrole.html` | `savjetovanje` | Čeka dopuštenje |
| Interni auditi i pre-auditi | `interni-auditi.html` | `savjetovanje` | Čeka dopuštenje |
| Poslovna etika i organizacijska kultura | `poslovna-etika.html` | `savjetovanje` | Čeka dopuštenje |
| Konferencija | `konferencija.html` | `konferencija` | Čeka dopuštenje |
| Prethodne konferencije | `prethodne-konferencije.html` | `konferencija` | Čeka dopuštenje |
| Blog i novosti | `blog.html` | `blog` | **Gotovo** (sadržaj djelomično izmišljen, vidi status) |
| Članak (predložak) | `clanak.html` | `blog` | Čeka dopuštenje |
| O nama | `o-nama.html` | `o-nama` | **Gotovo** |
| Kontakt | `kontakt.html` | (nijedan, gumb Kontakt) | **Gotovo** |

Napomena: naslovna i footer trenutno vode na sidra `rjesenja.html#integrityup`, `#complianceup`, `#voiceup`, `#integrityline` i na `konferencija.html#prethodne`. Kad nastanu podstranice, te poveznice treba prebaciti na nove datoteke (ili zadržati sidra na pregledu i iz njih voditi dalje).

---

## 5. Naslovna stranica — verzija 1 (arhivirano)

Datoteka `index-v1.html`. Nije povezana nigdje (ni u navigaciji ni u poveznicama) - čuva se za slučaj da zatreba usporedba ili povratak. Snimke zaslona za ovu verziju nisu čuvane odvojeno (prepisane su s verzijom 2 u `screens/home-*.png`); sama datoteka ostaje netaknuta kao arhiva teksta i strukture.

Sekcije redom (v1):

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

Otvoreno na v1: tekst kartica IntegrityUP, ComplianceUP, VoiceUP i IntegrityLine napisan je bez izvora na starom webu i treba ga potvrditi vlasnik.

---

## 5a. Naslovna stranica — verzija 2 (trenutno aktivna, `index.html`)

Datoteka `index.html`, snimke `screens/home-desktop.png`, `home-tablet.png`, `home-mobile.png`. Potpuno presložena 11. 11. 2026. prema vlasnikovom brief dokumentu `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Naslovnica_web_tekstovi_i_dizajn.docx` (gotovi tekstovi, struktura i upute za dizajn/developera). Dokument je otvoren preko `pandoc`/ručne XML ekstrakcije jer `pandoc` nije instaliran na računalu (vidi poglavlje 3, Alati).

**Globalna promjena:** `NAV_ITEMS` u `js/components.js` promijenjen je u novi redoslijed iz brief dokumenta: Savjetovanje, Rješenja, Edukacije, Konferencija, O nama, Blog i novosti (Kontakt ostaje zaseban gumb kao i prije). Ovo utječe na header na SVIM stranicama, ne samo naslovnicu.

**Novi CSS uzorci:** `--card-basis-wide` token + `.card-row-wide` klasa (forsira 3 kartice po retku kroz flexbox za mrežu od 6 kartica, bez CSS grida).

**Dizajn napomena iz briefa, primijenjena posvuda:** na mobitelu se kartice slažu jedna ispod druge (obično stacking), **ne** horizontalni scroll-snap redovi kakvi se koriste na ostalim stranicama - `.card-row-scroll` namjerno nije korišten nigdje u verziji 2.

Sekcije redom (v2):

1. **Hero** (`.hero`): pozadina promijenjena na `Eksternalizirana-funkcija.png` (autentična fotografija poslovne suradnje, po uputi iz briefa). Nadnaslov „CODUPO · Compliance · Rizici · Poslovna etika”, H1 „Od zahtjeva do učinkovitih sustava. Od vrijednosti do odgovornog poslovanja.”, dva gumba (Istražite savjetodavne usluge / Pronađite edukaciju). Bez kartice „Sljedeća edukacija” - uklonjena po uputi „bez velikog popisa ISO normi” i radi jednostavnosti (dva jasna gumba, bez dodatnih elemenata). **Dopuna 17. 11. 2026.:** ovaj jedinstveni hero zamijenjen je rotirajućim sliderom od tri najave (`.hero-slider`) - ovaj sadržaj je sad samo srednji slajd „Naslovna poruka”, nepromijenjen. Detalji novog slidera u napomeni na vrhu datoteke.
2. **Brzi odabir**: „Stručna podrška za odgovornije i otpornije poslovanje”. Tri `.card-solution` (Savjetovanje, Edukacije, Rješenja), od 15. 11. 2026. s PECB-stil hover interakcijom (fotografija, nestajuća ikona, bijeli tekst, `.button-fill` gumb) - vidi napomenu na vrhu datoteke.
3. **Savjetovanje, šest područja** (`.section-soft`): „Stručnost koja se pretvara u konkretne rezultate”. Šest `.card-solution` u `.card-row-wide` (3×2 kroz flexbox): GAP analize, Implementacija sustava, Funkcija usklađenosti, ERM i unutarnje kontrole, Interni auditi, Poslovna etika i kultura. Od 13. 11. 2026. poveznice vode izravno na šest budućih podstranica savjetovanja (vidi poglavlje 6.6), isti obrazac kao za VoiceUP/IntegrityLine na Rješenjima - prije su vodile na `savjetovanje.html` sa sidrima, no otkad `savjetovanje.html` postoji kao prava pregledna stranica, logičnije je voditi izravno na krajnje odredište.
4. **Zašto CODUPO**: slika `SilvijaVig202211-scaled.jpg`, četiri argumenta (`.service-item` uzorak, strelica umjesto broja), gumb „Upoznajte CODUPO” → `o-nama.html`.
5. **Edukacije** (`.section-soft`): tri `.card-solution` (kategorije) + stvarni „najbliži termini” (3 najbliža termina od 11. 11. 2026. nadalje, preuzeta iz `edukacije.html` kalendara: 27.11., 30.11.-3.12., 4.12.). Brief traži „dinamički modul”, no stranica je statična (bez build koraka) - termini su ručno upisani s datumom izrade i trebaju se ažurirati kad prođu.
6. **Istaknuta edukacija**: „Ljudska strana compliancea”, jedan `.inhouse-card` (ponovno iskorišten kao širok horizontalni blok, slika `sto-je-posao-CO.png`).
7. **Rješenja koja podržavaju integritet**: SAMO VoiceUP i IntegrityLine (dva `.card-solution`). IntegrityUP i ComplianceUP namjerno izostavljeni s naslovnice po izričitoj uputi iz briefa („ne prikazivati kao aktivne proizvode”). Oznaku „U pripremi” za njih brief traži na stranici Rješenja (`rjesenja.html`), ne na naslovnici - to još nije napravljeno, vidi otvoreno pitanje niže.
8. **Iskustvo i povjerenje** (`.proof`): tri potvrđena broja (9+ zemalja, 185+ programa, 2050+ sudionika) - četvrti broj iz briefa („XX+ savjetodavnih klijenata”) izostavljen jer ne postoji potvrđen podatak (vidi otvoreno pitanje).
9. **Compliance konferencija** (`.conference`): sljedeće izdanje „Compliance konferencija 2027., 28. rujna 2027.” - datum preuzet izravno iz briefa (prvi put dobivena potvrda datuma 2027., rješava otvoreno pitanje 2 iz poglavlja 7).
10. **Stručni uvidi i novosti** (ista tri članka kao v1, blog nije dinamički - statična stranica).
11. **Završni poziv**: „Razgovarajmo o izazovima vaše organizacije”, jedan gumb „Kontaktirajte nas”, bez obrasca.

**SEO:** `<title>` i meta opis postavljeni točno prema poglavlju 13 briefa.

---

## 6. Plan za preostale stranice

Za svaku stranicu vrijedi:

- Header i footer su komponente.
- Prva sekcija je **page hero**: kraći od naslovnog hera, s nadnaslovom, H1, jednom rečenicom i po potrebi „mrvicama” (Početna / Stranica).
  - Treba dodati novi uzorak `.page-hero` (+ `.breadcrumb`), jednom, i koristiti ga na svim podstranicama.
- Stranica završava `.cta-band` trakom s porukom prilagođenom toj stranici.
- Snimke za desktop, tablet i mobitel idu u `screens/`.

### 6.1 Rješenja (`rjesenja.html`) — verzija 1 (arhivirano)

Napomena: ovo poglavlje opisuje prvu verziju stranice (do 11. 11. 2026.), zamijenjenu verzijom 2 prema briefu za Rješenja - vidi poglavlje 6.1a. Tekst ostaje ovdje kao povijesni zapis (fotografije, otvorena pitanja o slikama i dalje vrijede, jer ih verzija 2 ponovno koristi za preostale dvije aktivne kartice).

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

### 6.1a Rješenja (`rjesenja.html`) — verzija 2 (trenutno aktivna, 12. 11. 2026.)

Presložena prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Rjesenja_web_tekstovi_i_dizajn.docx`. Svrha se sužava: stranica sad ističe samo dva aktivna rješenja (VoiceUP, IntegrityLine) i diskretno najavljuje dva u razvoju (IntegrityUP, ComplianceUP), umjesto da sva četiri prikazuje kao ravnopravna. Usporedna tablica uklonjena jer brief ne predviđa taj element u novom rasporedu stranice.

Sekcije (redoslijed 2 i 3 obrnut 18. 11. 2026. - vidi dopunu niže; ovdje je već naveden trenutni, ispravan redoslijed):

1. Page hero (`.page-hero-rjesenja`, isti mesh kao v1): „Rješenja koja olakšavaju odgovorno poslovanje” + rečenica iz briefa.
2. **U pripremi**: dvije diskretne kartice (`.card-solution.card-soon`, nova `.badge-soon` oznaka „U pripremi”) za IntegrityUP i ComplianceUP, s poveznicom „Uskoro više” prema `integrityup.html`/`complianceup.html`. Sidra `#integrityup`/`#complianceup` zadržana.
3. **Aktivna rješenja**: dva `.split` bloka (izmjenični lijevo/desno, iste fotografije kao v1 - `Slider01.jpg` za VoiceUP, `codupo-edukacije-discussion.jpg` za IntegrityLine), svaki s kratkim tekstom iz briefa (bez popisa značajki - taj detalj ide na buduće podstranice) i gumbom koji vodi na `voiceup.html`/`integrityline.html`. Sidra `#voiceup`/`#integrityline` zadržana radi postojećih poveznica.
4. Kratka poruka o povezanosti stručnosti (VoiceUP) i tehnologije (IntegrityLine), `.note-box`.
5. CTA: „Razgovarajmo o potrebama vaše organizacije”.

Otvoreno: `voiceup.html` i `integrityline.html` još ne postoje kao stvarne datoteke - brief već sadrži gotov tekst za obje (vidi poglavlja 6.4 i novo poglavlje za IntegrityLine), grade se kad vlasnik da dopuštenje.

**Dopuna 18. 11. 2026. (redoslijed obrnut, opisni tekst uklonjen s IntegrityUP/ComplianceUP kartica):** na vlasnikov izričit zahtjev, „U pripremi” sekcija (IntegrityUP, ComplianceUP) sad dolazi PRIJE „Aktivna rješenja” (VoiceUP, IntegrityLine) - obrnuto od prvotnog redoslijeda. Dodatno, s obje kartice IntegrityUP i ComplianceUP uklonjen je sav opisni tekst koji je otkrivao ČIME se alati bave: podnaslov iza „·” u naslovu („· Digitalne edukacije” / „· Digitalni alati za usklađenost”) i cijeli `<p class="card-text">` opis su obrisani. Kartice sad prikazuju samo ikonu, `.badge-soon` oznaku „U pripremi”, goli naziv alata (bez podnaslova) i poveznicu „Uskoro više” - vlasnik je izričito naveo da ne želi otkriti „šta pripremam” prije vremena. Ikone (kapa za IntegrityUP, dokument za ComplianceUP) namjerno nisu mijenjane niti uklanjane - apstraktne su, ne otkrivaju ništa konkretno. Naslov sekcije „Alati u razvoju” i uvodna rečenica „IntegrityUP i ComplianceUP trenutno razvijamo...” zadržani nepromijenjeni jer ne otkrivaju funkcionalnost, samo nazive.

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

### 6.4 VoiceUP (`voiceup.html`) — Gotovo

Vanjska povjerljiva osoba i zaštita dostojanstva radnika. Konačan tekst (hero, dvije zasebno prikazane usluge s pravnim osnovama, „Zašto VoiceUP”/„Što dobivate” u pet točaka, FAQ s 5 pitanja i pravnim referencama, CTA) preuzet je iz `/Users/jure/Documents/Projects/Codupo/tekstovi/RJEŠENJA.docx` (noviji, precizniji dokument - sadrži i stvarne rokove: 7 dana potvrda primitka, 30 odnosno najkasnije 90 dana povratna informacija za prijave nepravilnosti, 8 dana za pritužbe zbog uznemiravanja). Prvi brief dokument (`CODUPO_Rjesenja_web_tekstovi_i_dizajn.docx`) poslužio je samo za raspored stranice.

1. Page hero (obična tamna `.page-hero`, bez posebne Artlist pozadine): „Neovisnost. Povjerljivost. Stručno postupanje.” + CTA „Zatražite informacije o VoiceUP-u”.
2. Dvije usluge u odvojenim širim karticama (`.card-row-duo`, novi `--card-basis-duo` token), pravne osnove nisu spojene: 1. vanjska povjerljiva osoba (Zakon o zaštiti prijavitelja nepravilnosti) i 2. vanjska osoba za zaštitu dostojanstva radnika (čl. 134. Zakona o radu), svaka s popisom aktivnosti (`.meta-list`).
3. „Zašto VoiceUP” (`.split`) + „Što dobivate” (pet koristi, `.service-list` uzorak).
4. Česta pitanja, accordion (`.faq-list`/`<details>`, 5 pitanja), s izvorom na dnu: Zakon o zaštiti prijavitelja nepravilnosti (NN 46/22, 136/25) i čl. 134. Zakona o radu.
5. CTA: „Povjerenje počinje sigurnošću da će netko saslušati i odgovorno postupiti.”

### 6.4a IntegrityLine (`integrityline.html`) — Gotovo

Nova podstranica (prije je IntegrityLine imao samo sidro na `rjesenja.html`; brief za Rješenja ga sad tretira kao zasebnu stranicu). Konačan tekst u `RJEŠENJA.docx`. Napomena iz prvog briefa i dalje vrijedi: nema generičke lažne snimke softvera u hero sekciji dok ne postoji stvarna snimka sučelja (vidi otvoreno pitanje 16) - koristi se obična tamna `.page-hero` pozadina.

1. Page hero: „Siguran kanal za prijavu. Povjerljiva komunikacija. Više povjerenja.” + CTA „Zatražite prezentaciju rješenja”.
2. Šest kartica značajki (`.card-row-wide`, 3×2): povjerljivost i anonimnost, jednostavno podnošenje, dvosmjerna komunikacija, praćenje postupanja, kontrolirani pristup, podrška usklađenosti (GDPR + zaštita prijavitelja - šesta točka je nova naspram prvog briefa).
3. „Kako funkcionira”, tri koraka (`.card-step`): prijava, komunikacija, postupanje.
4. „Zašto IntegrityLine” + „Što dobivate” (`.split`, isti obrazac kao na VoiceUP stranici).
5. Nenametljiv blok o povezanosti s VoiceUP uslugom (`.note-box`).
6. CTA: „Želite uspostaviti siguran digitalni kanal za prijavljivanje nepravilnosti?”

### 6.5 Edukacije (`edukacije.html`) — verzija 1 (arhivirano)

Napomena: ovo poglavlje opisuje prvu verziju stranice (do 12. 11. 2026., sačuvana kao `edukacije-v1.html`), zamijenjenu verzijom 2 - vidi poglavlje 6.5a. Kalendar i PECB sadržaj ostaju povijesno točni i u v2 (ponovno korišteni), opis ispod čuva se kao zapis stare, duže jednodijelne strukture.

Dvije cjeline: kalendar otvorenih edukacija i programi za organizacije.

Sadržaj kalendara preuzet je doslovno s https://codupo.hr/plan-edukacija/ (6. 11. 2026.): 14 termina, studeni 2026. do veljača 2027. Linkovi pojedinih edukacija („Prijava”, „Više o programu”) namjerno vode na `#` jer još nema podstranica za svaku edukaciju ni stvarnih WordPress ciljnih stranica koje bismo mogli linkati. Jedan termin (Korporativno upravljanje i Compliance) na izvornoj stranici nema točan datum, samo „veljača 2027.” - to je prikazano doslovno, bez izmišljanja dana.

1. Page hero: „Edukacije”, gumbi-sidra „Kalendar” i „Programi za organizacije”.
2. **Kalendar otvorenih edukacija** (`#kalendar`):
   - Filtar po vrsti kao vizualni čipovi (`.tag-row`), trenutno samo vizualan, bez JS filtriranja (otvoreno pitanje 8).
   - Popis `.card-event` grupiran po mjesecima (`.month-heading`): datum, naziv, format, trajanje, cijena, gumb „Prijava” i poveznica „Više o programu”.
3. **PECB certifikacije**: Silver Partner značka + četiri `.card-solution` (ISO 37301, ISO 37001, ISO 31000, GDPR DPO), razine Lead Implementer/Lead Auditor/Foundation prema popisu s naslovne stranice codupo.hr (izbornik Edukacije → Certifikacije). ISO 37002 certifikacija nije bila na popisu pa nije dodana ovdje.
4. **Programi za organizacije** (`#programi`): in-house radionice @Work, slika `sto-je-posao-CO.png`, gumb „Zatražite ponudu”.
5. **Mockup prijave na edukaciju**: ime, organizacija, e-mail, odabrani termin.
6. Izjave polaznika: preskočeno, nema stvarnih izjava na starom webu koje smo pronašli (otvoreno pitanje 9).
7. CTA: „Imate pitanje o terminima ili grupnoj prijavi?”.

### 6.5a Edukacije (`edukacije.html`) — verzija 2 (trenutno aktivna, 12. 11. 2026.)

Potpuno presložena prema `/Users/jure/Documents/Projects/Codupo/tekstovi/CODUPO_Edukacije_web_tekstovi_i_dizajn.docx` (strukturni brief - traži da stranica bude lako pretraživa na desktopu i mobitelu, bez dugog skrolanja i bez dugačkog padajućeg izbornika) i `EDUKACIJE.docx` (dovršeni tekstovi po temama, iskorišteni za listu stvarnih naziva edukacija po kategorijama). Glavna razlika od v1: dugi sadržaj (puni popisi tema, puna in-house priča) premješten je iz glavne stranice u poveznice prema zasebnim kataloškim podstranicama (po istom obrascu kao IntegrityUP/VoiceUP - poveznica postoji prije stranice, stranica se gradi kad vlasnik da dopuštenje), a glavna stranica ostaje kratka: hero s tražilicom, četiri ulazne kategorije, izdvojeni termini, pa tek onda puni kalendar.

Sekcije:

1. Page hero: „Znanje koje se primjenjuje. Kompetencije koje stvaraju vrijednost.” + mockup tražilice (`.search-row`, novi uzorak - input + gumb „Pretraži”, s `.mockup-tag` jer ne filtrira stvarno) + dva CTA gumba „Pregled edukacija” (`#nacini`) i „Kalendar termina” (`#kalendar`).
2. **Odaberite način učenja** (`#nacini`): četiri `.card-solution` - Otvorene edukacije → `otvorene-edukacije.html`, Certifikacijski programi → `certifikacijski-programi.html`, Compliance akademija → `compliance-akademija.html`, In-house edukacije → `in-house-edukacije.html` (nijedna od ove četiri podstranice još ne postoji).
3. **Izdvojene edukacije**: tri `.card-event` s najbližim potvrđenim terminima (isti podaci kao u kalendaru ispod, bez dupliciranja novih činjenica), gumb „Detalji i prijava” vodi na `#kalendar` jer još nema zasebne detaljne stranice po edukaciji (predložak iz briefa, poglavlje 06, nije izrađen).
4. **Kalendar** (`#kalendar`): nepromijenjen stvaran sadržaj (14 termina) iz v1, uz dodani vizualni prikaz „Lista / Kalendarski prikaz (uskoro)” (samo „Lista” stvarno postoji - pošteno označeno kao „uskoro”, ne lažni prikaz) i prošireni tematski filtri iz briefa (Usklađenost, Upravljanje rizicima, Antikorupcija i etika, ISO standardi, GDPR, Državna poduzeća), i dalje samo vizualni, bez JS filtriranja.
5. **PECB certifikacije**: nepromijenjeno iz v1.
6. **In-house edukacije** (`#programi`): kratak uvod (2 rečenice) + gumb „Zatražite in-house program” → `in-house-edukacije.html`, zatim jedna `.inhouse-card` kartica koja najavljuje „Ljudska strana Compliance-a” → `ljudska-strana-compliancea.html` (isti obrazac kao na naslovnoj, puni tekst te edukacije premješten je s glavne stranice na tu buduću podstranicu).
7. Mockup prijave na edukaciju: nepromijenjeno iz v1.
8. CTA: „Imate pitanje o terminima ili grupnoj prijavi?”, nepromijenjeno.

Novi CSS uzorak: `.search-row` (flex red za mockup tražilicu, stupac na mobitelu).

Otvoreno: pet poveznica (`otvorene-edukacije.html`, `certifikacijski-programi.html`, `compliance-akademija.html`, `in-house-edukacije.html`, `ljudska-strana-compliancea.html`) vodi na stranice koje još ne postoje - brief već ima gotov tekst za sve (poglavlja 03-08), grade se kad vlasnik da dopuštenje. Podizbornik u headeru (Sve edukacije / Kalendar / Certifikacijski programi / Compliance akademija / In-house edukacije), koji brief traži u glavnoj navigaciji, nije izrađen - trenutna `<site-header>` komponenta nema padajuće podizbornike, to bi bila veća arhitekturna promjena (vidi otvoreno pitanje 17).

### 6.6 Savjetovanje (`savjetovanje.html`) — Gotovo

Izrađena 13. 11. 2026. prema `CODUPO_Savjetovanje_web_tekstovi_i_dizajn.docx` (strukturni brief) i `SAVJETOVANJE.docx` (dovršeni tekstovi po području, čuvaju se za šest budućih podstranica). Raspored prati brief doslovno, bez dodavanja elemenata koje brief ne traži (npr. ISO oznake ili PECB značka na preglednoj stranici nisu dio ovog briefa - za razliku od ranijeg, prednacrtnog plana koji je ovo poglavlje prije sadržavalo).

1. Page hero (`.page-hero-savjetovanje`, Artlist mesh pozadina dodana 14. 11. 2026. na vlasnikov zahtjev - vidi otvoreno pitanje 3, bez gumba u herou - isti obrazac kao `rjesenja.html`): nadnaslov „Savjetovanje”, H1 „Stručna rješenja za odgovornije i učinkovitije poslovanje”, uvodni tekst doslovno iz briefa.
2. **Šest područja savjetovanja** (`.card-row-wide`, 3×2): GAP analize i procjene usklađenosti, Implementacija sustava upravljanja, Uspostava i razvoj funkcije usklađenosti, Integrirano upravljanje rizicima i unutarnje kontrole, Interni auditi i pre-auditi, Poslovna etika i organizacijska kultura. Svaka kartica ima naslov, jednu rečenicu iz briefa i poveznicu „Saznajte više” prema budućoj podstranici (vidi tablicu u poglavlju 4) - isti obrazac kao VoiceUP/IntegrityLine: poveznica postoji prije stranice, tekst za podstranice već gotov u `SAVJETOVANJE.docx`.
3. **Kako radimo**: identičan četverokoračni `.card-step` blok kao na `o-nama.html` (Razgovor i analiza / Plan i dizajn / Uvođenje i edukacija / Praćenje i poboljšanje), radi dosljednosti kroz stranice.
4. CTA: „Razgovarajmo o potrebama vaše organizacije”.

Otvoreno: brief traži padajući izbornik „Savjetovanje” sa šest podstranica u glavnoj navigaciji - nije izrađeno, isti arhitekturni razlog kao za Edukacije (vidi otvoreno pitanje 17). Šest podstranica (`gap-analiza.html`, `implementacija-sustava.html`, `funkcija-uskladenosti.html`, `erm-unutarnje-kontrole.html`, `interni-auditi.html`, `poslovna-etika.html`) grade se kad vlasnik da dopuštenje.

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

### 6.9 Blog i novosti (`blog.html`) — Gotovo

Izrađena 14. 11. 2026. Raniji nacrt ispod (tri kategorije iz briefa, istaknuti članak, IntegrityTalk blok, newsletter, paginacija) zamijenjen je jednostavnijom strukturom jer vlasnik nije dao brief dokument za ovu stranicu, nego je zatražio direktno u chatu: popis objava i filtar po kategoriji, 6 objava, uz izmišljen sadržaj gdje stvaran nije bio dostupan (stari blog je bio nedohvatljiv iz ovog okruženja - vidi status napomenu na vrhu datoteke i otvoreno pitanje 20). Stvarna struktura:

1. Page hero: obična tamna `.page-hero` (bez Artlist pozadine), eyebrow „Blog i novosti”, H1 „Stručni uvidi i aktualnosti iz svijeta usklađenosti”.
2. „Pregledajte objave po temi”: `.tag-row` od šest `.tag` gumba (Sve objave + pet kategorija), funkcionalan filtar (vidi status napomenu za tehničke detalje).
3. `.card-row` od 6 `.card-post` kartica (tri stvarne s naslovne, tri izmišljene), svaka s `data-category` atributom koji filtar koristi.
4. CTA: „Imate pitanje ili prijedlog teme za sljedeći članak?”.

Izostavljeno naspram starog nacrta (nije traženo, izbjegnuto širenje opsega): istaknuti članak, IntegrityTalk blok, newsletter poziv (već postoji u footeru na svakoj stranici), paginacija. Pojedinačne stranice članaka (`clanak.html` predložak, poglavlje 6.10) i dalje čekaju dopuštenje - gumbi „Pročitajte” trenutno vode na `#`.

### 6.10 Članak, predložak (`clanak.html`)

1. Mrvice, kategorija, datum, naslov, autor.
2. Naslovna slika.
3. Tekst članka (uska kolona za čitljivost, stilovi za podnaslove, liste, citate; citat s pravim elementom za oznaku).
4. Autor (kratka biografija).
5. Povezani članci (3 × `.card-post`).
6. CTA.

Sadržaj za predložak: jedan stvarni članak sa starog weba (npr. o Pravilniku od 18. 8. 2026.).

### 6.11 O nama — verzija 1 (arhivirano)

Datoteka `o-nama-v1.html`. Nije povezana nigdje (ni u navigaciji ni u poveznicama) - isti obrazac arhiviranja kao `index-v1.html`/`edukacije-v1.html`. Sadržaj preuzet doslovno s https://codupo.hr/o-nama/ (6. 11. 2026., WebFetch sažetak, ne puni citat). Šest cjelina:

1. Page hero: „O nama”, s objašnjenjem naziva (COmplianceom DO Uspješnog POslovanja).
2. **Tko smo**: ime i akronim, „a one stop shop for compliance & ethics”, kome pomažemo (državna poduzeća i javni sektor, financijski sektor, velike i srednje organizacije), 9 zemalja.
3. **Kako radimo**: ista četiri koraka kao na naslovnoj (`.card-step`), ponovljeno doslovno.
4. **Misija, vizija, vrijednosti**: misija i vizija preuzete sa stranice (sažetak, vlasnik ima punu verziju), tri `.card-value` isti tekst kao na naslovnoj radi dosljednosti.
5. **Ljudi iza CODUPO-a**: Silvija Vig (kraća biografija) i Ljiljana Hrastinski Jurčec (kraća biografija), oboje `.tag-row` s članstvima (ICC Hrvatska, INA Grupa, Sudačko vijeće, Pravosudna akademija, HGK).
6. **Dokazi iskustva**: `.proof`/`stat-row` (9+ zemalja, 2050+ polaznika, 185+ programa, 25+ godina).
7. **Autorski rad i doprinos struci**: knjiga „Poslovna etika”, i 15 predavanja/panela 2018. do 2024. sa stranice (`.service-item` uzorak, godina umjesto rednog broja), uključujući stvarnu YouTube poveznicu na PECB Anti-Bribery Conference 2022. panel (https://youtu.be/MxXXvXxnxPk, s playlist i vremenskom oznakom).
8. CTA: „Upoznajmo se”.

### 6.11a O nama — verzija 2 (trenutno aktivna, 14. 11. 2026.)

Datoteka `o-nama.html`, snimke `screens/o-nama-*.png`. Potpuno presložena prema vlasnikovim gotovim tekstovima, poslanim izravno u chatu (ne kao `.docx` brief poput ostalih stranica). Struktura i redoslijed sekcija isti kao v1, ali gotovo sav tekst zamijenjen, znatno proširen (puni certifikati i reference za oboje iz tima), s nekoliko elemenata namjerno izostavljenih jer ih novi tekst ne spominje:

1. **Page hero**: nadnaslov „O nama”, H1 „Stručnost koja donosi promjenu. Integritet koji stvara vrijednost.”, dva odvojena odlomka uvoda. Objašnjenje naziva (COmplianceom DO Uspješnog POslovanja) izostavljeno jer ga novi tekst ne sadrži.
2. **Tko smo**: nova tri odlomka, bez starog `.meta-list` popisa (novi tekst ne daje jasnu listu segmenata) i bez citata „a one stop shop for compliance & ethics” (nije u novom tekstu). Ista fotografija (`Eksternalizirana-funkcija.png`).
3. **Kako radimo**: namjerno odstupa od zajedničkog četverokoračnog `.card-step` uzorka (koji i dalje koriste `index.html` i `savjetovanje.html`) - novi tekst za ovu stranicu daje četiri NAČELA, ne četiri koraka procesa (Razumijevanje poslovanja, Prilagođena rješenja, Praktična implementacija, Prijenos znanja). Prikazano kroz postojeći `.service-list` uzorak (01-04) umjesto `.step-row`, uz uvodni i dva završna odlomka kao `.section-lead`.
4. **Misija, vizija, vrijednosti**: nov tekst za misiju i viziju; tri `.card-value` zadržane, ali preslagane po novom redoslijedu (Integritet, Izvrsnost, Inovativnost - prije Integritet, Inovativnost, Izvrsnost) i s novim opisima.
5. **Naš tim**: bitno proširene biografije oboje (Silvija Vig: puni popis certifikata CCEP-I/LPEC/ISO 37301/37001/31000/COSO ERM/DPO/Executive Coach/NLP/CTT/medijatorica, konkretni projekti uključujući prvo hrvatsko državno poduzeće certificirano prema ISO 37301, RIT Croatia predavanja; Ljiljana Hrastinski Jurčec: detaljnija sudačka karijera, povjerenstva Ministarstva pravosuđa). Dodan nov kratak `.note-box` „Stručna suradnja i partnerstva”. Stari `.tag-row` s članstvima uklonjen jer se dio podataka u njemu (Sudačko vijeće trgovačkih sudova, Pravosudna akademija) ne poklapa točno s novim, preciznijim biografijama - izbjegnuto dupliciranje potencijalno zastarjelog podatka.
6. **Iskustvo i reference** (preimenovano s „Dokazi iskustva”): nova tri uvodna odlomka (industrije klijenata, opseg usluga, napomena da detalji dolaze na upit) kao `.section-lead`, zatim nepromijenjen `.proof`/`stat-row` (9+ zemalja, 2050+ polaznika, 185+ programa, 25+ godina) - vidi otvoreno pitanje 18 za novi predloženi raspis brojki koji nije primijenjen.
7. **Autorski rad i doprinos struci**: naslov i uvod promijenjeni („Znanje dijelimo. Struku razvijamo.”), stari detaljni popis 15 predavanja/panela 2018.-2024. (uključujući YouTube poveznicu na PECB Anti-Bribery Conference 2022.) zamijenjen novim sažetim popisom pet kategorija doprinosa (Knjige i publikacije, Istraživanja, Međunarodna suradnja, Predavanja i stručni nastupi, Compliance konferencija) kroz `.service-list`. Korica knjige „Poslovna etika” zadržana (`PoslovnaEtika2023-3D.png”) - vidi otvoreno pitanje 19 za dodatne dvije knjige koje vlasnik spominje.
8. CTA: nepromijenjeno („Upoznajmo se”).

Novi CSS uzorak (nasljeđen iz v1): `.block-stack` za okomito slaganje više `.split` blokova unutar jedne sekcije bez inline stilova. Nema novih CSS uzoraka u v2 - sve ponovno iskorišteno iz postojećih klasa (`.service-list`, `.note-box`, `.section-lead`).

### 6.12 Kontakt (`kontakt.html`) — Gotovo

Izrađena 14. 11. 2026. prema tekstu koji je vlasnik dao izravno u chatu, uz staru stranicu https://www.codupo.hr/kontakt/ kao strukturnu referencu (ne kao izvor teksta). Stvarna struktura:

1. Page hero (`.page-hero-kontakt`, Artlist mesh pozadina s ikonama poruke/telefona/chata/lokacije): eyebrow „Kontakt”, H1 „Razgovarajmo o potrebama vaše organizacije”, uvodna rečenica. `<site-header>` bez `active` atributa (Kontakt nije u `NAV_ITEMS`, zaseban je gumb).
2. Dvostupčani `.split`:
   - **Lijevo:** „CODUPO d.o.o.” naslov, `.meta-list` s ikonama (adresa, telefon kao `tel:` poveznica, e-mail kao `mailto:` poveznica, LinkedIn), zatim `.note-box` s pravnim podacima o tvrtki (OIB, MBS, upis u sudski registar, temeljni kapital, IBAN i banka) - doslovno prema tekstu koji je dao vlasnik.
   - **Desno:** `.form-card` (nova klasa, bijela kartica sa zlatnom gornjom trakom) s mockup obrascem: ime i prezime, e-mail, predmet, poruka (textarea), checkbox „Nisam robot”, rečenica s poveznicom na Politiku privatnosti (vodi na `#`, kao i istoimena poveznica u footeru - stranica politike privatnosti još ne postoji), gumb „Pošaljite poruku” (`type="button"`). Sve označeno `.mockup-tag` „Mockup obrasca, ne šalje podatke”.
3. Sekcija „Lokacija”: adresa i jedna rečenica, gumb „Otvori u Google kartama” (`.button-outline`, vanjska poveznica na Google Maps pretragu stvarne adrese, bez iframea).

Stranica se namjerno ne završava `.cta-band` trakom (sama je odredište za sve druge CTA pozive na stranici) i nema FAQ sekciju iz ranijeg nacrta ovog poglavlja - nije bilo potvrđenih odgovora (trajanje/besplatnost uvodnog razgovora), pa nije izmišljeno (vidi otvoreno pitanje 15, "ne izmišljamo činjenice" u poglavlju 1).

---

## 7. Otvorena pitanja za vlasnika

1. ~~Potvrda teksta za IntegrityUP, ComplianceUP, VoiceUP i IntegrityLine (opisi su sada napisani bez izvora).~~ Djelomično riješeno 12. 11. 2026.: VoiceUP i IntegrityLine sad imaju gotov, vlasnikov tekst u brief dokumentu za Rješenja (poglavlja 2 i 3). IntegrityUP i ComplianceUP i dalje čekaju - brief ih namjerno ne razrađuje jer alati još nisu spremni.
2. ~~Konferencija: prikazati 2026. kao održanu ili najaviti 2027.? Ima li datum i tema za 2027.?~~ Riješeno 11. 11. 2026. brief dokumentom: naslovnica v2 najavljuje „Compliance konferencija 2027., 28. rujna 2027.” Temu za 2027. i status prijava brief izričito traži ažurirati prije objave (vidi otvoreno pitanje 15).
3. ~~Smijemo li koristiti Artlist za zamjenu loših fotografija (troši kredite)?~~ Vlasnik je 6. 11. 2026. odobrio: generirane su `images/rjesenja-page-hero-mesh.png`, `images/edukacije-page-hero-mesh.png` i `images/o-nama-page-hero-mesh.png` (ilustrirane mreže s tematskim ikonama, stil prema conference.codupo.hr) za `.page-hero` pozadine na te tri stranice, ukupno 520 Artlist kredita (4 generacije, 130 svaka). Vlasnik je ponovno odobrio 14. 11. 2026. za Savjetovanje: generirana `images/savjetovanje-page-hero-mesh.png` (Nano Banana 2, 16:9, 2K, 130 kredita), ista plexus mreža, ikone promijenjene u šest tema savjetovanja (povećalo, zupčanik, kompas, grafikon rasta, podsjetnik s kvačicom, rukovanje). Nova `.page-hero-savjetovanje` CSS klasa, isti obrazac kao ostale tri. Vlasnik je sam zatražio Artlist generaciju 14. 11. 2026. za Kontakt ("Slobodno se koristi artlist alatom"): generirana `images/kontakt-page-hero-mesh.png` (Nano Banana 2, 16:9, 2K, 130 kredita), ista plexus mreža, ikone promijenjene u četiri kontakt teme (poruka/e-mail, telefon, chat, lokacija). Nova `.page-hero-kontakt` CSS klasa, isti obrazac kao ostale četiri. Za daljnju upotrebu na drugim stranicama treba ponovno pitati, dogovor vrijedi po slučaju.
4. Licence za Shutterstock fotografije na novom webu. Četiri slike bez `shutterstock_` oznake su u upotrebi na `rjesenja.html` (`compliance-bez-ičega-scaled.jpg`, `codupo-edukacije-checking-results.jpg`, `Slider01.jpg`, `codupo-edukacije-discussion.jpg`) uz vlasnikovo dopuštenje da koristimo najbolje dostupno iz `assets-src/`, ali izvor/licenca tih četiriju nije posebno provjerena.
5. Smijemo li prikazati logotipe klijenata?
6. Format IntegrityTalka (podcast, video, članci).
7. Engleska verzija: preklopnik HR | EN postoji u headeru, ali EN stranice nisu u planu. Radimo li ih?
8. ~~Treba li filtriranje kalendara i bloga stvarno raditi (JS) ili ostaje vizualno?~~ Djelomično riješeno 14. 11. 2026.: filtar na `blog.html` sad stvarno radi (vidi poglavlje 6.9). Kalendar edukacija (`edukacije.html`) ostaje samo vizualan dok se posebno ne zatraži.
9. Postoje li stvarne izjave polaznika edukacija za objavu na `edukacije.html`? Nismo ih našli na starom webu.
10. Puni tekst misije i vizije na `o-nama.html` je sažetak (WebFetch nije dao doslovni citat pune dužine) - treba li ga zamijeniti točnim tekstom sa stranice?
11. Postoji li YouTube ili drugi link za video „Meet the Trainer, Silvija Vig” spomenut na starom webu? WebFetch ga nije pronašao kao poveznicu.
12. ~~Naslovnica v2, sekcija „Rješenja”: brief traži diskretnu oznaku „U pripremi” za IntegrityUP i ComplianceUP na stranici `rjesenja.html`.~~ Riješeno 12. 11. 2026. brief dokumentom za Rješenja: oznaka „U pripremi” dodana na `rjesenja.html` (`.badge-soon`/`.card-soon`).
13. Naslovnica v2: broj „XX+ savjetodavnih klijenata” iz briefa nije prikazan jer ne postoji potvrđen podatak - treba li ga dodati kao četvrti broj u sekciji „Iskustvo i povjerenje” kad se potvrdi?
14. Naslovnica v2, sekcija „Edukacije”: brief traži „dinamički modul” najbližih termina koji se sam ažurira; stranica je statična (bez build koraka), pa su termini ručno upisani (27. 11., 30. 11.-3. 12., 4. 12. 2026.) i trebaju se ručno ažurirati kad prođu ili kad kalendar na `edukacije.html` promijeni.
15. Brief dokument (poglavlje 14, „Prije objave potvrditi”) traži potvrdu: točne brojke i metodologiju/razdoblje za statistiku; stvaran status i funkcionalnosti IntegrityLine digitalnog sustava; dostupnost IntegrityUP-a i ComplianceUP-a; status prijava i temu za Compliance konferenciju 2027.; prava korištenja fotografija i reference.
16. Djelomično riješeno 12. 11. 2026.: `voiceup.html` i `integrityline.html` su izrađene prema novijem, precizniijem `RJEŠENJA.docx` dokumentu (konkretni pravni rokovi i reference su sad ispisani na stranici - vidi 6.4/6.4a). I dalje čeka prije stvarne objave: dvostruka pravna provjera navedenih pragova/rokova (dokument ih daje kao gotove, ali nijedan izvor nije formalno pravno recenziran), potvrda stvarnih funkcionalnosti IntegrityLine-a (posebno anonimna dvosmjerna komunikacija, prava pristupa, praćenje statusa - stranica ne obećava automatsku zakonsku usklađenost, samo „podršku usklađenosti”), stvarna snimka sučelja IntegrityLine-a (hero trenutačno nema sliku/mockup sučelja, samo tamnu pozadinu, po uputi da se ne koriste lažne snimke softvera), te određivanje stvarnih odredišnih stranica/obrazaca za CTA gumbe (trenutačno svi vode na `kontakt.html`).
17. Brief za Edukacije traži padajući podizbornik u glavnoj navigaciji (Sve edukacije / Kalendar / Certifikacijski programi / Compliance akademija / In-house edukacije) umjesto duge liste. `<site-header>` trenutno podržava samo ravnu navigaciju bez podizbornika - treba odlučiti radimo li to kao veću izmjenu `js/components.js` (utjecalo bi na sve stranice) kad podstranice budu gotove, ili ostaje ravna navigacija uz dobre poveznice na samoj stranici Edukacije.
18. O nama v2, sekcija „Iskustvo i reference”: novi vlasnikov tekst predlaže drugačiji raspis brojki („XX+ organizacija kojima smo pružili savjetodavnu podršku”, „XXX+ provedenih edukacijskih programa”, „X.XXX+ sudionika naših edukacija”, „XX zemalja”, razdoblje 2021. do 2026.) umjesto postojećeg potvrđenog `.proof`/`stat-row` (9+ zemalja, 2050+ polaznika, 185+ programa, 25+ godina). Brojke u novom tekstu su doslovno placeholderi (XX/XXX/X.XXX) pa nisu primijenjene - čeka se stvaran broj po svakoj od četiri nove kategorije prije zamjene postojećeg, potvrđenog stat-reda.
19. O nama v2, sekcija „Autorski rad”: vlasnikova napomena uz stavku „Knjige i publikacije” kaže „(dodati slike moje tri knjige)” - trenutno je prikazana samo jedna korica (`PoslovnaEtika2023-3D.png`). Čekaju se još dvije naslovnice knjiga.
20. **Blog i novosti (`blog.html`):** tri od šest objava, sve nazive kategorija filtra i tri fotografije su izmišljeni na vlasnikov izričit zahtjev jer stari blog (codupo.hr/blog) nije bio dohvatljiv iz ovog okruženja u trenutku izrade - vidi status napomenu na vrhu datoteke za potpun popis. **Prije stvarne objave treba:** zamijeniti tri izmišljene objave (i po potrebi tri stvarne isto, ako vlasnik želi drukčiji odabir) stvarnim naslovima/sadržajem sa starog bloga ili novim tekstovima, potvrditi nazive i broj kategorija filtra (trenutno: Regulativa, Antikorupcija, Stručni članci, Poslovna etika, Edukacija), te odlučiti ostaju li Artlist fotografije ili se zamjenjuju stvarnim slikama uz članke. Pokušati ponovno dohvatiti stari blog kad stranica codupo.hr opet bude dostupna iz ovog okruženja, radi usporedbe sa stvarnim sadržajem.

---

## 8. Radni dogovor

- Ne radimo nove stranice bez izričitog dopuštenja vlasnika.
- Nakon svake stranice: provjera pravila (poglavlje 3), snimke za tri veličine, kratak sažetak vlasniku.
- Commit poruke na hrvatskom. Push na `origin` (virtualant/codupo-web).
