# 👶 Calendari de Dinars · Escola Bressol Tris Tras (Setembre - Desembre 2026)

Aquest projecte permet consultar de forma visual, intuïtiva i ràpida el menú diari de dinar de l'**Escola Bressol Tris Tras** per al **1r trimestre confirmat** (del 7 de setembre al 22 de desembre de 2026). Quan es disposi dels menús de 2027 s'afegiran al sistema.

- **Menú:** Menú Estiu (+1 anys)
- **Rotació:** Cicle de 4 setmanes (1a a 4a) seguint el calendari oficial de l'escola.

---

## 🚀 Com utilitzar-lo

### 1. Aplicació Web Interactiva (`index.html`)
Pots obrir el fitxer directament al teu navegador (Chrome, Safari, Firefox, etc.) fent doble clic sobre `index.html` o executant un servidor local:

```bash
# Opció 1: Obrir directament al navegador
xdg-open index.html

# Opció 2: Servidor local ràpid
npx serve .
# o amb python
python3 -m http.server 8080
```

#### Funcionalitats de l'App Web:
- **🥣 "Què dinem avui?"**: Mostra a l'instant el menú del dia amb 1r plat, 2n plat, guarnició i postres, amb botons per navegar a Ahir o Demà.
- **📅 Vista Setmanal**: Dilluns a divendres amb el número de setmana del cicle i la categoria del dia.
- **🗓️ Calendari Mensual (2026)**: Visualitza qualsevol mes de l'any 2026 amb el menú de cada dia i els festius escolars marcats.
- **📋 Quadre Base de 4 Setmanes**: La graella oficial de les 4 setmanes per consultar el menú complet.
- **🔍 Cercador i Filtres**: Cerca ràpida per ingredients o plats (peix, pollastre, vedella, truita, llegums, pasta, arròs).
- **🖨️ Format per a la Nevera**: Clica al botó "Imprimir" per treure'n una còpia neta en paper per penjar a la cuina.
- **📥 Descàrrega directa del calendari (.ICS)**.

---

### 2. Sincronitzar amb el Calendari del Mòbil (`calendari-dinars-2026.ics`)
El fitxer `calendari-dinars-2026.ics` conté tots els dinars confirmats de dilluns a divendres del 1r trimestre (77 esdeveniments), amb el detall dels plats a la descripció.

#### Com afegir-lo a Google Calendar:
1. Obre [Google Calendar](https://calendar.google.com) a l'ordinador.
2. A l'esquerra, al costat de "Altres calendaris", fes clic a **+** > **Importa**.
3. Selecciona el fitxer `calendari-dinars-2026.ics` i tria a quin calendari vols afegir-lo (recomanem crear un calendari nou anomenat "Dinars Escola" per poder mostrar-lo o ocultar-lo fàcilment).

#### Com afegir-lo a Samsung Calendar o Apple Calendar:
- Envia't el fitxer `calendari-dinars-2026.ics` per correu, Telegram o WhatsApp, toca el fitxer al mòbil i selecciona **"Afegeix tots al calendari"**.

---

## 🗂️ Estructura del Projecte

```
calendari-dinars/
├── index.html                    # Aplicació web interactiva autònoma
├── calendari-dinars-2026.ics     # Fitxer de calendari universal (iCalendar)
├── data/
│   ├── menu.json                 # Menús estructurats de les 4 setmanes
│   └── calendar_config.json      # Rotació oficial de setmanes i festius 2026
├── scripts/
│   └── generate_ics.js           # Generador del fitxer .ics
└── README.md                     # Documentació d'ús
```

---

## 📋 Rotació Oficial de Setmanes (Curs 2026)

| Període | Setmana del Menú |
| :--- | :--- |
| **07-13 Setembre** | 3a Setmana (Inici de curs) |
| **14-20 Setembre** | 4a Setmana |
| **21-27 Setembre** | 1a Setmana |
| **28 Setembre - 04 Octubre** | 2a Setmana |
| **05-11 Octubre** | 3a Setmana |
| **12-18 Octubre** | 4a Setmana |
| **19-25 Octubre** | 1a Setmana |
| **26 Octubre - 01 Novembre** | 2a Setmana |
| **02-08 Novembre** | 3a Setmana |
| **09-15 Novembre** | 4a Setmana |
| **16-22 Novembre** | 1a Setmana |
| **23-29 Novembre** | 2a Setmana |
| **30 Novembre - 06 Desembre** | 3a Setmana |
| **07-13 Desembre** | 4a Setmana |
| **14-20 Desembre** | 1a Setmana |
| **21 Desembre** | 2a Setmana |
