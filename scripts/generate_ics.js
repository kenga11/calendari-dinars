const fs = require('fs');
const path = require('path');

const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menu.json'), 'utf8'));
const calendarConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/calendar_config.json'), 'utf8'));

// Dies de la setmana en català
const DIES_MAP = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];

function getWeekNumber(dateStr) {
  const targetDate = new Date(dateStr + 'T00:00:00Z');
  // Obtenir el dilluns de la setmana
  const dayOfWeek = targetDate.getUTCDay(); // 0: Dg, 1: Dl, ..., 6: Ds
  const diffToMonday = (dayOfWeek + 6) % 7; // 0 per Dl, 1 per Dt...
  const monday = new Date(targetDate);
  monday.setUTCDate(monday.getUTCDate() - diffToMonday);

  const anchorMonday = new Date(calendarConfig.anchor.dilluns_referencia + 'T00:00:00Z');
  const msDiff = monday.getTime() - anchorMonday.getTime();
  const weekDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));
  
  const anchorWeek = calendarConfig.anchor.setmana_referencia; // 3
  const weekNum = ((((anchorWeek - 1 + weekDiff) % 4) + 4) % 4) + 1;
  return weekNum;
}

function formatDate(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function formatISO(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

let events = [];

// Generar només per al període confirmat (7 de setembre fins al 22 de desembre de 2026)
const startDate = new Date('2026-09-07T00:00:00Z');
const endDate = new Date('2026-12-22T00:00:00Z');

let curr = new Date(startDate);

while (curr <= endDate) {
  const dayOfWeek = curr.getUTCDay();
  const dateStr = formatISO(curr);
  const nextDay = new Date(curr);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);

  // Només de dilluns (1) a divendres (5)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const festiu = calendarConfig.festius[dateStr];
    const dtstart = formatDate(curr);
    const dtend = formatDate(nextDay);
    const diaClau = DIES_MAP[dayOfWeek];

    if (festiu) {
      events.push(`BEGIN:VEVENT
UID:festiu-${dtstart}@escola-bressol
DTSTAMP:20260909T100000Z
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtend}
SUMMARY:🎉 Festiu escolar: ${festiu}
DESCRIPTION:Festiu escolar a l'escola bressol: ${festiu}. No hi ha servei de menjador.
CATEGORIES:Escola,Festiu
TRANSP:TRANSPARENT
END:VEVENT`);
    } else {
      const weekNum = getWeekNumber(dateStr);
      const diaMenu = menuData.setmanes[weekNum]?.dies[diaClau];

      if (diaMenu) {
        const summary = `🥣 Dinar: ${diaMenu.primer} + ${diaMenu.segon}`;
        const description = `DINAR ESCOLA BRESSOL TRIS TRAS (${weekNum}a Setmana - ${diaMenu.dia_nom})\\n\\n` +
          `• Categoria: ${diaMenu.categoria}\\n` +
          `• 1r Plat: ${diaMenu.primer}\\n` +
          `• 2n Plat: ${diaMenu.segon}\\n` +
          `• Guarnició: ${diaMenu.guarnicio}\\n` +
          `• Postres: ${diaMenu.postres}\\n\\n` +
          `${menuData.titol} · E.B. Tris Tras`;

        events.push(`BEGIN:VEVENT
UID:dinar-${dtstart}@escola-bressol-tristras
DTSTAMP:20260909T100000Z
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtend}
SUMMARY:${summary}
DESCRIPTION:${description}
CATEGORIES:Escola,Dinar
TRANSP:TRANSPARENT
END:VEVENT`);
      }
    }
  }

  curr.setUTCDate(curr.getUTCDate() + 1);
}

const icsContent = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Escola Bressol Tris Tras//Calendari Dinars 2026//CA',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'X-WR-CALNAME:Dinars E.B. Tris Tras 2026',
  'X-WR-TIMEZONE:Europe/Madrid',
  'X-WR-CALDESC:Menú diari de dinars de l\'Escola Bressol Tris Tras',
  ...events,
  'END:VCALENDAR'
].join('\r\n');

const outputPath = path.join(__dirname, '../calendari-dinars-2026.ics');
fs.writeFileSync(outputPath, icsContent, 'utf8');

console.log(`Fitxer ICS generat correctament amb ${events.length} esdeveniments a: ${outputPath}`);
