import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const germanPages: PageCatalog = {
  home: {
    title: 'Schwimmzeit-Umrechner: SCY, SCM und LCM',
    description: 'Rechne Schwimmzeiten zwischen SCY, SCM und LCM sowie Yards in Meter um. Kostenloser Schwimmzeit-Umrechner für internationale Schwimmer.',
    h1: 'Schwimmzeit-Umrechner',
    lead: 'Rechne Schwimmzeiten zwischen SCY-, SCM- und LCM-Bahnen um, einschließlich der Umrechnung von Yards in Meter.',
    eyebrow: 'Kostenloser Schwimmrechner',
    sections: [
      section('Verwandte Schwimmrechner', ['Vergleiche Tempo, Zwischenzeiten, kritische Schwimmgeschwindigkeit, Serien, Geschwindigkeit, Kalorien und Bahnenlängen mit Werkzeugen, die für Schwimmer entwickelt wurden.']),
      section('Bahnen-Umrechner', ['Wähle eine Kombination aus Bahnen, um eine Schwimmzeit zwischen einer 25-Yard-Bahn, einer 25-Meter-Bahn und einer 50-Meter-Bahn umzurechnen.']),
      section('SCY, SCM und LCM', ['Die Bahnlänge verändert die Anzahl der Wendungen und die zurückgelegte Strecke. SCY verwendet 25 Yards, SCM verwendet 25 Meter und LCM verwendet 50 Meter.']),
      section('Wie funktioniert ein Schwimmzeit-Umrechner?', ['Der Umrechner verwendet einen dokumentierten Bahnfaktor und eine Anpassung pro Wendung. Viele Jugend- und Masters-Programme verwenden die Colorado-Faktoren.', 'Alle Umrechnungsergebnisse sind Schätzungen, da jeder Schwimmer aus Wendungen und Wänden einen anderen Vorteil zieht.']),
      section('So verwendest du diesen Umrechner', ['Wähle die Bahn und die Disziplin, gib deine Zeit ein und lies die entsprechende Zeit in jeder Bahn ab.']),
      section('Warum den Schwimmzeit-Umrechner verwenden?', ['Ein kostenloses, privates Browser-Tool zum Vergleichen von Ergebnissen, Festlegen von Qualifikationszielen, Planen von Trainingstempos und Umrechnen von Yards in Meter ohne Softwareinstallation.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Schwimmtempo-Rechner', description: 'Finde das Zieltempo pro 25, 50, 100, 200 oder 400.' },
      { route: 'split-calculator', title: 'Zwischenzeiten-Rechner', description: 'Erzeuge gleichmäßige kumulative Zwischenzeiten für jede Renndistanz.' },
      { route: 'css-calculator', title: 'Kritische Schwimmgeschwindigkeit (CSS)', description: 'Berechne Schwellenwerttempo und Trainingszonen aus einem 400 + 200 Test.' },
      { route: 'interval-calculator', title: 'Serien und Abgänge', description: 'Erstelle ein Trainingsset mit Wiederholungen, Tempo und Abgängen.' },
      { route: 'speed-calculator', title: 'Geschwindigkeit und Rennprognose', description: 'Rechne Tempo in m/s, km/h und prognostizierte Rennzeiten um.' },
      { route: 'calories-calculator', title: 'Kalorien beim Schwimmen', description: 'Schätze Kalorien anhand von Technik, Intensität, Gewicht und Zeit.' },
      { route: 'lengths-converter', title: 'Bahnen und Distanz', description: 'Rechne Strecken und Bahnenlängen für 25 yd, 25 m und 50 m Becken um.' },
    ],
    courses: [
      { code: 'SCY', name: 'Kurze Yards-Bahn', length: '25 Yards', usage: 'US-amerikanische Highschool, NCAA und Vereinswettkampf' },
      { code: 'SCM', name: 'Kurze Meter-Bahn', length: '25 Meter', usage: 'Internationaler Wettkampf im Kurzstreckenbecken' },
      { code: 'LCM', name: 'Lange Meter-Bahn', length: '50 Meter', usage: 'Olympische Spiele und Weltmeisterschaften' },
    ],
    faqs: [
      faq('Was ist ein Schwimmzeit-Umrechner?', 'Er schätzt, wie eine Zeit in einer Wettkampfbahn im Vergleich zu einer entsprechenden Zeit in einer anderen Bahn abschneidet. Derselbe Einsatz kann zu unterschiedlichen Endzeiten führen, weil die Bahnlänge die Anzahl der Wendungen verändert.'),
      faq('Was bedeuten SCY, SCM und LCM?', 'SCY ist ein 25-Yard-Becken, SCM ein 25-Meter-Becken und LCM ein 50-Meter-Becken. Dies sind die drei standardmäßigen Wettkampfbahnlängen.'),
      faq('Wie rechne ich SCY in LCM um?', 'Wähle SCY als Ausgangsbahn, wähle Disziplin und Zeit und wähle anschließend LCM als Ziel. Der Umrechner verwendet einen Bahnfaktor und eine Anpassung pro Wendung.'),
      faq('Sind Schwimmzeit-Umrechnungen exakt?', 'Nein. Wendungen, Wände, Atmung und Pacing sind bei jedem Schwimmer anders, daher ist jede Umrechnung eine Schätzung. Betrachte die Ergebnisse als gute Näherungen und nicht als offizielle Zeiten.'),
      faq('Ist der Schwimmzeit-Umrechner kostenlos und privat?', 'Ja. Er läuft vollständig in deinem Browser, ermöglicht unbegrenzte Umrechnungen und sendet eingegebene Zeiten nicht an einen Server.'),
    ],
  },
  'pace-calculator': {
    title: 'Schwimmtempo-Rechner – Schwimmzeit-Umrechner',
    description: 'Berechne das Schwimmtempo pro 100, 200, 400 oder jede beliebige Distanz aus Gesamtzeit und Distanz.',
    h1: 'Schwimmtempo-Rechner',
    lead: 'Berechne dein Tempo pro 25, 50, 100, 200 oder 400 in Yards oder Metern aus einer Gesamtzeit und einer Distanz.',
    sections: [
      section('So verwendest du den Tempo-Rechner', [], ['Gib die Gesamtstrecke ein und wähle Yards oder Meter.', 'Gib die Gesamtzeit ein.', 'Wähle ein Tempointervall wie 100, 200, 400 oder eine benutzerdefinierte Distanz.', 'Berechne das Ergebnis und plane damit ein gleichmäßiges Set.'], ['Gib die Gesamtstrecke ein und wähle Yards oder Meter.', 'Gib die Gesamtzeit ein.', 'Wähle ein Tempointervall wie 100, 200, 400 oder eine benutzerdefinierte Distanz.', 'Berechne das Ergebnis und plane damit ein gleichmäßiges Set.']),
      section('Übliche Tempoziele', ['Das Tempo ist die Zeit, die für ein Intervall benötigt wird. Trainer verwenden Abgänge, um Trainingssets gleichmäßig zu halten.']),
      section('Warum den Schwimmtempo-Rechner verwenden?', ['Rechne eine gemessene Gesamtzeit in die Sekunden pro 100 um, die Trainer an einer Tempo-Uhr verwenden. Wähle Meter für ein 100-m-Tempo oder Yards für ein 100-yd-Tempo.']),
    ],
    faqs: [
      faq('Wie berechne ich ein Schwimmtempo?', 'Teile die Gesamtsekunden durch die Gesamtstrecke und multipliziere mit dem Tempointervall. Zum Beispiel sind 6:05 über 500 m 73 Sekunden pro 100 m.'),
      faq('Was ist ein gutes Tempo über 100 Meter?', 'Das hängt von Disziplin und Niveau ab. Teile eine Zielzeit mit diesem Rechner in realistische Zwischenzeiten, statt dich auf einen einzelnen Durchschnitt zu verlassen.'),
      faq('Sollte ich mein Rennen gleichmäßig aufteilen?', 'Die meisten Ausdauerschwimmer streben nahezu gleichmäßige Zwischenzeiten an. Ein kleiner positiver Split am Ende ist normal; plane gleichmäßig und passe die Daten deines Rennens an.'),
    ],
  },
  'split-calculator': {
    title: 'Zwischenzeiten-Rechner – Schwimmzeit-Umrechner',
    description: 'Erzeuge gleichmäßige Schwimm-Zwischenzeiten für jede Renndistanz und sieh kumulierte Zeiten für alle 25, 50 oder 100.',
    h1: 'Zwischenzeiten-Rechner für Schwimmen',
    lead: 'Teile ein Schwimmrennen in gleichmäßige Ziel-Zwischenzeiten und lies die kumulierten Zeiten bei jedem 50 oder 100.',
    sections: [
      section('So verwendest du den Zwischenzeiten-Rechner', [], ['Wähle eine Renndistanz und eine Einheit.', 'Gib die Zielzeit ein.', 'Wähle eine Zwischenzeitlänge von 25, 50 oder 100.', 'Lies die kumulierten Uhrzeiten und das Tempo hinter jeder Zwischenzeit.'], ['Wähle eine Renndistanz und eine Einheit.', 'Gib die Zielzeit ein.', 'Wähle eine Zwischenzeitlänge von 25, 50 oder 100.', 'Lies die kumulierten Uhrzeiten und das Tempo hinter jeder Zwischenzeit.']),
      section('Leitfaden für das Renntempo', ['Plane die erste Bahn schnell, aber kontrolliert, und halte danach eine gleichmäßige Geschwindigkeit. Ein kleiner positiver Split auf den letzten Bahnen ist bei Ausdauerrennen normal.']),
      section('Warum den Zwischenzeiten-Rechner verwenden?', ['Die Endzeit zeigt, wie schnell du warst; Zwischenzeiten zeigen, wie. Mit kumulierten Zielen wird dein Rennplan im Training wiederholbar.']),
    ],
    faqs: [
      faq('Was sind Schwimm-Zwischenzeiten?', 'Zwischenzeiten sind die Zeiten für jeden Abschnitt eines Rennens, meist alle 50 oder 100. So kannst du das Tempo während des Rennens vergleichen, statt nur die Endzeit zu sehen.'),
      faq('Sollte jede Zwischenzeit genau gleich sein?', 'Die meisten Ausdauerschwimmer planen nahezu gleichmäßige Zwischenzeiten und können am Ende etwas langsamer werden. Übe den Rhythmus, den du im Rennen umsetzen möchtest.'),
      faq('Wie verwende ich Zwischenzeiten im Training?', 'Gib eine Zielrennzeit ein, übe jedes Intervall mit Abgang und vergleiche die kumulierten Zeiten an jeder Wendung.'),
    ],
  },
  'css-calculator': {
    title: 'CSS-Rechner – Kritische Schwimmgeschwindigkeit',
    description: 'Bestimme die Kritische Schwimmgeschwindigkeit aus einem 400 + 200 Test und erhalte CSS-Tempo, Trainingszonen und prognostizierte Zeiten.',
    h1: 'Rechner für Kritische Schwimmgeschwindigkeit (CSS)',
    lead: 'Schwimme ein intensives 400 und ein schnelles 200, um Schwellenwerttempo, fünf Trainingszonen und prognostizierte Rennzeiten zu schätzen.',
    sections: [
      section('So führst du den Test durch', [], ['Wärme dich gründlich auf.', 'Schwimme ein 400 mit maximalem Einsatz.', 'Erhole dich 3–5 Minuten und schwimme ein 200 mit maximalem Einsatz.', 'Gib beide Zeiten ein, um den CSS zu berechnen.'], ['Wärme dich gründlich auf.', 'Schwimme ein 400 mit maximalem Einsatz.', 'Erhole dich 3–5 Minuten und schwimme ein 200 mit maximalem Einsatz.', 'Gib beide Zeiten ein, um den CSS zu berechnen.']),
      section('Deine Zonen verstehen', ['Nutze Erholungs- und Aerobic-Tempo für leichte Arbeit, Tempotempo für kontrolliertes Tempo, Schwellenwerttempo für CSS-Sets und Zone 5 für kurze Wiederholungen hoher Qualität.']),
      section('Warum den Rechner für Kritische Schwimmgeschwindigkeit verwenden?', ['Zwei Schwimmläufe mit maximalem Einsatz liefern ein wiederholbares Schwellenwerttempo und ein praktisches System für Trainingszonen und Rennprognosen.']),
    ],
    faqs: [
      faq('Was ist Kritische Schwimmgeschwindigkeit (CSS)?', 'CSS ist das schnellste Tempo, das du mit kontrollierter Ermüdung halten kannst. Es wird aus einem langen 400- und einem kurzen 200-Test geschätzt.'),
      faq('Wie oft sollte ich den CSS erneut testen?', 'Teste alle vier bis sechs Wochen oder zu Beginn eines neuen Trainingsblocks erneut, besonders nach einer Verbesserung der aeroben Kapazität.'),
      faq('Ist CSS dasselbe wie Renntempo?', 'Nicht ganz. Ein 400 kann etwas schneller als CSS sein, während ein 1500 oder eine Meile meist nahe am CSS-Tempo liegen.'),
    ],
  },
  'interval-calculator': {
    title: 'Rechner für Schwimmserien und Abgänge',
    description: 'Erstelle Schwimm-Trainingssets mit Wiederholungen, Distanz und Tempo und berechne Wiederholungszeiten sowie Abgänge.',
    h1: 'Rechner für Schwimmserien und Abgänge',
    lead: 'Verwandle ein Zieltempo in ein vollständiges Trainingsset mit Wiederholungszeiten, Abgängen, Summen und Abgangszeiten an der Wand.',
    sections: [
      section('So verwendest du den Serienrechner', [], ['Gib Wiederholungen und Distanz pro Wiederholung ein.', 'Lege dein Tempo pro 100 fest.', 'Wähle eine feste Pause oder einen festen Abgang.', 'Lies Wiederholungszeit, Summen und Abgangszeiten ab.'], ['Gib Wiederholungen und Distanz pro Wiederholung ein.', 'Lege dein Tempo pro 100 fest.', 'Wähle eine feste Pause oder einen festen Abgang.', 'Lies Wiederholungszeit, Summen und Abgangszeiten ab.']),
      section('Klassische Sets zum Ausprobieren', ['Probiere ein CSS-Set, ein aerobes 20 × 50-Set, ein Mittelstrecken-Set über 6 × 200 oder eine absteigende Leiter.']),
      section('Warum den Intervallrechner verwenden?', ['Er nimmt die Rechenarbeit aus Sets wie 8 × 100 in 1:30 und erzeugt einen Plan für die Tempo-Uhr, dem du an der Wand folgen kannst.']),
    ],
    faqs: [
      faq('Was ist ein Abgang beim Schwimmen?', 'Ein Abgang ist das feste Intervall, in dem du dich bei jeder Wiederholung von der Wand löst. Die Differenz zwischen Abgang und Wiederholungszeit ist deine Pause.'),
      faq('Sollte ich Sets nach Abgang oder Pause aufbauen?', 'Beides wird verwendet. Ein fester Abgang sorgt für ein konsistentes Tempo; eine feste Pause macht das Verhältnis von Arbeit und Pause sichtbar, wenn sich die Wiederholungszeit durch Ermüdung ändert.'),
      faq('Wie lange sollte ich zwischen Wiederholungen pausieren?', 'Temp-sets verwenden oft 20–30 Sekunden oder mehr, während Schwellenwert- und CSS-Sets üblicherweise 10–15 Sekunden verwenden.'),
    ],
  },
  'speed-calculator': {
    title: 'Rechner für Schwimmgeschwindigkeit und Rennprognose',
    description: 'Rechne Schwimmzeit und Distanz in Tempo pro 100 m oder 100 yd, Geschwindigkeit und prognostizierte Rennzeiten um.',
    h1: 'Rechner für Schwimmgeschwindigkeit und Rennprognose',
    lead: 'Gib eine Referenzzeit und -distanz ein, um Tempo, Geschwindigkeit und prognostizierte Zeiten von 200 bis zur Meile zu sehen.',
    sections: [
      section('So verwendest du ihn', [], ['Wähle eine Referenzschwimmstrecke.', 'Wähle Meter oder Yards und gib die Zeit ein.', 'Lies Tempo pro 100, Geschwindigkeit und prognostizierte Rennzeiten ab.', 'Verwende eine Prognose, um ein Trainingstempo auszuwählen.'], ['Wähle eine Referenzschwimmstrecke.', 'Wähle Meter oder Yards und gib die Zeit ein.', 'Lies Tempo pro 100, Geschwindigkeit und prognostizierte Rennzeiten ab.', 'Verwende eine Prognose, um ein Trainingstempo auszuwählen.']),
      section('Wichtige Referenzwerte', ['Das 400 ist eine klassische CSS-Testdistanz. Das 1500 und 1650 sind übliche Beckenmeilen-Rennen, während 1760 Yards die echte Meile sind.']),
      section('Warum den Geschwindigkeitsrechner verwenden?', ['Tempo beschreibt ein Trainingsintervall und Geschwindigkeit beschreibt den erbrachten Einsatz. Dieses Tool zeigt beides in den Einheiten, die Trainer und Schwimmer verwenden.']),
    ],
    faqs: [
      faq('Warum unterscheidet sich das Tempo pro 100 yd vom Tempo pro 100 m?', 'Eine Yard ist kürzer als ein Meter, daher legen 100 Yards bei derselben Geschwindigkeit eine kürzere Strecke zurück als 100 Meter.'),
      faq('Wie zuverlässig sind prognostizierte Rennzeiten?', 'Sie setzen voraus, dass die Referenzgeschwindigkeit über die gesamte Distanz gehalten wird. Nutze sie als Ausgangsziel und passe sie an Pacing, Drafting und Bedingungen an.'),
      faq('Was ist eine Beckenmeile?', 'Wettkampfschwimmer nennen 1500 Meter oder 1650 Yards oft eine Meile. Die echte Meile sind 1760 Yards oder etwa 1609 Meter.'),
    ],
  },
  'calories-calculator': {
    title: 'Kalorienrechner für Schwimmen',
    description: 'Schätze beim Schwimmen verbrauchte Kalorien anhand von Technik, Intensität, Körpergewicht und Dauer.',
    h1: 'Kalorienrechner für Schwimmen',
    lead: 'Schätze verbrauchte Kalorien anhand von Gewicht, Technik, Intensität und Zeit im Wasser.',
    sections: [
      section('So verwendest du ihn', [], ['Gib dein Körpergewicht ein.', 'Wähle die Schwimmtechnik.', 'Wähle leichte, mittlere oder intensive Belastung.', 'Gib die Dauer ein und lies die Schätzung und den Stundenwert ab.'], ['Gib dein Körpergewicht ein.', 'Wähle die Schwimmtechnik.', 'Wähle leichte, mittlere oder intensive Belastung.', 'Gib die Dauer ein und lies die Schätzung und den Stundenwert ab.']),
      section('Warum sich die Techniken unterscheiden', ['Schmetterling erfordert normalerweise den größten Einsatz, während Wassertreten die Option mit dem geringsten Einsatz ist. Die Intensität kann genauso wichtig sein wie die Technik.']),
      section('Warum den Schwimm-Kalorienrechner verwenden?', ['Die Schätzung kombiniert Gewicht, Technik, Intensität und Dauer anhand standardisierter MET-Werte und liefert damit eine nützlichere Planungszahl als ein allgemeiner Durchschnitt.']),
    ],
    faqs: [
      faq('Wie genau sind Schätzungen der Schwimmkalorien?', 'Es sind Schätzungen auf Basis von MET-Werten, Körpergewicht und Dauer. Technik, Wassertemperatur und individueller Stoffwechsel beeinflussen das Ergebnis.'),
      faq('Wie viele Kalorien verbraucht Schwimmen pro Stunde?', 'Das hängt von Technik und Intensität ab. Ein 70 kg schwerer Schwimmer verbraucht bei typischem Training möglicherweise etwa 400–700 kcal pro Stunde.'),
      faq('Sollte ich die beim Schwimmen verbrauchten Kalorien wieder zu mir nehmen?', 'Für die meisten Schwimmer ist normales Essen angemessen. Nutze die Schätzung als Richtwert, nicht als präzise Ernährungsempfehlung.'),
    ],
  },
  'lengths-converter': {
    title: 'Schwimmstrecken-Umrechner – Yards in Meter und Bahnenlängen',
    description: 'Rechne Schwimmstrecken um: Yards in Meter, Meter in Yards und Strecken in Bahnenlängen.',
    h1: 'Umrechner für Schwimmstrecken und Bahnenlängen',
    lead: 'Rechne Yards in Meter oder Meter in Yards um und sieh, wie viele Bahnen eine Strecke in einem 25-Yard-, 25-Meter- oder 50-Meter-Becken entspricht.',
    sections: [
      section('So verwendest du ihn', [], ['Wähle Yards und Meter oder Strecke und Bahnen.', 'Gib eine Strecke oder eine Anzahl von Bahnen ein.', 'Nutze Schnellvorgaben für häufige Schwimmstrecken.', 'Lies vollständige Bahnen, den Rest oder die gleichwertige Strecke ab.'], ['Wähle Yards und Meter oder Strecke und Bahnen.', 'Gib eine Strecke oder eine Anzahl von Bahnen ein.', 'Nutze Schnellvorgaben für häufige Schwimmstrecken.', 'Lies vollständige Bahnen, den Rest oder die gleichwertige Strecke ab.']),
      section('Schnellübersicht Yards zu Metern', ['25 Yards entsprechen 22.86 Metern, 50 Yards entsprechen 45.72 Metern und 1650 Yards entsprechen 1508.76 Metern. Umgekehrt entsprechen 25 Meter 27.34 Yards und 1500 Meter 1640.42 Yards.']),
      section('Warum den Bahnen-Umrechner verwenden?', ['Fragen zu Beckenstrecken beeinflussen Trainingspläne. Rechne genaue Strecken um und zähle Bahnen in 25-Yard-, 25-Meter- und 50-Meter-Becken.']),
    ],
    faqs: [
      faq('Wie rechne ich 25 Yards in Meter um?', 'Multipliziere die Yards mit 0.9144: 25 Yards entsprechen 22.86 Metern, der Länge eines Kurzstreckenbeckens in Yards.'),
      faq('Wie viele Meter sind 50 Yards?', '50 Yards entsprechen 45.72 Metern. Weitere häufige Umrechnungen sind 100 Yards = 91.44 Meter und 1650 Yards = 1508.76 Meter.'),
      faq('Wie viele Bahnen sind 1500 Meter Schwimmen?', 'Das sind 60 Bahnen in einem 25-Meter-Becken und 30 Bahnen in einem 50-Meter-Becken. 1650 Yards sind 66 Bahnen in einem 25-Yard-Becken.'),
    ],
  },
  'scy-to-lcm': {
    title: 'SCY-zu-LCM-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne SCY-Schwimmzeiten mit einer dokumentierten Schwimmumrechnung in LCM um.',
    h1: 'SCY-zu-LCM-Umrechner',
    lead: 'Rechne eine Zeit aus einer kurzen Yards-Bahn in eine geschätzte Zeit aus einer langen Meter-Bahn um.',
    sections: [
      section('Was ist eine SCY-zu-LCM-Umrechnung?', ['Ein 25-Yard-Becken und ein 50-Meter-Becken verändern die Strecke und die Anzahl der Wendungen. Der Umrechner skaliert die Zeit und addiert für das größere Becken eine Anpassung pro Wendung.']),
      section('So funktioniert die Schätzung', ['Freistilwettkämpfe verwenden ihre üblichen Zuordnungen: 500 Freistil zu 400 Freistil, 1000 Freistil zu 800 Freistil und 1650 Freistil zu 1500 Freistil. Alle Ergebnisse sind Schätzungen.']),
    ],
    faqs: [
      faq('Was ist der Umrechnungsfaktor von SCY zu LCM?', 'Der grundlegende Faktor von Yards zu Metern beträgt 1.11, ergänzt um distanz- und wendungsbezogene Anpassungen für die jeweilige Disziplin. Langstreckenfreistil verwendet eigene Zuordnungsfaktoren.'),
      faq('Warum sind LCM-Zeiten langsamer?', 'Ein 50-Meter-Becken hat weniger Wendungen als ein 25-Yard-Becken. Schwimmer im Kurzstreckenbecken erhalten mehr Schub von der Wand, daher kann derselbe Einsatz in Yards schneller sein.'),
    ],
  },
  'scy-to-scm': {
    title: 'SCY-zu-SCM-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne SCY-Schwimmzeiten in SCM, das kurze Meterbecken, um.',
    h1: 'SCY-zu-SCM-Umrechner',
    lead: 'Rechne eine Zeit aus einem 25-Yard-Becken in eine geschätzte Zeit aus einem 25-Meter-Becken um.',
    sections: [
      section('Was ist eine SCY-zu-SCM-Umrechnung?', ['SCY und SCM verwenden beide Becken mit 25 Bahnen, daher ist die Anzahl der Wendungen gleich. Die wichtigste Änderung ist, dass ein Meter länger als eine Yard ist.']),
      section('So funktioniert die Schätzung', ['Der Standardfaktor beträgt 1.11 für ähnliche Disziplinen. Langstreckenfreistil verwendet eigene Zuordnungen für 500 zu 400, 1000 zu 800 und 1650 zu 1500.']),
    ],
    faqs: [
      faq('Was ist der Umrechnungsfaktor von SCY zu SCM?', 'Für ähnliche Disziplinen multiplizierst du die Sekunden der kurzen Yards-Bahn mit 1.11, weil eine 25-Yard-Bahn kürzer als eine 25-Meter-Bahn ist.'),
      faq('Sind 500 Yards dasselbe wie 400 oder 500 Meter?', 'Ein 500-Yard-Freistil entspricht im internationalen Kurzstreckenwettkampf dem 400-Meter-Freistil.'),
    ],
  },
  'scm-to-lcm': {
    title: 'SCM-zu-LCM-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne Zeiten aus dem kurzen Meterbecken in geschätzte Zeiten aus dem langen Meterbecken um.',
    h1: 'SCM-zu-LCM-Umrechner',
    lead: 'Rechne eine Zeit aus einem 25-Meter-Becken in eine geschätzte Zeit aus einem 50-Meter-Becken um.',
    sections: [
      section('Was ist eine SCM-zu-LCM-Umrechnung?', ['SCM und LCM verwenden dieselben metrischen Distanzen, aber ein 25-Meter-Becken hat mehr als doppelt so viele Wendungen wie ein 50-Meter-Becken. Die Schätzung berücksichtigt diese zusätzlichen Wendungen.']),
      section('So funktioniert die Schätzung', ['Schwimmtechnikspezifische Werte für Sekunden pro Wendung berücksichtigen den Unterschied. Dieselbe Logik gilt für die Freistilwettkämpfe über 400, 800 und 1500.']),
    ],
    faqs: [
      faq('Wie rechne ich SCM in LCM um?', 'Die Distanzen stimmen überein, daher addiert der Umrechner die geschätzte Zeitdifferenz, die durch die zusätzlichen Wendungen in einem 25-Meter-Becken entsteht.'),
      faq('Wie viel schneller ist SCM als LCM?', 'Sprintwettkämpfe können einige Zehntelsekunden gewinnen, während 200er und längere Rennen eine Sekunde oder mehr gewinnen können, weil sie mehr Wendungen enthalten.'),
    ],
  },
  'lcm-to-scy': {
    title: 'LCM-zu-SCY-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne Zeiten aus dem langen Meterbecken in geschätzte Zeiten aus dem kurzen Yards-Becken um.',
    h1: 'LCM-zu-SCY-Umrechner',
    lead: 'Rechne eine Zeit aus einem 50-Meter-Becken in eine geschätzte Zeit aus einem 25-Yard-Becken um.',
    sections: [
      section('Was ist eine LCM-zu-SCY-Umrechnung?', ['Ein Rennen über 50 Meter hat weniger Wendungen. Die Rückumrechnung entfernt daher den Wendungsvorteil und skaliert Meter auf Yards.']),
      section('So funktioniert die Schätzung', ['Langstreckenfreistil ordnet 400 Meter 500 Yards, 800 Meter 1000 Yards und 1500 Meter 1650 Yards zu. Alle umgerechneten Zeiten sind Schätzungen.']),
    ],
    faqs: [
      faq('Was ist der Umrechnungsfaktor von LCM zu SCY?', 'Für ähnliche Disziplinen wird der Kehrwert von 1.11 verwendet, zusammen mit einer Anpassung für die zusätzlichen Wendungen in einem 25-Yard-Becken.'),
      faq('Warum ist eine SCY-Zeit schneller?', 'Ein 25-Yard-Becken hat mehr Wände, und jede Wendung bietet einen Schubvorteil, der die Gesamtzeit schneller machen kann.'),
    ],
  },
  'lcm-to-scm': {
    title: 'LCM-zu-SCM-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne Zeiten aus dem langen Meterbecken in geschätzte Zeiten aus dem kurzen Meterbecken um.',
    h1: 'LCM-zu-SCM-Umrechner',
    lead: 'Rechne eine Zeit aus einem 50-Meter-Becken in eine geschätzte Zeit aus einem 25-Meter-Becken um.',
    sections: [
      section('Was ist eine LCM-zu-SCM-Umrechnung?', ['Die Distanzen sind gleich. Der Unterschied entsteht daher durch die zusätzlichen Wendungen, die in einem 25-Meter-Becken möglich sind.']),
      section('So funktioniert die Schätzung', ['Ein schwimmtechnikspezifischer Wert für Sekunden pro Wendung wird auf die zusätzlichen Wände angewendet. Längere Rennen zeigen einen größeren Unterschied.']),
    ],
    faqs: [
      faq('Wie rechne ich LCM in SCM um?', 'Da die Distanzen identisch sind, entfernt der Umrechner den Wendungsvorteil der längeren Strecke mithilfe schwimmtechnikspezifischer Wendungswerte.'),
      faq('Ist die kurze Bahn schneller als die lange Bahn?', 'In der Regel ja. Mehr Wände in einem 25-Meter-Becken bieten mehr Schub und führen beim selben Schwimmer und derselben Disziplin zu schnelleren Zeiten.'),
    ],
  },
  'scm-to-scy': {
    title: 'SCM-zu-SCY-Umrechner – Schwimmzeit-Umrechner',
    description: 'Rechne Zeiten aus dem kurzen Meterbecken in geschätzte Zeiten aus dem kurzen Yards-Becken um.',
    h1: 'SCM-zu-SCY-Umrechner',
    lead: 'Rechne eine Zeit aus einem 25-Meter-Becken in eine geschätzte Zeit aus einem 25-Yard-Becken um.',
    sections: [
      section('Was ist eine SCM-zu-SCY-Umrechnung?', ['Beide Becken sind Kurzstrecken und haben dieselbe Anzahl an Wendungen. Die Umrechnung skaliert hauptsächlich die Distanz, da eine Yard kürzer als ein Meter ist.']),
      section('So funktioniert die Schätzung', ['Verwende die Standardzuordnungen 400 Meter zu 500 Yards, 800 Meter zu 1000 Yards und 1500 Meter zu 1650 Yards. Die Ergebnisse sind Schätzungen.']),
    ],
    faqs: [
      faq('Was ist der Umrechnungsfaktor von SCM zu SCY?', 'Teile bei passenden Disziplinen die SCM-Sekunden durch 1.11, da die Anzahl der Wendungen gleich ist und sich nur die Bahnlänge ändert.'),
      faq('Können umgerechnete SCM-Zeiten für US-Wettkämpfe verwendet werden?', 'Einige Wettkämpfe akzeptieren umgerechnete Zeiten, die Veranstalter können jedoch eigene Regeln verwenden. Prüfe zuerst die Informationen zur Anmeldung.'),
    ],
  },
  guides: {
    title: 'Anleitungen – Schwimmzeit-Umrechner',
    description: 'Schritt-für-Schritt-Anleitungen zur Umrechnung von Schwimmzeiten, zum Tempo und zu Zwischenzeiten.',
    h1: 'Anleitungen zum Schwimmzeit-Umrechner',
    lead: 'Alles, was du brauchst, um Schwimmzeiten zwischen Bahnen zu vergleichen, Tempos zu planen und Zwischenzeiten für Rennen zu erstellen.',
    sections: [
      section('Wie Schwimmzeit-Umrechnungen funktionieren', ['SCY wird über 25 Yards, SCM über 25 Meter und LCM über 50 Meter geschwommen. Ordne zuerst die Disziplinen zu, skaliere dann die Distanz und passe anschließend die Wendungen an.', 'Keine Umrechnung ist exakt. Nutze Ergebnisse zum Vergleich und zur Planung und befolge bei eingereichten Zeiten die offiziellen Regeln.']),
      section('Schnellübersicht', ['SCY zu SCM: Für ähnliche Disziplinen mit 1.11 multiplizieren. SCM zu LCM: Wendungszeit addieren. Distanzzuordnungen umfassen 500 zu 400, 1000 zu 800 und 1650 zu 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Schwimmtempo-Rechner', description: 'Verwandle Gesamtzeit und Distanz in Zieltempos.', tag: 'Rechner' },
      { route: 'split-calculator', title: 'Zwischenzeiten-Rechner', description: 'Teile eine Zielzeit in kumulative Zwischenzeiten.', tag: 'Rechner' },
      { route: 'css-calculator', title: 'Kritische Schwimmgeschwindigkeit', description: 'Berechne Schwellenwerttempo und Trainingszonen.', tag: 'Rechner' },
      { route: 'interval-calculator', title: 'Serien und Abgänge', description: 'Erstelle ein Set aus Wiederholungen, Distanz und Tempo.', tag: 'Rechner' },
      { route: 'scy-to-lcm', title: 'SCY-zu-LCM-Umrechnung', description: 'Rechne kurze Yards-Bahn in lange Meter-Bahn um.', tag: 'Umrechnung' },
      { route: 'scy-to-scm', title: 'SCY-zu-SCM-Umrechnung', description: 'Rechne US-Kurzstrecke in internationale Kurzstrecke um.', tag: 'Umrechnung' },
    ],
  },
  about: {
    title: 'Über uns – Schwimmzeit-Umrechner',
    description: 'Über den kostenlosen Schwimmzeit-Umrechner für SCY-, SCM- und LCM-Zeiten.',
    h1: 'Über den Schwimmzeit-Umrechner',
    lead: 'Ein kostenloses, schnelles und datenschutzfreundliches Tool zum Vergleichen von Schwimmleistungen zwischen Wettkampfbahnen.',
    sections: [
      section('Warum wir ihn entwickelt haben', ['Schwimmer müssen Zeiten in Yards und Metern vergleichen, wenn sie zwischen Wettkämpfen wechseln oder Tempo-Tools verwenden. Wir haben eine schnelle Seite entwickelt, die auf jedem Gerät funktioniert und eine weit verständliche Methode verwendet.', 'Alles läuft in deinem Browser. Deine Zeiten verlassen dein Gerät nie.']),
      section('Die Umrechnungsmethode', ['Der Rechner verwendet einen faktorbasierten Ansatz mit dokumentierten Anpassungen für die Bahn und pro Wendung. Langstreckenfreistil verwendet eigene Faktoren. Die Ergebnisse sind gute Schätzungen, keine offiziellen Umrechnungen.']),
      section('Einschränkungen', ['Keine Umrechnung ist exakt. Wendungen, Atmung, Höhe, Pacing und Schwimmtechnik beeinflussen die tatsächliche Leistung. Verwende für Wettkampfmeldungen immer die offiziellen Regeln.']),
      section('Kontakt', ['Fragen, Korrekturen oder Vorschläge sind über die Kontaktseite willkommen.']),
    ],
  },
  contact: {
    title: 'Kontakt – Schwimmzeit-Umrechner',
    description: 'Kontaktiere das Team des Schwimmzeit-Umrechners bei Fragen, Feedback oder Korrekturen.',
    h1: 'Kontakt zum Schwimmzeit-Umrechner',
    lead: 'Ein Problem gefunden oder eine Idee für eine Funktion? Sende eine Nachricht an hello@onlineswimtimeconverter.com.',
    sections: [
      section('Kontakt aufnehmen', ['Wir lesen jede Nachricht. Verwende die oben genannte E-Mail-Adresse für Fragen, Korrekturen, Funktionsvorschläge und Partnerschaften.']),
      section('Du suchst ein Tool?', ['Verwende die Rechner und Anleitungen, um Zeiten zu vergleichen, das Tempo zu berechnen und Rennpläne zu erstellen.']),
    ],
  },
  'privacy-policy': {
    title: 'Datenschutzerklärung – Schwimmzeit-Umrechner',
    description: 'Datenschutzerklärung für die browserbasierten Schwimmzeit-Umrechner.',
    h1: 'Datenschutzerklärung',
    lead: 'Gültig ab Januar 2026. Diese Erklärung beschreibt, welche Daten diese Website erhebt und wie sie verwendet werden.',
    sections: [
      section('Datenschutz als Grundprinzip', ['Die Rechner laufen in deinem Browser. In einen Rechner eingegebene Zeiten und Distanzen werden nicht an einen Server übertragen.']),
      section('Lokaler Speicher und Cookies', ['Dein Browser kann Einstellungen wie Design oder Rechneroptionen speichern. Diese Website verwendet minimale eigene Speicherung und verkauft keine personenbezogenen Daten.']),
      section('Automatische Daten und Dienste', ['Hosting- und Analyseanbieter können routinemäßige technische Informationen verarbeiten, um die Website zu betreiben und zu verbessern.']),
      section('Deine Rechte und Kinder', ['Du kannst sofern anwendbar Zugriff, Berichtigung oder Löschung personenbezogener Daten verlangen. Die Website richtet sich an die Allgemeinbevölkerung und erhebt wissentlich keine Daten von Kindern.']),
      section('Änderungen der Erklärung', ['Diese Erklärung kann aktualisiert werden, wenn sich die Website ändert. Die aktuelle Version wird auf dieser Seite veröffentlicht.']),
    ],
  },
  terms: {
    title: 'Nutzungsbedingungen – Schwimmzeit-Umrechner',
    description: 'Nutzungsbedingungen für die kostenlosen browserbasierten Schwimmzeit-Umrechner-Tools.',
    h1: 'Nutzungsbedingungen',
    lead: 'Gültig ab Januar 2026. Diese Bedingungen regeln deine Nutzung von onlineswimtimeconverter.com.',
    sections: [
      section('Art des Dienstes', ['Die Website bietet kostenlose browserbasierte Schätzungen für Schwimmzeiten, Tempo und Zwischenzeiten. Die Tools werden ohne Gewährleistung bereitgestellt.']),
      section('Keine offizielle Sportberatung', ['Umgerechnete Zeiten sind Schätzungen und weder offiziell noch zertifiziert. Befolge die Regeln der Organisation, die Wettkampfzeiten akzeptiert.']),
      section('Zulässige Nutzung und Haftung', ['Nutze die Website nicht missbräuchlich, störe sie nicht und extrahiere keine Massendaten. Wir haften nicht für Schäden aus der Nutzung des Dienstes oder dem Vertrauen in seine Schätzungen.']),
      section('Geistiges Eigentum und Änderungen', ['Design, Texte und Funktionen der Website dürfen ohne Genehmigung nicht kommerziell reproduziert werden. Diese Bedingungen können mit ihrer Veröffentlichung geändert werden.']),
    ],
  },
};
