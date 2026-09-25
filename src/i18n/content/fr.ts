import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const frenchPages: PageCatalog = {
  home: {
    title: 'Convertisseur de temps de nage : SCY, SCM et LCM',
    description: 'Convertissez les temps de nage entre SCY, SCM et LCM, ainsi que les yards en mètres. Convertisseur de temps de nage gratuit pour les nageurs internationaux.',
    h1: 'Convertisseur de temps de nage',
    lead: 'Convertissez les temps de nage entre les piscines SCY, SCM et LCM, avec les conversions de yards en mètres incluses.',
    eyebrow: 'Calculateur de nage gratuit',
    sections: [
      section('Calculateurs de nage associés', ['Comparez l’allure, les splits, la vitesse critique de nage, les séries, la vitesse, les calories et les longueurs de piscine avec des outils conçus pour les nageurs.']),
      section('Convertisseurs de piscine', ['Choisissez une combinaison de piscines pour convertir un temps de nage entre une piscine de 25 yards, une de 25 mètres et une de 50 mètres.']),
      section('SCY, SCM et LCM', ['La longueur de la piscine modifie le nombre de virages et la distance parcourue. SCY utilise 25 yards, SCM utilise 25 mètres et LCM utilise 50 mètres.']),
      section('Comment fonctionne un convertisseur de temps de nage ?', ['Le convertisseur applique un facteur de piscine documenté et un ajustement par virage. De nombreux programmes pour les jeunes et de Masters utilisent les facteurs du Colorado.', 'Tous les résultats de conversion sont des estimations, car chaque nageur profite différemment des virages et des murs.']),
      section('Comment utiliser ce convertisseur', ['Choisissez la piscine et l’épreuve, saisissez votre temps et lisez le temps équivalent dans chaque piscine.']),
      section('Pourquoi utiliser le convertisseur de temps de nage ?', ['Un outil gratuit et privé dans le navigateur pour comparer les résultats, définir des objectifs de qualification, planifier les allures d’entraînement et convertir les yards en mètres sans installer de logiciel.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculateur d’allure de nage', description: 'Trouvez l’allure cible sur 25, 50, 100, 200 ou 400.' },
      { route: 'split-calculator', title: 'Calculateur de splits de nage', description: 'Générez des splits cumulés réguliers pour toute distance de course.' },
      { route: 'css-calculator', title: 'Vitesse critique de nage (CSS)', description: 'Calculez l’allure seuil et les zones d’entraînement à partir d’un test 400 + 200.' },
      { route: 'interval-calculator', title: 'Séries et départs', description: 'Construisez une série d’entraînement avec répétitions, allure et départs.' },
      { route: 'speed-calculator', title: 'Vitesse et projection de course', description: 'Convertissez l’allure en m/s, km/h et temps de course projetés.' },
      { route: 'calories-calculator', title: 'Calories de natation', description: 'Estimez les calories selon la nage, l’intensité, le poids et la durée.' },
      { route: 'lengths-converter', title: 'Longueurs et distance', description: 'Convertissez les distances et longueurs pour piscines de 25 yd, 25 m et 50 m.' },
    ],
    courses: [
      { code: 'SCY', name: 'Yards en petit bassin', length: '25 yards', usage: 'Lycée américain, NCAA et compétition de club' },
      { code: 'SCM', name: 'Mètres en petit bassin', length: '25 mètres', usage: 'Compétition internationale en petit bassin' },
      { code: 'LCM', name: 'Mètres en grand bassin', length: '50 mètres', usage: 'Jeux olympiques et Championnats du monde' },
    ],
    faqs: [
      faq('Qu’est-ce qu’un convertisseur de temps de nage ?', 'Il estime la façon dont un temps dans une piscine se compare au temps équivalent dans une autre. Le même effort peut produire des temps différents, car la longueur de la piscine modifie le nombre de virages.'),
      faq('Que signifient SCY, SCM et LCM ?', 'SCY est une piscine de 25 yards, SCM une piscine de 25 mètres et LCM une piscine de 50 mètres. Ce sont les trois longueurs standard de piscines de compétition.'),
      faq('Comment convertir SCY en LCM ?', 'Sélectionnez SCY comme piscine de départ, choisissez l’épreuve et le temps, puis sélectionnez LCM comme destination. Le convertisseur applique un facteur de piscine et un ajustement par virage.'),
      faq('Les conversions de temps de nage sont-elles exactes ?', 'Non. Les virages, les murs, la respiration et l’allure varient selon le nageur ; chaque conversion est donc une estimation. Considérez les résultats comme des approximations proches et non comme des temps officiels.'),
      faq('Le convertisseur de temps de nage est-il gratuit et privé ?', 'Oui. Il fonctionne entièrement dans votre navigateur, permet un nombre illimité de conversions et n’envoie pas les temps saisis à un serveur.'),
    ],
  },
  'pace-calculator': {
    title: 'Calculateur d’allure de nage – Convertisseur de temps de nage',
    description: 'Calculez l’allure de nage sur 100, 200, 400 ou toute autre distance à partir du temps total et de la distance.',
    h1: 'Calculateur d’allure de nage',
    lead: 'Calculez votre allure sur 25, 50, 100, 200 ou 400 yards ou mètres à partir d’un temps total et d’une distance.',
    sections: [
      section('Comment utiliser le calculateur d’allure', [], ['Saisissez la distance totale et choisissez yards ou mètres.', 'Saisissez le temps total.', 'Choisissez un intervalle d’allure tel que 100, 200, 400 ou une distance personnalisée.', 'Calculez et utilisez le résultat pour planifier une série régulière.'], ['Saisissez la distance totale et choisissez yards ou mètres.', 'Saisissez le temps total.', 'Choisissez un intervalle d’allure tel que 100, 200, 400 ou une distance personnalisée.', 'Calculez et utilisez le résultat pour planifier une série régulière.']),
      section('Objectifs d’allure courants', ['L’allure est le temps nécessaire pour parcourir un intervalle. Les entraîneurs utilisent les départs pour maintenir la régularité des séries d’entraînement.']),
      section('Pourquoi utiliser le calculateur d’allure de nage ?', ['Convertissez un temps total mesuré en secondes par 100, comme celles utilisées par les entraîneurs sur une horloge d’allure. Choisissez les mètres pour une allure de 100 m ou les yards pour une allure de 100 yd.']),
    ],
    faqs: [
      faq('Comment calculer une allure de nage ?', 'Divisez les secondes totales par la distance totale et multipliez par l’intervalle d’allure. Par exemple, 6:05 sur 500 m correspondent à 73 secondes par 100 m.'),
      faq('Quelle est une bonne allure sur 100 mètres ?', 'Cela dépend de l’épreuve et du niveau. Utilisez ce calculateur pour décomposer un temps cible en splits réalistes plutôt que de vous fier à une seule moyenne.'),
      faq('Devrais-je répartir ma course en splits réguliers ?', 'La plupart des nageurs de fond visent des splits presque réguliers. Un léger positif sur les derniers mètres est normal : planifiez de façon régulière et ajustez avec les données de votre course.'),
    ],
  },
  'split-calculator': {
    title: 'Calculateur de splits de nage – Convertisseur de temps de nage',
    description: 'Générez des splits de nage réguliers pour toute distance de course et consultez les temps cumulés à chaque 25, 50 ou 100.',
    h1: 'Calculateur de splits de nage',
    lead: 'Décomposez une course de nage en splits cibles réguliers et lisez les temps cumulés à chaque 50 ou 100.',
    sections: [
      section('Comment utiliser le calculateur de splits', [], ['Choisissez une distance de course et une unité.', 'Saisissez le temps objectif.', 'Choisissez une longueur de split de 25, 50 ou 100.', 'Lisez les temps cumulés de l’horloge et l’allure derrière chaque split.'], ['Choisissez une distance de course et une unité.', 'Saisissez le temps objectif.', 'Choisissez une longueur de split de 25, 50 ou 100.', 'Lisez les temps cumulés de l’horloge et l’allure derrière chaque split.']),
      section('Guide d’allure de course', ['Planifiez un premier passage rapide mais contrôlé, puis maintenez une vitesse régulière. Un léger positif dans les derniers passages est normal dans les courses de fond.']),
      section('Pourquoi utiliser le calculateur de splits de nage ?', ['Un temps final montre à quelle vitesse vous avez nagé ; les splits montrent comment. Utilisez des objectifs cumulés pour rendre votre plan de course reproductible à l’entraînement.']),
    ],
    faqs: [
      faq('Que sont les splits de nage ?', 'Les splits sont les temps de chaque segment d’une course, généralement tous les 50 ou 100. Ils permettent de comparer l’allure pendant la course au lieu de voir uniquement le temps final.'),
      faq('Chaque split doit-il être exactement identique ?', 'La plupart des nageurs de fond planifient des splits presque réguliers et peuvent ralentir légèrement à la fin. Entraînez-vous sur le rythme que vous souhaitez exécuter.'),
      faq('Comment utiliser les splits à l’entraînement ?', 'Saisissez un temps de course objectif, pratiquez chaque intervalle avec un départ et comparez les temps cumulés à chaque virage.'),
    ],
  },
  'css-calculator': {
    title: 'Calculateur de CSS – Vitesse critique de nage',
    description: 'Déterminez la vitesse critique de nage avec un test 400 + 200 et obtenez l’allure CSS, les zones d’entraînement et les temps projetés.',
    h1: 'Calculateur de vitesse critique de nage (CSS)',
    lead: 'Nagez un 400 intense et un 200 rapide pour estimer l’allure seuil, cinq zones d’entraînement et les temps de course projetés.',
    sections: [
      section('Comment réaliser le test', [], ['Échauffez-vous suffisamment.', 'Nagez un 400 à fond.', 'Récupérez 3–5 minutes et nagez un 200 à fond.', 'Saisissez les deux temps pour calculer le CSS.'], ['Échauffez-vous suffisamment.', 'Nagez un 400 à fond.', 'Récupérez 3–5 minutes et nagez un 200 à fond.', 'Saisissez les deux temps pour calculer le CSS.']),
      section('Comprendre vos zones', ['Utilisez les allures de récupération et aérobie pour le travail facile, l’allure tempo pour un rythme contrôlé, l’allure seuil pour les séries de CSS et la Zone 5 pour des répétitions courtes de haute qualité.']),
      section('Pourquoi utiliser le calculateur de vitesse critique de nage ?', ['Deux nages à fond fournissent une allure seuil reproductible et un système pratique pour les zones d’entraînement et les projections de course.']),
    ],
    faqs: [
      faq('Qu’est-ce que la vitesse critique de nage (CSS) ?', 'Le CSS est l’allure la plus rapide que vous pouvez maintenir avec une fatigue contrôlée. Il est estimé à partir d’un test long de 400 et court de 200.'),
      faq('À quelle fréquence faut-il retester le CSS ?', 'Retestez toutes les quatre à six semaines ou au début d’un nouveau bloc d’entraînement, surtout après une amélioration aérobie.'),
      faq('Le CSS est-il identique à l’allure de course ?', 'Pas exactement. Un 400 peut être légèrement plus rapide que le CSS, tandis qu’un 1500 ou un mile se stabilise généralement près de l’allure CSS.'),
    ],
  },
  'interval-calculator': {
    title: 'Calculateur de séries et de départs de nage',
    description: 'Construisez des séries d’entraînement de nage avec répétitions, distance et allure, puis calculez les temps de répétition et les départs.',
    h1: 'Calculateur de séries et de départs de nage',
    lead: 'Transformez une allure cible en une série d’entraînement complète avec temps de répétition, départs, totaux et heures de départ depuis le mur.',
    sections: [
      section('Comment utiliser le créateur de séries', [], ['Saisissez le nombre de répétitions et la distance par répétition.', 'Définissez votre allure par 100.', 'Choisissez un repos fixe ou un départ fixe.', 'Lisez le temps de répétition, les totaux et les heures de départ.'], ['Saisissez le nombre de répétitions et la distance par répétition.', 'Définissez votre allure par 100.', 'Choisissez un repos fixe ou un départ fixe.', 'Lisez le temps de répétition, les totaux et les heures de départ.']),
      section('Séries classiques à essayer', ['Essayez une série CSS, une série aérobie de 20 × 50, une série de demi-distance de 6 × 200 ou une échelle descendante.']),
      section('Pourquoi utiliser le calculateur d’intervalles ?', ['Il supprime les calculs des séries telles que 8 × 100 en 1:30 et produit un plan d’horloge d’allure que vous pouvez suivre au mur.']),
    ],
    faqs: [
      faq('Qu’est-ce qu’un départ de nage ?', 'Un départ est l’intervalle fixe auquel vous quittez le mur pour chaque répétition. La différence entre le départ et le temps de répétition correspond à votre repos.'),
      faq('Dois-je construire mes séries autour d’un départ ou d’un repos ?', 'Les deux sont utilisés. Un départ fixe rend l’allure cohérente ; un repos fixe maintient visible le rapport entre effort et repos lorsque la fatigue modifie le temps de répétition.'),
      faq('Quel repos faut-il prendre entre les répétitions ?', 'Les séries de vitesse utilisent souvent 20–30 secondes ou plus, tandis que les séries de seuil et de CSS utilisent généralement 10–15 secondes.'),
    ],
  },
  'speed-calculator': {
    title: 'Calculateur de vitesse et de projection de course de nage',
    description: 'Convertissez le temps et la distance de nage en allure par 100 m ou 100 yd, vitesse et temps de course projetés.',
    h1: 'Calculateur de vitesse et de projection de course de nage',
    lead: 'Saisissez un temps et une distance de référence pour voir l’allure, la vitesse et les temps projetés de 200 jusqu’au mile.',
    sections: [
      section('Comment l’utiliser', [], ['Choisissez une nage de référence.', 'Sélectionnez mètres ou yards et saisissez le temps.', 'Lisez l’allure par 100, la vitesse et les temps de course projetés.', 'Utilisez une projection pour choisir une allure d’entraînement.'], ['Choisissez une nage de référence.', 'Sélectionnez mètres ou yards et saisissez le temps.', 'Lisez l’allure par 100, la vitesse et les temps de course projetés.', 'Utilisez une projection pour choisir une allure d’entraînement.']),
      section('Repères utiles à connaître', ['Le 400 est une distance classique de test du CSS. Le 1500 et le 1650 sont des courses courantes de mile en piscine, tandis que 1760 yards constituent le vrai mile.']),
      section('Pourquoi utiliser le calculateur de vitesse ?', ['L’allure décrit un intervalle d’entraînement et la vitesse décrit l’effort produit. Cet outil affiche les deux dans les unités utilisées par les entraîneurs et les nageurs.']),
    ],
    faqs: [
      faq('Pourquoi l’allure par 100 yd diffère-t-elle de l’allure par 100 m ?', 'Un yard est plus court qu’un mètre : 100 yards couvrent donc une distance plus courte que 100 mètres à vitesse identique.'),
      faq('Quelle est la fiabilité des temps de course projetés ?', 'Ils supposent que la vitesse de référence est maintenue sur toute la distance. Utilisez-les comme objectif de départ et ajustez selon l’allure, le drafting et les conditions.'),
      faq('Qu’est-ce qu’un mile en piscine ?', 'Les nageurs compétiteurs appellent souvent mile une distance de 1500 mètres ou de 1650 yards. Le vrai mile représente 1760 yards, soit environ 1609 mètres.'),
    ],
  },
  'calories-calculator': {
    title: 'Calculateur de calories de natation',
    description: 'Estimez les calories brûlées en nageant selon la technique, l’intensité, le poids corporel et la durée.',
    h1: 'Calculateur de calories de natation',
    lead: 'Estimez les calories brûlées à partir de votre poids, de votre nage, de l’intensité et du temps passé dans l’eau.',
    sections: [
      section('Comment l’utiliser', [], ['Saisissez votre poids corporel.', 'Choisissez la nage.', 'Choisissez une intensité légère, modérée ou vigoureuse.', 'Saisissez la durée et lisez l’estimation et le taux horaire.'], ['Saisissez votre poids corporel.', 'Choisissez la nage.', 'Choisissez une intensité légère, modérée ou vigoureuse.', 'Saisissez la durée et lisez l’estimation et le taux horaire.']),
      section('Pourquoi les nages diffèrent-elles', ['Le papillon exige généralement le plus d’effort, tandis que le maintien vertical est l’option qui en demande le moins. L’intensité peut compter autant que la technique.']),
      section('Pourquoi utiliser le calculateur de calories de natation ?', ['L’estimation combine le poids, la nage, l’intensité et la durée avec des valeurs MET standard, ce qui fournit un nombre de planification plus utile qu’une moyenne générique.']),
    ],
    faqs: [
      faq('Quelle est la précision des estimations de calories de natation ?', 'Ce sont des estimations fondées sur les valeurs MET, le poids corporel et la durée. La technique, la température de la piscine et le métabolisme individuel influencent le résultat.'),
      faq('Combien de calories la natation brûle-t-elle en une heure ?', 'Cela dépend de la nage et de l’intensité. Un nageur de 70 kg peut brûler environ 400–700 kcal par heure lors d’un entraînement typique.'),
      faq('Dois-je manger les calories brûlées en nageant ?', 'Pour la plupart des nageurs, manger normalement convient. Utilisez l’estimation comme un repère, pas comme une prescription nutritionnelle précise.'),
    ],
  },
  'lengths-converter': {
    title: 'Convertisseur de distances de nage – Yards en mètres et longueurs de piscine',
    description: 'Convertissez les distances de nage : yards en mètres, mètres en yards et distances en longueurs de piscine.',
    h1: 'Convertisseur de distances et longueurs de nage',
    lead: 'Convertissez les yards en mètres ou les mètres en yards, puis voyez combien de longueurs une distance représente dans une piscine de 25 yards, 25 mètres ou 50 mètres.',
    sections: [
      section('Comment l’utiliser', [], ['Choisissez yards et mètres, ou distance et longueurs.', 'Saisissez une distance ou un nombre de longueurs.', 'Utilisez les réglages rapides pour les distances de nage courantes.', 'Lisez les longueurs complètes, le reste ou la distance équivalente.'], ['Choisissez yards et mètres, ou distance et longueurs.', 'Saisissez une distance ou un nombre de longueurs.', 'Utilisez les réglages rapides pour les distances de nage courantes.', 'Lisez les longueurs complètes, le reste ou la distance équivalente.']),
      section('Référence rapide yards-mètres', ['25 yards valent 22.86 mètres, 50 yards valent 45.72 mètres et 1650 yards valent 1508.76 mètres. Dans l’autre sens, 25 mètres valent 27.34 yards et 1500 mètres valent 1640.42 yards.']),
      section('Pourquoi utiliser le convertisseur de longueurs ?', ['Les questions sur les distances de piscine influencent les plans d’entraînement. Convertissez des distances exactes et comptez les longueurs dans les piscines de 25 yards, 25 mètres et 50 mètres.']),
    ],
    faqs: [
      faq('Comment convertir 25 yards en mètres ?', 'Multipliez les yards par 0.9144 : 25 yards valent 22.86 mètres, la longueur d’une piscine courte en yards.'),
      faq('Combien font 50 yards en mètres ?', '50 yards valent 45.72 mètres. Autres conversions courantes : 100 yards = 91.44 mètres et 1650 yards = 1508.76 mètres.'),
      faq('Combien de longueurs représente une nage de 1500 mètres ?', 'Cela représente 60 longueurs dans une piscine de 25 mètres et 30 longueurs dans une piscine de 50 mètres. Une nage de 1650 yards représente 66 longueurs dans une piscine de 25 yards.'),
    ],
  },
  'scy-to-lcm': {
    title: 'Convertisseur SCY vers LCM – Convertisseur de temps de nage',
    description: 'Convertissez les temps de nage SCY en LCM avec une méthode de conversion documentée.',
    h1: 'Convertisseur SCY vers LCM',
    lead: 'Convertissez un temps en petit bassin en yards en un temps estimé en grand bassin en mètres.',
    sections: [
      section('Qu’est-ce qu’une conversion SCY vers LCM ?', ['Une piscine de 25 yards et une piscine de 50 mètres modifient la distance et le nombre de virages. Le convertisseur met le temps à l’échelle et ajoute un ajustement par virage pour la plus grande piscine.']),
      section('Comment fonctionne l’estimation', ['Les épreuves de nage libre utilisent leurs associations habituelles : 500 Libre vers 400 Libre, 1000 Libre vers 800 Libre et 1650 Libre vers 1500 Libre. Tous les résultats sont des estimations.']),
    ],
    faqs: [
      faq('Quel est le facteur de conversion SCY vers LCM ?', 'Le facteur de base yard-mètre est 1.11, avec des ajustements de distance et de virage propres à chaque épreuve. La nage libre longue utilise des facteurs d’association distincts.'),
      faq('Pourquoi les temps LCM sont-ils plus lents ?', 'Une piscine de 50 mètres compte moins de virages qu’une piscine de 25 yards. Le nageur en petit bassin bénéficie de plus de poussées contre le mur ; le même effort peut donc être plus rapide en yards.'),
    ],
  },
  'scy-to-scm': {
    title: 'Convertisseur SCY vers SCM – Convertisseur de temps de nage',
    description: 'Convertissez les temps de nage SCY en SCM, petit bassin en mètres.',
    h1: 'Convertisseur SCY vers SCM',
    lead: 'Convertissez un temps en piscine de 25 yards en temps estimé pour une piscine de 25 mètres.',
    sections: [
      section('Qu’est-ce qu’une conversion SCY vers SCM ?', ['SCY et SCM utilisent tous deux des piscines de 25 longueurs : le nombre de virages est donc identique. Le principal changement est qu’un mètre est plus long qu’un yard.']),
      section('Comment fonctionne l’estimation', ['Le facteur standard est 1.11 pour les épreuves similaires. La nage libre sur distance utilise des associations distinctes pour 500 vers 400, 1000 vers 800 et 1650 vers 1500.']),
    ],
    faqs: [
      faq('Quel est le facteur de conversion SCY vers SCM ?', 'Pour des épreuves similaires, multipliez les secondes du petit bassin en yards par 1.11, car un couloir de 25 yards est plus court qu’un couloir de 25 mètres.'),
      faq('500 yards correspondent-ils à 400 ou 500 mètres ?', 'Une nage libre de 500 yards correspond à la nage libre de 400 mètres en compétition internationale en petit bassin.'),
    ],
  },
  'scm-to-lcm': {
    title: 'Convertisseur SCM vers LCM – Convertisseur de temps de nage',
    description: 'Convertissez les temps du petit bassin en mètres en temps estimés du grand bassin en mètres.',
    h1: 'Convertisseur SCM vers LCM',
    lead: 'Convertissez un temps en piscine de 25 mètres en temps estimé pour une piscine de 50 mètres.',
    sections: [
      section('Qu’est-ce qu’une conversion SCM vers LCM ?', ['SCM et LCM utilisent les mêmes distances métriques, mais une piscine de 25 mètres compte plus du double de virages qu’une piscine de 50 mètres. L’estimation ajuste ces virages supplémentaires.']),
      section('Comment fonctionne l’estimation', ['Des valeurs de secondes par virage propres à chaque nage expliquent la différence. La même logique s’applique aux épreuves de nage libre de 400, 800 et 1500.']),
    ],
    faqs: [
      faq('Comment convertir SCM vers LCM ?', 'Les distances correspondent : le convertisseur ajoute donc la différence de temps estimée liée aux virages supplémentaires dans une piscine de 25 mètres.'),
      faq('Combien SCM est-il plus rapide que LCM ?', 'Les épreuves de sprint peuvent gagner quelques dixièmes, tandis que les courses de 200 ou plus peuvent gagner une seconde ou davantage, car elles comportent davantage de virages.'),
    ],
  },
  'lcm-to-scy': {
    title: 'Convertisseur LCM vers SCY – Convertisseur de temps de nage',
    description: 'Convertissez les temps du grand bassin en mètres en temps estimés du petit bassin en yards.',
    h1: 'Convertisseur LCM vers SCY',
    lead: 'Convertissez un temps en piscine de 50 mètres en temps estimé pour une piscine de 25 yards.',
    sections: [
      section('Qu’est-ce qu’une conversion LCM vers SCY ?', ['Une course de 50 mètres compte moins de virages ; la conversion inverse retire donc l’avantage des virages et met les mètres à l’échelle en yards.']),
      section('Comment fonctionne l’estimation', ['La nage libre sur distance associe 400 mètres à 500 yards, 800 mètres à 1000 yards et 1500 mètres à 1650 yards. Tous les temps convertis sont des estimations.']),
    ],
    faqs: [
      faq('Quel est le facteur de conversion LCM vers SCY ?', 'Pour les épreuves similaires, on utilise l’inverse de 1.11, avec un ajustement pour les virages supplémentaires dans une piscine de 25 yards.'),
      faq('Pourquoi un temps SCY est-il plus rapide ?', 'Une piscine de 25 yards possède plus de murs, et chaque virage apporte un avantage de poussée qui peut accélérer le temps total.'),
    ],
  },
  'lcm-to-scm': {
    title: 'Convertisseur LCM vers SCM – Convertisseur de temps de nage',
    description: 'Convertissez les temps du grand bassin en mètres en temps estimés du petit bassin en mètres.',
    h1: 'Convertisseur LCM vers SCM',
    lead: 'Convertissez un temps en piscine de 50 mètres en temps estimé pour une piscine de 25 mètres.',
    sections: [
      section('Qu’est-ce qu’une conversion LCM vers SCM ?', ['Les distances sont identiques ; la différence vient donc des virages supplémentaires disponibles dans une piscine de 25 mètres.']),
      section('Comment fonctionne l’estimation', ['Une valeur de secondes par virage propre à la nage est appliquée aux murs supplémentaires. Les courses plus longues montrent une différence plus importante.']),
    ],
    faqs: [
      faq('Comment convertir LCM vers SCM ?', 'Comme les distances sont identiques, le convertisseur retire l’avantage de virage du parcours le plus long à l’aide de valeurs de virage propres à chaque nage.'),
      faq('Le petit bassin est-il plus rapide que le grand bassin ?', 'Généralement oui. Les murs supplémentaires d’une piscine de 25 mètres offrent plus de poussées et produisent des temps plus rapides pour le même nageur et la même épreuve.'),
    ],
  },
  'scm-to-scy': {
    title: 'Convertisseur SCM vers SCY – Convertisseur de temps de nage',
    description: 'Convertissez les temps du petit bassin en mètres en temps estimés du petit bassin en yards.',
    h1: 'Convertisseur SCM vers SCY',
    lead: 'Convertissez un temps en piscine de 25 mètres en temps estimé pour une piscine de 25 yards.',
    sections: [
      section('Qu’est-ce qu’une conversion SCM vers SCY ?', ['Les deux piscines sont des piscines courtes et ont le même nombre de virages. La conversion met surtout la distance à l’échelle, car un yard est plus court qu’un mètre.']),
      section('Comment fonctionne l’estimation', ['Utilisez les associations standard de 400 mètres à 500 yards, 800 mètres à 1000 yards et 1500 mètres à 1650 yards. Les résultats sont des estimations.']),
    ],
    faqs: [
      faq('Quel est le facteur de conversion SCM vers SCY ?', 'Pour des épreuves correspondantes, divisez les secondes SCM par 1.11, car le nombre de virages est identique et seule la distance du couloir change.'),
      faq('Les temps SCM convertis peuvent-ils être utilisés pour des compétitions américaines ?', 'Certaines compétitions acceptent les temps convertis, mais les organisateurs peuvent appliquer leurs propres règles. Vérifiez d’abord les informations d’inscription de l’épreuve.'),
    ],
  },
  guides: {
    title: 'Guides – Convertisseur de temps de nage',
    description: 'Guides pas à pas pour la conversion des temps de nage, l’allure et les splits de course.',
    h1: 'Guides du convertisseur de temps de nage',
    lead: 'Tout ce dont vous avez besoin pour comparer les temps entre piscines, planifier les allures et construire des splits de course.',
    sections: [
      section('Comment fonctionnent les conversions de temps de nage', ['SCY se nage sur 25 yards, SCM sur 25 mètres et LCM sur 50 mètres. Correspondez d’abord les épreuves, mettez la distance à l’échelle, puis ajustez les virages.', 'Aucune conversion n’est exacte. Utilisez les résultats pour comparer et planifier, et respectez les règles officielles lorsque vous déclarez un temps.']),
      section('Référence rapide', ['SCY vers SCM : multipliez par 1.11 pour les épreuves similaires. SCM vers LCM : ajoutez le temps des virages. Les associations de distance comprennent 500 vers 400, 1000 vers 800 et 1650 vers 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculateur d’allure de nage', description: 'Transformez le temps total et la distance en allures cibles.', tag: 'Calculateur' },
      { route: 'split-calculator', title: 'Calculateur de splits de nage', description: 'Décomposez un temps cible en splits cumulés.', tag: 'Calculateur' },
      { route: 'css-calculator', title: 'Vitesse critique de nage', description: 'Calculez l’allure seuil et les zones d’entraînement.', tag: 'Calculateur' },
      { route: 'interval-calculator', title: 'Séries et départs', description: 'Construisez une série à partir des répétitions, de la distance et de l’allure.', tag: 'Calculateur' },
      { route: 'scy-to-lcm', title: 'Conversion SCY vers LCM', description: 'Convertissez le petit bassin en yards en grand bassin en mètres.', tag: 'Conversion' },
      { route: 'scy-to-scm', title: 'Conversion SCY vers SCM', description: 'Convertissez le petit bassin américain en petit bassin international.', tag: 'Conversion' },
    ],
  },
  about: {
    title: 'À propos – Convertisseur de temps de nage',
    description: 'À propos du convertisseur de temps de nage gratuit pour les temps SCY, SCM et LCM.',
    h1: 'À propos du convertisseur de temps de nage',
    lead: 'Un outil gratuit, rapide et respectueux de la vie privée pour comparer les performances de nage entre les piscines de compétition.',
    sections: [
      section('Pourquoi nous l’avons créé', ['Les nageurs doivent comparer les temps en yards et en mètres lorsqu’ils changent de compétition ou utilisent des outils d’allure. Nous avons créé une page rapide qui fonctionne sur tout appareil et utilise une méthode largement comprise.', 'Tout fonctionne dans votre navigateur. Vos temps ne quittent jamais votre appareil.']),
      section('La méthode de conversion', ['Le calculateur utilise une approche fondée sur des facteurs, avec des ajustements documentés de piscine et par virage. Les épreuves de nage libre sur distance utilisent leurs propres facteurs. Les résultats sont des estimations proches, pas des conversions officielles.']),
      section('Limites', ['Aucune conversion n’est exacte. Les virages, la respiration, l’altitude, l’allure et la technique influencent les performances réelles. Utilisez toujours les règles officielles pour les inscriptions aux compétitions.']),
      section('Contact', ['Vos questions, corrections ou suggestions sont les bienvenues via la page de contact.']),
    ],
  },
  contact: {
    title: 'Contact – Convertisseur de temps de nage',
    description: 'Contactez l’équipe du convertisseur de temps de nage pour toute question, commentaire ou correction.',
    h1: 'Contact du convertisseur de temps de nage',
    lead: 'Vous avez trouvé un problème ou vous avez une idée de fonctionnalité ? Envoyez un message à hello@onlineswimtimeconverter.com.',
    sections: [
      section('Contactez-nous', ['Nous lisons chaque message. Utilisez l’adresse e-mail ci-dessus pour les questions, corrections, suggestions de fonctionnalités et partenariats.']),
      section('Vous cherchez un outil ?', ['Utilisez les calculateurs et les guides pour comparer les temps, calculer l’allure et construire des plans de course.']),
    ],
  },
  'privacy-policy': {
    title: 'Politique de confidentialité – Convertisseur de temps de nage',
    description: 'Politique de confidentialité des calculateurs du convertisseur de temps de nage fonctionnant dans le navigateur.',
    h1: 'Politique de confidentialité',
    lead: 'En vigueur depuis janvier 2026. Cette politique explique les données que ce site collecte et leur utilisation.',
    sections: [
      section('La confidentialité dès la conception', ['Les calculateurs fonctionnent dans votre navigateur. Les temps et distances saisis dans un calculateur ne sont pas transmis à un serveur.']),
      section('Stockage local et cookies', ['Votre navigateur peut enregistrer des préférences telles que le thème ou les paramètres des calculateurs. Ce site utilise un stockage local minimal et ne vend pas de données personnelles.']),
      section('Données et services automatisés', ['Les fournisseurs d’hébergement et d’analyse peuvent traiter des informations techniques courantes pour exploiter et améliorer le site.']),
      section('Vos droits et les enfants', ['Vous pouvez demander l’accès, la rectification ou la suppression de données personnelles lorsque cela s’applique. Le site s’adresse au grand public et ne collecte pas sciemment de données concernant les enfants.']),
      section('Modifications de la politique', ['Cette politique peut être mise à jour lorsque le site évolue. La version en vigueur est publiée sur cette page.']),
    ],
  },
  terms: {
    title: 'Conditions d’utilisation – Convertisseur de temps de nage',
    description: 'Conditions d’utilisation des outils gratuits du convertisseur de temps de nage fonctionnant dans le navigateur.',
    h1: 'Conditions d’utilisation',
    lead: 'En vigueur depuis janvier 2026. Ces conditions régissent votre utilisation de onlineswimtimeconverter.com.',
    sections: [
      section('Nature du service', ['Le site fournit des estimations gratuites dans le navigateur pour les temps de nage, l’allure et les splits. Les outils sont fournis tels quels, sans garantie.']),
      section('Aucun conseil sportif officiel', ['Les temps convertis sont des estimations et ne sont ni officiels ni certifiés. Suivez les règles de l’organisme qui accepte les temps de compétition.']),
      section('Utilisation acceptable et responsabilité', ['N’utilisez pas le site de manière abusive, ne le perturbez pas et n’en extrayez pas massivement les données. Nous ne sommes pas responsables des dommages liés à l’utilisation du service ou à la confiance accordée à ses estimations.']),
      section('Propriété intellectuelle et modifications', ['La conception, le texte et les fonctionnalités du site ne peuvent pas être reproduits commercialement sans autorisation. Ces conditions peuvent changer lorsqu’elles sont publiées.']),
    ],
  },
};
