# Front-End
## Front-End-ul echipei Bizonii în concursul Assist Tech Challenge.
 
Aplicația a fost realizată folosind React + Vite, un framework accesibil ce folosește Java Script.

Aceasta dezvoltă un site in care o persoana care are nevoie sa isi completeze un formular sa o faca in cel mai simplu mod posibil.

### Comanda pe care o folosim pentru a menține serverul pornit este:
```"npm run dev"```


## Aplicația prezinta o pagina principala si 3 pagini secundare:
1. ### HOME PAGE
2. ### CREATE
3. ### BROWSE
4. ### LOGIN


## HOME PAGE:
1. #### Pagina te intampina cu un design minimalist, format dintr-un buton cu logo-ul echipei care iti ofera 2 optiuni:
   - Butonul de Sign-Up care te redirectioneaza pe pagina de inregistrare a site-ului.
   - Butonul de Login care te redirectioneaza pe pagina de autentificare a site-ului.


## CREATE:
1. #### Pagina prezinta un template cu posibilitatea de a iti personaliza cum doresti formularul. Avand urmatoarele posibilitati:
   - Titlu.
   - Campuri dinamice, pentru a introduce doar detaliile necesare.
   - Impartirea forumularului in mai multe sectiuni.
   - Selectarea numarului de zile pana formularul se va sterge din baza de date.
   - Posibilitatea de a introduce continut in formular.
   - Selectarea metodei prin care poti scana o poza si introduce mai usor datele in formular.
   


## BROWSE:
1. #### Pagina are 2 functionalitati, cea de vizualizare a formularelor create pe acel cont si un buton care te redirectioneaza pe pagina de creare cont.
   - Vizualizare formularelor vine cu 4 butoane separate, <b>QR Code</b>, <b>Fill</b>, <b>Edit</b>, <b>Delete</b>.
   -- Butonul <b>QR Code</b> iti genereaza un cod QR cu care poti accesa PDF-ul formularului mult mai usor.
   -- Butonul <b>Fill</b> te redirectioneaza pe pagina de Fill Form unde poti completa formularul cu datele tale.
   -- Butonul <b>Edit</b> iti va da posibilitatea sa schimbi anumite date pe care le-ai introdus.
   -- Butonul <b>Delete</b> va sterge acel formular.


## LOGIN:
1. #### Pagina prezinta 2 campuri de completat si un buton.
   - Cele 2 campri sunt cel de email si cel de parola.
   - Dupa ce ai completat campurile si ai apasat pe butonul aferent se va salva token-ul si id-ul in sesiunea locala pentru a putea fi folosit pe viitor.


## Workflow:
- In prima instanta un utilizator nou se va inregistra pe site.
- Dupa care se va autentifica pe site.
- In cele ce urmeaza el va avea doar posibilitatea de a isi crea un formular in care sa isi stabileasca datele pe care le doreste in acel formular, continutul acestiuia si modul prin care poate incarca o imagine pentru a putea fi scanata, fiind un proces de completare a formularului automata si mult mai rapida.
- Dupa ce formularul este completat cu datele necesare, utilizatorul poate sa il descarce in format PDF sau sa il transmita oricui prin codul QR generat automat de catre site.
