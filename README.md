# Front-End
## Front-End-ul echipei Bizonii în concursul Assist Tech Challenge.
 
Aplicația a fost realizată folosind React + Vite, un framework accesibil ce folosește Java Script.

Aceasta dezvoltă un site în care o persoană care are nevoie să își completeze un formular să o faca în cel mai simplu mod posibil.

### Comanda pe care o folosim pentru a menține serverul pornit este:
```"npm run dev"```


## Aplicația prezintă o pagină principală și 3 pagini secundare:
1. ### HOME PAGE
2. ### CREATE
3. ### BROWSE
4. ### LOGIN


## HOME PAGE:
1. #### Pagina te întampină cu un design minimalist, format dintr-un buton cu logo-ul echipei care îți oferă 2 opțiuni:
   - Butonul de Sign-Up care te redirecționează pe pagina de înregistrare a site-ului.
   - Butonul de Login care te redirecționează pe pagina de autentificare a site-ului.


## CREATE:
1. #### Pagina prezintă un template cu posibilitatea de a îți personaliza cum dorești formularul. Având următoarele posibilități:
   - Titlu.
   - Câmpuri dinamice, pentru a introduce doar detaliile necesare.
   - Împarțirea forumularului în mai multe secțiuni.
   - Selectarea numărului de zile până formularul se va șterge din baza de date.
   - Posibilitatea de a introduce conținut în formular.
   - Selectarea metodei prin care poți scana o poză și introduce mai ușor datele în formular.
   


## BROWSE:
1. #### Pagina are 2 functionalități, cea de vizualizare a formularelor create pe acel cont și un buton care te redirecționează pe pagina de creare cont.
   - Vizualizare formularelor vine cu 4 butoane separate, <b>QR Code</b>, <b>Fill</b>, <b>Edit</b>, <b>Delete</b>.
   -- Butonul <b>QR Code</b> îți generează un cod QR cu care poți accesa PDF-ul formularului mult mai ușor.
   -- Butonul <b>Fill</b> te redirecționează pe pagina de Fill Form unde poți completa formularul cu datele tale.
   -- Butonul <b>Edit</b> îți va da posibilitatea să schimbi anumite date pe care le-ai introdus.
   -- Butonul <b>Delete</b> va șterge acel formular.


## LOGIN:
1. #### Pagina prezintă 2 câmpuri de completat și un buton.
   - Cele 2 câmpuri sunt cel de email și cel de parola.
   - După ce ai completat câmpurile și ai apăsat pe butonul aferent se va salva token-ul și id-ul în sesiunea locală pentru a putea fi folosit pe viitor.


## Workflow:
- În prima instanță un utilizator nou se va înregistra pe site.
- După care se va autentifica pe site.
- În cele ce urmează el va avea doar posibilitatea de a își crea un formular în care să își stabilească datele pe care le dorește în acel formular, conținutul acestuia și modul prin care poate încarca o imagine pentru a putea fi scanată, fiind un proces de completare a formularului automată și mult mai rapidă.
- După ce formularul este completat cu datele necesare, utilizatorul poate să îl descarce în format PDF sau să îl transmită oricui prin codul QR generat automat de către site.
