import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const italianPages: PageCatalog = {
  home: {
    title: 'Convertitore tempi di nuoto: calcolatore SCY, SCM e LCM',
    description: 'Converti i tempi di nuoto tra SCY, SCM e LCM e converti iarde in metri. Calcolatore gratuito per nuotatori internazionali.',
    h1: 'Convertitore tempi di nuoto',
    lead: 'Converti i tempi di nuoto tra le corsie SCY, SCM e LCM, con la conversione da iarde a metri inclusa.',
    eyebrow: 'Calcolatore di nuoto gratuito',
    sections: [
      section('Calcolatori di nuoto correlati', ['Confronta ritmo, frazioni, velocità critica di nuoto, intervalli, velocità, calorie e lunghezze della piscina con strumenti pensati per i nuotatori.']),
      section('Convertitori di corsia', ['Scegli una combinazione di corsie per convertire un tempo di nuoto tra una piscina da 25 iarde, una da 25 metri e una da 50 metri.']),
      section('SCY vs SCM vs LCM', ['La lunghezza della piscina cambia il numero di virate e la distanza percorsa. SCY usa 25 iarde, SCM usa 25 metri e LCM usa 50 metri.']),
      section('Come funziona un convertitore di tempi di nuoto?', ['Il convertitore applica un fattore di corsia documentato e una correzione per ogni virata. Molti programmi per fasce d’età e Masters usano i fattori del Colorado.', 'Tutti i risultati sono stime perché ogni nuotatore ottiene un vantaggio diverso da virate e pareti.']),
      section('Come usare questo convertitore', ['Scegli corsia e gara, inserisci il tempo e leggi il tempo equivalente in ogni corsia.']),
      section('Perché usare il convertitore di tempi di nuoto?', ['Uno strumento gratuito e privato nel browser per confrontare risultati, impostare obiettivi di qualificazione, pianificare i ritmi di allenamento e convertire iarde in metri senza installare software.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calcolatore ritmo di nuoto', description: 'Trova il ritmo target ogni 25, 50, 100, 200 o 400.' },
      { route: 'split-calculator', title: 'Calcolatore frazioni di nuoto', description: 'Genera frazioni cumulative uniformi per qualsiasi distanza di gara.' },
      { route: 'css-calculator', title: 'Velocità critica di nuoto (CSS)', description: 'Calcola ritmo soglia e zone di allenamento da un test 400 + 200.' },
      { route: 'interval-calculator', title: 'Intervalli e partenze', description: 'Crea una serie di allenamento con ripetizioni, ritmo e partenze.' },
      { route: 'speed-calculator', title: 'Velocità e previsione di gara', description: 'Converti il ritmo in m/s, km/h e tempi di gara previsti.' },
      { route: 'calories-calculator', description: 'Stima le calorie in base a stile, intensità, peso e durata.', title: 'Calorie nuotando' },
      { route: 'lengths-converter', title: 'Lunghezze e distanza', description: 'Converti distanze e lunghezze per piscine da 25 yd, 25 m e 50 m.' },
    ],
    courses: [
      { code: 'SCY', name: 'Iarde in corsia corta', length: '25 iarde', usage: 'Scuole superiori USA, NCAA e gare club' },
      { code: 'SCM', name: 'Metri in corsia corta', length: '25 metri', usage: 'Competizioni internazionali in corsia corta' },
      { code: 'LCM', name: 'Metri in corsia lunga', length: '50 metri', usage: 'Giochi Olimpici e Campionati mondiali' },
    ],
    faqs: [
      faq('Che cos’è un convertitore di tempi di nuoto?', 'Stima come un tempo registrato in una corsia si confronti con il tempo equivalente in un’altra. Lo stesso sforzo può produrre tempi finali diversi perché la lunghezza della piscina cambia il numero di virate.'),
      faq('Cosa significano SCY, SCM e LCM?', 'SCY è una piscina da 25 iarde, SCM è una piscina da 25 metri e LCM è una piscina da 50 metri. Sono le tre lunghezze standard delle piscine da competizione.'),
      faq('Come converto SCY in LCM?', 'Seleziona SCY come corsia di partenza, scegli gara e tempo, poi seleziona LCM come destinazione. Il convertitore applica un fattore di corsia e una correzione per ogni virata.'),
      faq('Le conversioni dei tempi di nuoto sono esatte?', 'No. Virate, pareti, respirazione e ritmo variano per ogni nuotatore, quindi ogni conversione è una stima. Tratta i risultati come approssimazioni, non come tempi ufficiali.'),
      faq('Il convertitore di tempi di nuoto è gratuito e privato?', 'Sì. Funziona interamente nel browser, consente conversioni illimitate e non invia i tempi inseriti a un server.'),
    ],
  },
  'pace-calculator': {
    title: 'Calcolatore ritmo di nuoto – Convertitore tempi di nuoto',
    description: 'Calcola il ritmo di nuoto ogni 100, 200, 400 o per qualsiasi distanza dal tempo totale e dalla distanza.',
    h1: 'Calcolatore ritmo di nuoto',
    lead: 'Calcola il ritmo ogni 25, 50, 100, 200 o 400 in iarde o metri partendo dal tempo totale e dalla distanza.',
    sections: [
      section('Come usare il calcolatore di ritmo', [], ['Inserisci la distanza totale e scegli iarde o metri.', 'Inserisci il tempo totale.', 'Scegli un intervallo come 100, 200, 400 o una distanza personalizzata.', 'Calcola e usa il risultato per pianificare una serie uniforme.'], ['Inserisci la distanza totale e scegli iarde o metri.', 'Inserisci il tempo totale.', 'Scegli un intervallo come 100, 200, 400 o una distanza personalizzata.', 'Calcola e usa il risultato per pianificare una serie uniforme.']),
      section('Obiettivi di ritmo comuni', ['Il ritmo è il tempo necessario per completare un intervallo. Gli allenatori usano partenze per mantenere coerenti le serie di allenamento.']),
      section('Perché usare il calcolatore di ritmo di nuoto?', ['Converti un tempo totale misurato nei secondi per 100 usati dagli allenatori su un orologio di ritmo. Scegli metri per un ritmo 100 m o iarde per un ritmo 100 yd.']),
    ],
    faqs: [
      faq('Come si calcola il ritmo di nuoto?', 'Dividi i secondi totali per la distanza totale e moltiplica per l’intervallo. Ad esempio, 6:05 su 500 m corrispondono a 73 secondi ogni 100 m.'),
      faq('Qual è un buon ritmo sui 100 metri?', 'Dipende dalla gara e dal livello. Usa questo calcolatore per suddividere un tempo target in frazioni realistiche invece di affidarti a una sola media.'),
      faq('Devo dividere la gara in frazioni uguali?', 'La maggior parte dei nuotatori di fondo punta a frazioni quasi uguali. Un piccolo vantaggio finale è normale, quindi pianifica in modo uniforme e adatta i dati della gara.'),
    ],
  },
  'split-calculator': {
    title: 'Calcolatore frazioni di nuoto – Convertitore tempi di nuoto',
    description: 'Genera frazioni di nuoto uniformi per qualsiasi distanza di gara e consulta i tempi cumulativi ogni 25, 50 o 100.',
    h1: 'Calcolatore frazioni di nuoto',
    lead: 'Dividi una gara di nuoto in frazioni target uniformi e leggi i tempi cumulativi ogni 50 o 100.',
    sections: [
      section('Come usare il calcolatore delle frazioni', [], ['Scegli distanza e unità della gara.', 'Inserisci il tempo obiettivo.', 'Scegli una lunghezza di 25, 50 o 100.', 'Leggi i tempi cumulativi e il ritmo di ogni frazione.'], ['Scegli distanza e unità della gara.', 'Inserisci il tempo obiettivo.', 'Scegli una lunghezza di 25, 50 o 100.', 'Leggi i tempi cumulativi e il ritmo di ogni frazione.']),
      section('Guida al ritmo di gara', ['Pianifica una prima lunghezza rapida ma controllata, poi mantieni una velocità uniforme. Un vantaggio finale è normale nelle gare di fondo.']),
      section('Perché usare il calcolatore delle frazioni di nuoto?', ['Il tempo finale mostra quanto hai nuotato veloce; le frazioni mostrano come. Usa obiettivi cumulativi per rendere ripetibile il piano di gara in allenamento.']),
    ],
    faqs: [
      faq('Cosa sono le frazioni di nuoto?', 'Sono i tempi di ogni segmento di una gara, solitamente ogni 50 o 100. Consentono di confrontare il ritmo durante la gara invece di vedere solo il tempo finale.'),
      faq('Ogni frazione deve essere esattamente uguale?', 'La maggior parte dei nuotatori di fondo pianifica frazioni quasi uguali e può rallentare leggermente alla fine. Allena il ritmo che vuoi eseguire.'),
      faq('Come uso le frazioni in allenamento?', 'Inserisci un tempo di gara target, pratica ogni intervallo con partenze e confronta i tempi cumulativi a ogni virata.'),
    ],
  },
  'css-calculator': {
    title: 'Calcolatore CSS – Velocità critica di nuoto',
    description: 'Trova la velocità critica di nuoto da un test 400 + 200 e ottieni ritmo CSS, zone di allenamento e tempi previsti.',
    h1: 'Calcolatore velocità critica di nuoto (CSS)',
    lead: 'Nuda un 400 impegnativo e un 200 veloce per stimare ritmo soglia, cinque zone di allenamento e tempi di gara previsti.',
    sections: [
      section('Come eseguire il test', [], ['Riscaldati adeguatamente.', 'Nuda un 400 al massimo.', 'Recupera per 3–5 minuti e nuota un 200 al massimo.', 'Inserisci entrambi i tempi per calcolare il CSS.'], ['Riscaldati adeguatamente.', 'Nuda un 400 al massimo.', 'Recupera per 3–5 minuti e nuota un 200 al massimo.', 'Inserisci entrambi i tempi per calcolare il CSS.']),
      section('Comprendere le zone', ['Usa i ritmi di recupero e aerobico per il lavoro facile, il tempo per il ritmo controllato, la soglia per le serie CSS e la Zona 5 per ripetizioni brevi e di qualità.']),
      section('Perché usare il calcolatore della velocità critica?', ['Due nuotate al massimo forniscono un ritmo soglia riproducibile e un sistema pratico per zone di allenamento e previsioni di gara.']),
    ],
    faqs: [
      faq('Che cos’è la velocità critica di nuoto (CSS)?', 'È il ritmo più veloce che puoi mantenere con fatica controllata. Viene stimato da un test lungo di 400 e uno corto di 200.'),
      faq('Ogni quanto devo ripetere il test CSS?', 'Ripeti il test ogni quattro-sei settimane o all’inizio di un nuovo blocco di allenamento, soprattutto dopo un miglioramento aerobico.'),
      faq('Il CSS è uguale al ritmo di gara?', 'Non esattamente. Un 400 può essere leggermente più veloce del CSS, mentre 1500 o un miglio si stabiliscono di solito vicino al ritmo CSS.'),
    ],
  },
  'interval-calculator': {
    title: 'Calcolatore intervalli e partenze di nuoto',
    description: 'Crea serie di allenamento con ripetizioni, distanza e ritmo, poi calcola i tempi di ripetizione e le partenze.',
    h1: 'Calcolatore intervalli e partenze di nuoto',
    lead: 'Trasforma un ritmo target in una serie completa con tempi di ripetizione, partenze, totali e orari di partenza dal cronometro.',
    sections: [
      section('Come usare il generatore di serie', [], ['Inserisci le ripetizioni e la distanza per ripetizione.', 'Imposta il ritmo ogni 100.', 'Scegli un riposo fisso o una partenza fissa.', 'Leggi tempo di ripetizione, totali e orari di partenza.'], ['Inserisci le ripetizioni e la distanza per ripetizione.', 'Imposta il ritmo ogni 100.', 'Scegli un riposo fisso o una partenza fissa.', 'Leggi tempo di ripetizione, totali e orari di partenza.']),
      section('Serie classiche da provare', ['Prova una serie CSS, una serie aerobica 20 × 50, una serie di media distanza 6 × 200 o una scala discendente.']),
      section('Perché usare il calcolatore degli intervalli?', ['Elimina i calcoli da serie come 8 × 100 a 1:30 e produce un piano con orologio di ritmo da seguire al muro.']),
    ],
    faqs: [
      faq('Che cos’è una partenza di nuoto?', 'È l’intervallo fisso con cui lasci il muro per ogni ripetizione. La differenza tra partenza e tempo di ripetizione è il riposo.'),
      faq('Devo costruire le serie in base alla partenza o al riposo?', 'Si usano entrambi. Una partenza fissa rende coerente il ritmo; un riposo fisso mantiene visibile il rapporto tra lavoro e riposo mentre la fatica modifica il tempo di ripetizione.'),
      faq('Quanto tempo devo riposare tra le ripetizioni?', 'Le serie di velocità usano spesso 20–30 secondi o più, mentre quelle soglia e CSS usano comunemente 10–15 secondi.'),
    ],
  },
  'speed-calculator': {
    title: 'Calcolatore velocità e previsione di gara di nuoto',
    description: 'Converti tempo e distanza di nuoto in ritmo ogni 100m o 100yd, velocità e tempi di gara previsti.',
    h1: 'Calcolatore velocità e previsione di gara di nuoto',
    lead: 'Inserisci un tempo e una distanza di riferimento per vedere ritmo, velocità e tempi previsti dal 200 al miglio.',
    sections: [
      section('Come usarlo', [], ['Scegli una nuotata di riferimento.', 'Seleziona metri o iarde e inserisci il tempo.', 'Leggi il ritmo ogni 100, la velocità e i tempi previsti.', 'Usa una previsione per scegliere il ritmo di allenamento.'], ['Scegli una nuotata di riferimento.', 'Seleziona metri o iarde e inserisci il tempo.', 'Leggi il ritmo ogni 100, la velocità e i tempi previsti.', 'Usa una previsione per scegliere il ritmo di allenamento.']),
      section('Riferimenti da conoscere', ['Il 400 è la distanza classica del test CSS. Il 1500 e il 1650 sono gare comuni da un miglio in piscina, mentre 1760 iarde sono il vero miglio.']),
      section('Perché usare il calcolatore di velocità?', ['Il ritmo descrive un intervallo di allenamento e la velocità descrive lo sforzo prodotto. Questo strumento mostra entrambi nelle unità usate da allenatori e nuotatori.']),
    ],
    faqs: [
      faq('Perché il ritmo ogni 100 yd differisce da quello ogni 100 m?', 'Un yard è più corto di un metro, quindi alla stessa velocità 100 iarde coprono una distanza minore di 100 metri.'),
      faq('Quanto sono affidabili i tempi di gara previsti?', 'Supponono che la velocità di riferimento venga mantenuta per tutta la distanza. Usali come obiettivo iniziale e adattali a ritmo, drafting e condizioni.'),
      faq('Che cos’è un miglio in piscina?', 'I nuotatori agonistici chiamano spesso miglio 1500 metri o 1650 iarde. Il vero miglio è 1760 iarde, circa 1609 metri.'),
    ],
  },
  'calories-calculator': {
    title: 'Calcolatore calorie nuotando',
    description: 'Stima le calorie bruciate nuotando in base a stile, intensità, peso corporeo e durata.',
    h1: 'Calcolatore calorie nuotando',
    lead: 'Stima le calorie bruciate in base a peso, stile, intensità e tempo passato in acqua.',
    sections: [
      section('Come usarlo', [], ['Inserisci il peso corporeo.', 'Scegli lo stile di nuoto.', 'Scegli un’intensità leggera, moderata o vigorosa.', 'Inserisci la durata e leggi la stima e il tasso orario.'], ['Inserisci il peso corporeo.', 'Scegli lo stile di nuoto.', 'Scegli un’intensità leggera, moderata o vigorosa.', 'Inserisci la durata e leggi la stima e il tasso orario.']),
      section('Perché gli stili differiscono', ['La farfalla richiede generalmente più sforzo, mentre il galleggiamento in verticale è l’opzione con meno sforzo. L’intensità può contare quanto lo stile.']),
      section('Perché usare il calcolatore delle calorie', ['La stima combina peso, stile, intensità e durata usando valori MET standard, offrendo un numero più utile per pianificare rispetto a una media generica.']),
    ],
    faqs: [
      faq('Quanto sono precise le stime delle calorie nuotando?', 'Sono stime basate su valori MET, peso corporeo e durata. Tecnica, temperatura della piscina e metabolismo individuale influenzano il risultato.'),
      faq('Quante calorie si bruciano nuotando in un’ora?', 'La risposta dipende da stile e intensità. Un nuotatore di 70 kg può bruciare circa 400–700 kcal all’ora durante un allenamento tipico.'),
      faq('Bisogna reintegrare le calorie bruciate nuotando?', 'Per la maggior parte dei nuotatori è appropriato mangiare normalmente. Usa la stima come indicazione, non come una prescrizione nutrizionale precisa.'),
    ],
  },
  'lengths-converter': {
    title: 'Convertitore distanze di nuoto – Iarde in metri e lunghezze piscina',
    description: 'Converti distanze di nuoto: iarde in metri, metri in iarde e distanze in lunghezze piscina.',
    h1: 'Convertitore distanze e lunghezze di nuoto',
    lead: 'Converti iarde in metri o metri in iarde, poi scopri quante vasche corrispondono a una distanza in una piscina da 25 iarde, 25 metri o 50 metri.',
    sections: [
      section('Come usarlo', [], ['Scegli iarde e metri oppure distanza e vasche.', 'Inserisci una distanza o un numero di vasche.', 'Usa le impostazioni rapide per le distanze di nuoto comuni.', 'Leggi le vasche complete, il resto o la distanza equivalente.'], ['Scegli iarde e metri oppure distanza e vasche.', 'Inserisci una distanza o un numero di vasche.', 'Usa le impostazioni rapide per le distanze di nuoto comuni.', 'Leggi le vasche complete, il resto o la distanza equivalente.']),
      section('Riferimento rapido iarde-metri', ['25 iarde equivalgono a 22.86 metri, 50 iarde a 45.72 metri e 1650 iarde a 1508.76 metri. Nell’altra direzione, 25 metri equivalgono a 27.34 iarde e 1500 metri a 1640.42 iarde.']),
      section('Perché usare il convertitore di vasche?', ['Le domande sulla distanza della piscina influenzano i piani di allenamento. Converti distanze esatte e conta le vasche in piscine da 25 iarde, 25 metri e 50 metri.']),
    ],
    faqs: [
      faq('Come converto 25 iarde in metri?', 'Moltiplica le iarde per 0.9144: 25 iarde equivalgono a 22.86 metri, la lunghezza di una piscina in corto corsia a iarde.'),
      faq('Quanti metri sono 50 iarde?', '50 iarde equivalgono a 45.72 metri. Altre conversioni comuni sono 100 iarde = 91.44 metri e 1650 iarde = 1508.76 metri.'),
      faq('Quante vasche sono 1500 metri?', 'Sono 60 vasche in una piscina da 25 metri e 30 in una da 50 metri. Una nuotata di 1650 iarde è 66 vasche in una piscina da 25 iarde.'),
    ],
  },
  'scy-to-lcm': {
    title: 'Convertitore da SCY a LCM – Convertitore tempi di nuoto',
    description: 'Converti i tempi di nuoto SCY in LCM usando un metodo di conversione del nuoto documentato.',
    h1: 'Convertitore da SCY a LCM',
    lead: 'Converti un tempo in una piscina corta da 25 iarde in un tempo stimato in una piscina lunga da 50 metri.',
    sections: [
      section('Che cos’è la conversione da SCY a LCM?', ['Una piscina da 25 iarde e una da 50 metri cambiano la distanza e il numero di virate. Il convertitore scala il tempo e aggiunge una correzione per ogni virata della piscina più grande.']),
      section('Come funziona la stima', ['Le gare di stile libero usano le abbinamenti abituali: 500 stile libero con 400 stile libero, 1000 con 800 e 1650 con 1500. Tutti i risultati sono stime.']),
    ],
    faqs: [
      faq('Qual è il fattore di conversione da SCY a LCM?', 'Il fattore base da iarde a metri è 1.11, con correzioni per distanza e virate specifiche della gara. Lo stile libero di lunga distanza usa fattori di abbinamento separati.'),
      faq('Perché i tempi LCM sono più lenti?', 'Una piscina da 50 metri ha meno virate di una da 25 iarde. Il nuotatore in corsia corta riceve più spinte dal muro, quindi lo stesso sforzo può essere più veloce in iarde.'),
    ],
  },
  'scy-to-scm': {
    title: 'Convertitore da SCY a SCM – Convertitore tempi di nuoto',
    description: 'Converti i tempi di nuoto SCY in SCM, corsia corta in metri.',
    h1: 'Convertitore da SCY a SCM',
    lead: 'Converti un tempo in una piscina da 25 iarde in un tempo stimato per una piscina da 25 metri.',
    sections: [
      section('Che cos’è la conversione da SCY a SCM?', ['SCY e SCM usano entrambe piscine da 25 vasche, quindi il numero di virate è uguale. La differenza principale è che un metro è più lungo di un yard.']),
      section('Come funziona la stima', ['Il fattore standard è 1.11 per gare simili. Lo stile libero sulla distanza usa abbinamenti separati da 500 a 400, da 1000 a 800 e da 1650 a 1500.']),
    ],
    faqs: [
      faq('Qual è il fattore di conversione da SCY a SCM?', 'Per gare simili, moltiplica i secondi della corsia corta in iarde per 1.11 perché una vasca da 25 iarde è più corta di una da 25 metri.'),
      faq('500 iarde equivalgono a 400 o 500 metri?', 'Una gara di stile libero da 500 iarde corrisponde a quella da 400 metri nella competizione internazionale in corsia corta.'),
    ],
  },
  'scm-to-lcm': {
    title: 'Convertitore da SCM a LCM – Convertitore tempi di nuoto',
    description: 'Converti i tempi della corsia corta in metri in tempi stimati della corsia lunga in metri.',
    h1: 'Convertitore da SCM a LCM',
    lead: 'Converti un tempo in una piscina da 25 metri in un tempo stimato per una piscina da 50 metri.',
    sections: [
      section('Che cos’è la conversione da SCM a LCM?', ['SCM e LCM usano le stesse distanze metriche, ma una piscina da 25 metri ha più del doppio delle virate di una da 50 metri. La stima corregge per queste virate aggiuntive.']),
      section('Come funziona la stima', ['I valori di secondi per virata specifici dello stile spiegano la differenza. La stessa logica vale per le gare di stile libero da 400, 800 e 1500 metri.']),
    ],
    faqs: [
      faq('Come converto SCM in LCM?', 'Le distanze coincidono, quindi il convertitore aggiunge la differenza di tempo stimata causata dalle virate aggiuntive in una piscina da 25 metri.'),
      faq('Quanto è più veloce SCM rispetto a LCM?', 'Le gare sprint possono guadagnare qualche decimo di secondo, mentre le gare da 200 metri o più possono guadagnare un secondo o più perché hanno più virate.'),
    ],
  },
  'lcm-to-scy': {
    title: 'Convertitore da LCM a SCY – Convertitore tempi di nuoto',
    description: 'Converti i tempi della corsia lunga in metri in tempi stimati della corsia corta in iarde.',
    h1: 'Convertitore da LCM a SCY',
    lead: 'Converti un tempo in una piscina da 50 metri in un tempo stimato per una piscina da 25 iarde.',
    sections: [
      section('Che cos’è la conversione da LCM a SCY?', ['Una gara da 50 metri ha meno virate, quindi la conversione inversa rimuove il vantaggio delle virate e scala i metri in iarde.']),
      section('Come funziona la stima', ['Lo stile libero sulla distanza abbina 400 metri a 500 iarde, 800 metri a 1000 iarde e 1500 metri a 1650 iarde. Tutti i tempi convertiti sono stime.']),
    ],
    faqs: [
      faq('Qual è il fattore di conversione da LCM a SCY?', 'Per gare simili si usa l’inverso di 1.11, insieme a una correzione per le virate aggiuntive in una piscina da 25 iarde.'),
      faq('Perché un tempo SCY è più veloce?', 'Una piscina da 25 iarde ha più pareti e ogni virata offre una spinta dal muro che può rendere più veloce il tempo totale.'),
    ],
  },
  'lcm-to-scm': {
    title: 'Convertitore da LCM a SCM – Convertitore tempi di nuoto',
    description: 'Converti i tempi della corsia lunga in metri in tempi stimati della corsia corta in metri.',
    h1: 'Convertitore da LCM a SCM',
    lead: 'Converti un tempo in una piscina da 50 metri in un tempo stimato per una piscina da 25 metri.',
    sections: [
      section('Che cos’è la conversione da LCM a SCM?', ['Le distanze sono uguali, quindi la differenza deriva dalle virate aggiuntive disponibili in una piscina da 25 metri.']),
      section('Come funziona la stima', ['Un valore di secondi per virata specifico dello stile viene applicato alle pareti aggiuntive. Le gare più lunghe mostrano una differenza maggiore.']),
    ],
    faqs: [
      faq('Come converto LCM in SCM?', 'Poiché le distanze sono identiche, il convertitore rimuove il vantaggio delle virate della corsia più lunga usando valori di virata specifici dello stile.'),
      faq('La corsia corta è più veloce di quella lunga?', 'Di solito sì. Più pareti in una piscina da 25 metri offrono più spinte e producono tempi più veloci per lo stesso nuotatore e la stessa gara.'),
    ],
  },
  'scm-to-scy': {
    title: 'Convertitore da SCM a SCY – Convertitore tempi di nuoto',
    description: 'Converti i tempi della corsia corta in metri in tempi stimati della corsia corta in iarde.',
    h1: 'Convertitore da SCM a SCY',
    lead: 'Converti un tempo in una piscina da 25 metri in un tempo stimato per una piscina da 25 iarde.',
    sections: [
      section('Che cos’è la conversione da SCM a SCY?', ['Entrambe le piscine sono in corsia corta e hanno lo stesso numero di virate. La conversione scala soprattutto la distanza perché un yard è più corto di un metro.']),
      section('Come funziona la stima', ['Usa gli abbinamenti standard da 400 metri a 500 iarde, da 800 a 1000 iarde e da 1500 a 1650 iarde. I risultati sono stime.']),
    ],
    faqs: [
      faq('Qual è il fattore di conversione da SCM a SCY?', 'Per gare corrispondenti, dividi i secondi SCM per 1.11 perché il numero di virate è uguale e cambia solo la distanza della vasca.'),
      faq('I tempi SCM convertiti possono essere usati nelle gare USA?', 'Alcune gare accettano tempi convertiti, ma gli organizzatori possono applicare regole proprie. Controlla prima le informazioni di iscrizione della gara.'),
    ],
  },
  guides: {
    title: 'Guide – Convertitore tempi di nuoto',
    description: 'Guide passo dopo passo per convertire i tempi di nuoto, il ritmo e le frazioni di gara.',
    h1: 'Guide del convertitore tempi di nuoto',
    lead: 'Tutto quello che serve per confrontare i tempi tra le corsie, pianificare i ritmi e creare frazioni di gara.',
    sections: [
      section('Come funzionano le conversioni dei tempi di nuoto', ['SCY si nuota a 25 iarde, SCM a 25 metri e LCM a 50 metri. Abbina prima le gare, scala la distanza e poi correggi per le virate.', 'Nessuna conversione è esatta. Usa i risultati per confrontare e pianificare e segui le regole ufficiali quando invii un tempo.']),
      section('Riferimento rapido', ['Da SCY a SCM: moltiplica per 1.11 per gare simili. Da SCM a LCM: aggiungi il tempo delle virate. Gli abbinamenti di distanza includono 500 con 400, 1000 con 800 e 1650 con 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calcolatore ritmo di nuoto', description: 'Trasforma tempo e distanza totali in ritmi target.', tag: 'Calcolatore' },
      { route: 'split-calculator', title: 'Calcolatore frazioni di nuoto', description: 'Dividi un tempo target in frazioni cumulative.', tag: 'Calcolatore' },
      { route: 'css-calculator', title: 'Velocità critica di nuoto', description: 'Calcola ritmo soglia e zone di allenamento.', tag: 'Calcolatore' },
      { route: 'interval-calculator', title: 'Intervalli e partenze', description: 'Crea una serie da ripetizioni, distanza e ritmo.', tag: 'Calcolatore' },
      { route: 'scy-to-lcm', title: 'Conversione da SCY a LCM', description: 'Converti la corsia corta in iarde in metri lunga corsia.', tag: 'Conversione' },
      { route: 'scy-to-scm', title: 'Conversione da SCY a SCM', description: 'Converti la corsia corta USA nella corsia corta internazionale.', tag: 'Conversione' },
    ],
  },
  about: {
    title: 'Informazioni – Convertitore tempi di nuoto',
    description: 'Informazioni sul convertitore gratuito di tempi SCY, SCM e LCM.',
    h1: 'Informazioni sul convertitore tempi di nuoto',
    lead: 'Uno strumento gratuito, veloce e rispettoso della privacy per confrontare le prestazioni di nuoto tra le corsie da competizione.',
    sections: [
      section('Perché lo abbiamo creato', ['I nuotatori devono confrontare i tempi tra iarde e metri quando cambiano gara o usano strumenti di ritmo. Abbiamo creato una pagina veloce che funziona su qualsiasi dispositivo e usa un metodo ampiamente compreso.', 'Tutto funziona nel browser. I tuoi tempi non lasciano mai il dispositivo.']),
      section('Il metodo di conversione', ['Il calcolatore usa un approccio basato su fattori con correzioni documentate per corsia e virata. Le gare di stile libero sulla distanza usano fattori propri. I risultati sono stime vicine, non conversioni ufficiali.']),
      section('Limiti', ['Nessuna conversione è esatta. Virate, respirazione, altitudine, ritmo e stile influenzano le prestazioni reali. Usa sempre le regole ufficiali per le iscrizioni competitive.']),
      section('Contatti', ['Domande, correzioni o suggerimenti sono benvenuti tramite la pagina dei contatti.']),
    ],
  },
  contact: {
    title: 'Contatti – Convertitore tempi di nuoto',
    description: 'Contatta il team del convertitore tempi di nuoto per domande, feedback o correzioni.',
    h1: 'Contatti del convertitore tempi di nuoto',
    lead: 'Hai trovato un problema o hai un’idea per una funzione? Invia un messaggio a hello@onlineswimtimeconverter.com.',
    sections: [
      section('Contattaci', ['Leggiamo ogni messaggio. Usa l’indirizzo email sopra per domande, correzioni, suggerimenti di funzioni e partnership.']),
      section('Cerchi uno strumento?', ['Usa i calcolatori e le guide per confrontare i tempi, calcolare il ritmo e creare piani di gara.']),
    ],
  },
  'privacy-policy': {
    title: 'Informativa sulla privacy – Convertitore tempi di nuoto',
    description: 'Informativa sulla privacy per i calcolatori del convertitore tempi di nuoto nel browser.',
    h1: 'Informativa sulla privacy',
    lead: 'In vigore da gennaio 2026. Questa informativa spiega quali dati raccoglie il sito e come vengono utilizzati.',
    sections: [
      section('Privacy by design', ['I calcolatori funzionano nel browser. Tempi e distanze inseriti non vengono trasmessi a un server.']),
      section('Archiviazione locale e cookie', ['Il browser può archiviare preferenze come tema o impostazioni dei calcolatori. Il sito usa una quantità minima di archiviazione propria e non vende informazioni personali.']),
      section('Dati e servizi automatizzati', ['I fornitori di hosting e analisi possono elaborare informazioni tecniche di routine per far funzionare e migliorare il sito.']),
      section('I tuoi diritti e i bambini', ['Puoi richiedere accesso, correzione o cancellazione dei dati personali quando applicabile. Il sito è destinato a un pubblico generale e non raccoglie consapevolmente dati dei bambini.']),
      section('Modifiche alla policy', ['Questa informativa può essere aggiornata quando il sito cambia. La versione corrente è pubblicata in questa pagina.']),
    ],
  },
  terms: {
    title: 'Termini di servizio – Convertitore tempi di nuoto',
    description: 'Termini di servizio per gli strumenti gratuiti del convertitore tempi di nuoto nel browser.',
    h1: 'Termini di servizio',
    lead: 'In vigore da gennaio 2026. Questi termini regolano l’uso di onlineswimtimeconverter.com.',
    sections: [
      section('Natura del servizio', ['Il sito offre stime gratuite nel browser per tempi di nuoto, ritmo e frazioni. Gli strumenti sono forniti come disponibili senza garanzie.']),
      section('Nessun consiglio sportivo ufficiale', ['I tempi convertiti sono stime e non sono ufficiali o certificati. Segui le regole dell’organizzazione che accetta i tempi di competizione.']),
      section('Uso accettabile e responsabilità', ['Non usare il sito in modo abusivo, non interromperlo e non raccoglierne massivamente i contenuti. Non siamo responsabili dei danni derivanti dall’uso del servizio o dall’affidamento alle stime.']),
      section('Proprietà intellettuale e modifiche', ['Il design, il testo e le funzionalità del sito non possono essere riprodotti commercialmente senza autorizzazione. Questi termini possono cambiare quando vengono pubblicati.']),
    ],
  },
};