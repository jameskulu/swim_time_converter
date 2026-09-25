import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const spanishPages: PageCatalog = {
  home: {
    title: 'Conversor de tiempos de natación: SCY, SCM y LCM',
    description: 'Convierte tiempos de natación entre SCY, SCM y LCM, además de yardas a metros. Calculadora de tiempos de natación gratis para nadadores internacionales.',
    h1: 'Conversor de tiempos de natación',
    lead: 'Convierte tiempos de natación entre piscina SCY, SCM y LCM, con conversiones de yardas a metros incluidas.',
    eyebrow: 'Calculadora de natación gratis',
    sections: [
      section('Calculadoras de natación relacionadas', ['Compara el ritmo, los parciales, la velocidad crítica de natación, las series, la velocidad, las calorías y las longitudes de piscina con herramientas diseñadas para nadadores.']),
      section('Conversores de piscina', ['Elige una combinación de piscinas para convertir un tiempo de natación entre una piscina de 25 yardas, una de 25 metros y una de 50 metros.']),
      section('SCY frente a SCM y LCM', ['La longitud de la piscina cambia el número de vueltas y la distancia recorrida. SCY usa 25 yardas, SCM usa 25 metros y LCM usa 50 metros.']),
      section('¿Cómo funciona un conversor de tiempos de natación?', ['El conversor aplica un factor de piscina documentado y un ajuste por vuelta. Muchos programas juveniles y Masters utilizan los factores de Colorado.', 'Todos los resultados de conversión son estimaciones porque cada nadador obtiene una ganancia distinta de las vueltas y las paredes.']),
      section('Cómo usar este conversor', ['Elige la piscina y la prueba, introduce tu tiempo y lee el tiempo equivalente en cada piscina.']),
      section('¿Por qué usar el conversor de tiempos de natación?', ['Es una herramienta gratuita y privada que funciona en el navegador para comparar resultados, establecer objetivos de clasificación, planificar ritmos de entrenamiento y convertir yardas a metros sin instalar software.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculadora de ritmo de natación', description: 'Calcula el ritmo objetivo por 25, 50, 100, 200 o 400.' },
      { route: 'split-calculator', title: 'Calculadora de parciales de natación', description: 'Genera parciales acumulados uniformes para cualquier distancia de carrera.' },
      { route: 'css-calculator', title: 'Velocidad crítica de natación (CSS)', description: 'Calcula el ritmo umbral y las zonas de entrenamiento a partir de una prueba de 400 + 200.' },
      { route: 'interval-calculator', title: 'Series y salidas', description: 'Crea una serie de entrenamiento con repeticiones, ritmo y salidas.' },
      { route: 'speed-calculator', title: 'Velocidad y proyección de carrera', description: 'Convierte el ritmo a m/s, km/h y tiempos de carrera proyectados.' },
      { route: 'calories-calculator', title: 'Calorías al nadar', description: 'Estima las calorías según el estilo, la intensidad, el peso y el tiempo.' },
      { route: 'lengths-converter', title: 'Longitudes y distancia', description: 'Convierte distancias y longitudes de piscina de 25 yd, 25 m y 50 m.' },
    ],
    courses: [
      { code: 'SCY', name: 'Yardas en piscina corta', length: '25 yardas', usage: 'Escuela secundaria de EE. UU., NCAA y competición de clubes' },
      { code: 'SCM', name: 'Metros en piscina corta', length: '25 metros', usage: 'Competición internacional en piscina corta' },
      { code: 'LCM', name: 'Metros en piscina larga', length: '50 metros', usage: 'Juegos Olímpicos y Campeonatos Mundiales' },
    ],
    faqs: [
      faq('¿Qué es un conversor de tiempos de natación?', 'Estima cómo se compara un tiempo en una piscina con el tiempo equivalente en otra. El mismo esfuerzo puede producir tiempos finales diferentes porque la longitud de la piscina cambia el número de vueltas.'),
      faq('¿Qué son SCY, SCM y LCM?', 'SCY es una piscina de 25 yardas, SCM es una piscina de 25 metros y LCM es una piscina de 50 metros. Estas son las tres longitudes estándar de piscina de competición.'),
      faq('¿Cómo convierto SCY a LCM?', 'Selecciona SCY como piscina de origen, elige la prueba y el tiempo y selecciona LCM como destino. El conversor aplica un factor de piscina y un ajuste por vuelta.'),
      faq('¿Son exactas las conversiones de tiempos de natación?', 'No. Las vueltas, las paredes, la respiración y el ritmo varían según el nadador, por lo que cada conversión es una estimación. Considera los resultados aproximaciones cercanas, no tiempos oficiales.'),
      faq('¿El conversor de tiempos de natación es gratis y privado?', 'Sí. Funciona completamente en tu navegador, permite conversiones ilimitadas y no envía los tiempos introducidos a un servidor.'),
    ],
  },
  'pace-calculator': {
    title: 'Calculadora de ritmo de natación – Conversor de tiempos',
    description: 'Calcula el ritmo de natación por 100, 200, 400 o cualquier distancia a partir del tiempo total y la distancia.',
    h1: 'Calculadora de ritmo de natación',
    lead: 'Calcula tu ritmo por 25, 50, 100, 200 o 400 en yardas o metros a partir de un tiempo total y una distancia.',
    sections: [
      section('Cómo usar la calculadora de ritmo', [], ['Introduce la distancia total y elige yardas o metros.', 'Introduce el tiempo total.', 'Elige un intervalo de ritmo como 100, 200, 400 o una distancia personalizada.', 'Calcula y usa el resultado para planificar una serie uniforme.'], ['Introduce la distancia total y elige yardas o metros.', 'Introduce el tiempo total.', 'Elige un intervalo de ritmo como 100, 200, 400 o una distancia personalizada.', 'Calcula y usa el resultado para planificar una serie uniforme.']),
      section('Objetivos de ritmo habituales', ['El ritmo es el tiempo necesario para recorrer un intervalo. Los entrenadores usan salidas para mantener la consistencia de las series de entrenamiento.']),
      section('¿Por qué usar la calculadora de ritmo de natación?', ['Convierte un tiempo total medido en los segundos por 100 que usan los entrenadores en un reloj de ritmo. Elige metros para un ritmo de 100 m o yardas para un ritmo de 100 yd.']),
    ],
    faqs: [
      faq('¿Cómo se calcula el ritmo de natación?', 'Divide los segundos totales por la distancia total y multiplica por el intervalo de ritmo. Por ejemplo, 6:05 en 500 m son 73 segundos por 100 m.'),
      faq('¿Cuál es un buen ritmo de 100 metros?', 'Depende de la prueba y del nivel. Usa esta calculadora para dividir un tiempo objetivo en parciales realistas en lugar de depender de una sola media.'),
      faq('¿Debería dividir mi carrera en parciales iguales?', 'La mayoría de los nadadores de fondo buscan parciales casi iguales. Un pequeño split positivo al final es normal, así que planifica de forma uniforme y ajusta con los datos de tu carrera.'),
    ],
  },
  'split-calculator': {
    title: 'Calculadora de parciales de natación – Conversor de tiempos',
    description: 'Genera parciales de natación uniformes para cualquier distancia de carrera y consulta los tiempos acumulados en cada 25, 50 o 100.',
    h1: 'Calculadora de parciales de natación',
    lead: 'Divide una carrera de natación en parciales objetivo uniformes y lee los tiempos acumulados en cada 50 o 100.',
    sections: [
      section('Cómo usar la calculadora de parciales', [], ['Elige una distancia de carrera y una unidad.', 'Introduce el tiempo objetivo.', 'Elige una longitud de parcial de 25, 50 o 100.', 'Lee los tiempos acumulados del reloj y el ritmo de cada parcial.'], ['Elige una distancia de carrera y una unidad.', 'Introduce el tiempo objetivo.', 'Elige una longitud de parcial de 25, 50 o 100.', 'Lee los tiempos acumulados del reloj y el ritmo de cada parcial.']),
      section('Guía de ritmo de carrera', ['Planifica un primer tramo rápido pero controlado y después mantén una velocidad uniforme. Un pequeño split positivo en los últimos tramos es normal en carreras de fondo.']),
      section('¿Por qué usar la calculadora de parciales de natación?', ['Un tiempo final muestra qué tan rápido nadaste; los parciales muestran cómo. Usa objetivos acumulados para que el plan de carrera sea repetible en el entrenamiento.']),
    ],
    faqs: [
      faq('¿Qué son los parciales de natación?', 'Los parciales son los tiempos de cada segmento de una carrera, normalmente cada 50 o 100. Permiten comparar el ritmo durante la carrera en lugar de ver solo el tiempo final.'),
      faq('¿Cada parcial debe ser exactamente igual?', 'La mayoría de los nadadores de fondo planifican parciales casi iguales y pueden bajar ligeramente el ritmo al final. Entrena el ritmo que quieras ejecutar.'),
      faq('¿Cómo uso los parciales en el entrenamiento?', 'Introduce un tiempo objetivo de carrera, practica cada intervalo con salidas y compara los tiempos acumulados en cada vuelta.'),
    ],
  },
  'css-calculator': {
    title: 'Calculadora de CSS – Velocidad crítica de natación',
    description: 'Calcula la velocidad crítica de natación a partir de una prueba de 400 + 200 y obtén el ritmo CSS, las zonas de entrenamiento y los tiempos proyectados.',
    h1: 'Calculadora de velocidad crítica de natación (CSS)',
    lead: 'Nada un 400 intenso y un 200 rápido para estimar el ritmo umbral, cinco zonas de entrenamiento y los tiempos de carrera proyectados.',
    sections: [
      section('Cómo realizar la prueba', [], ['Calienta a fondo.', 'Nada un 400 a máximo esfuerzo.', 'Recupera 3–5 minutos y nada un 200 a máximo esfuerzo.', 'Introduce ambos tiempos para calcular el CSS.'], ['Calienta a fondo.', 'Nada un 400 a máximo esfuerzo.', 'Recupera 3–5 minutos y nada un 200 a máximo esfuerzo.', 'Introduce ambos tiempos para calcular el CSS.']),
      section('Cómo entender tus zonas', ['Usa los ritmos de recuperación y aeróbico para el trabajo fácil, el tempo para un ritmo controlado, el umbral para series de CSS y la Zona 5 para repeticiones cortas de alta calidad.']),
      section('¿Por qué usar la calculadora de velocidad crítica de natación?', ['Dos nadadas a máximo esfuerzo proporcionan un ritmo umbral repetible y un sistema práctico para zonas de entrenamiento y proyecciones de carrera.']),
    ],
    faqs: [
      faq('¿Qué es la velocidad crítica de natación (CSS)?', 'El CSS es el ritmo más rápido que puedes mantener con fatiga controlada. Se estima a partir de una prueba larga de 400 y corta de 200.'),
      faq('¿Cada cuánto debo repetir la prueba de CSS?', 'Repítela cada cuatro o seis semanas o al comienzo de un nuevo bloque de entrenamiento, especialmente después de mejorar la capacidad aeróbica.'),
      faq('¿El CSS es igual al ritmo de carrera?', 'No exactamente. Un 400 puede ser ligeramente más rápido que el CSS, mientras que un 1500 o una milla suelen estabilizarse cerca del ritmo CSS.'),
    ],
  },
  'interval-calculator': {
    title: 'Calculadora de series y salidas de natación',
    description: 'Crea series de entrenamiento de natación con repeticiones, distancia y ritmo, y calcula los tiempos de repetición y las salidas.',
    h1: 'Calculadora de series y salidas de natación',
    lead: 'Convierte un ritmo objetivo en una serie de entrenamiento completa con tiempos de repetición, salidas, totales y horas de salida junto a la pared.',
    sections: [
      section('Cómo usar el creador de series', [], ['Introduce las repeticiones y la distancia por repetición.', 'Establece tu ritmo por 100.', 'Elige un descanso fijo o una salida fija.', 'Lee el tiempo de repetición, los totales y las horas de salida.'], ['Introduce las repeticiones y la distancia por repetición.', 'Establece tu ritmo por 100.', 'Elige un descanso fijo o una salida fija.', 'Lee el tiempo de repetición, los totales y las horas de salida.']),
      section('Series clásicas para probar', ['Prueba una serie CSS, una serie aeróbica de 20 × 50, una serie de media distancia de 6 × 200 o una escalera descendente.']),
      section('¿Por qué usar la calculadora de intervalos?', ['Elimina la aritmética de series como 8 × 100 en 1:30 y produce un plan de reloj de ritmo que puedes seguir en la pared.']),
    ],
    faqs: [
      faq('¿Qué es una salida de natación?', 'Una salida es el intervalo fijo en el que sales de la pared para cada repetición. La diferencia entre la salida y el tiempo de repetición es tu descanso.'),
      faq('¿Debería crear series según una salida o un descanso?', 'Se utilizan ambos. Una salida fija hace que el ritmo sea consistente; un descanso fijo mantiene visible la relación entre trabajo y descanso a medida que la fatiga cambia el tiempo de repetición.'),
      faq('¿Qué descanso debo hacer entre repeticiones?', 'Las series de velocidad suelen usar 20–30 segundos o más, mientras que las series de umbral y CSS suelen usar 10–15 segundos.'),
    ],
  },
  'speed-calculator': {
    title: 'Calculadora de velocidad y proyección de carreras de natación',
    description: 'Convierte el tiempo y la distancia de natación en ritmo por 100 m o 100 yd, velocidad y tiempos de carrera proyectados.',
    h1: 'Calculadora de velocidad y proyección de carreras de natación',
    lead: 'Introduce un tiempo y una distancia de referencia para ver el ritmo, la velocidad y los tiempos proyectados desde 200 hasta la milla.',
    sections: [
      section('Cómo usarla', [], ['Elige una nadada de referencia.', 'Selecciona metros o yardas e introduce el tiempo.', 'Lee el ritmo por 100, la velocidad y los tiempos de carrera proyectados.', 'Usa una proyección para elegir un ritmo de entrenamiento.'], ['Elige una nadada de referencia.', 'Selecciona metros o yardas e introduce el tiempo.', 'Lee el ritmo por 100, la velocidad y los tiempos de carrera proyectados.', 'Usa una proyección para elegir un ritmo de entrenamiento.']),
      section('Referencias que conviene conocer', ['El 400 es una distancia clásica de prueba del CSS. El 1500 y el 1650 son carreras habituales de milla de piscina, mientras que 1760 yardas es la milla real.']),
      section('¿Por qué usar la calculadora de velocidad?', ['El ritmo describe un intervalo de entrenamiento y la velocidad describe el esfuerzo que produces. Esta herramienta muestra ambos en las unidades que usan entrenadores y nadadores.']),
    ],
    faqs: [
      faq('¿Por qué el ritmo por 100 yd es diferente al ritmo por 100 m?', 'Una yarda es más corta que un metro, por lo que 100 yardas recorren menos distancia que 100 metros a la misma velocidad.'),
      faq('¿Qué tan fiables son los tiempos de carrera proyectados?', 'Suponen que la velocidad de referencia se mantiene durante toda la distancia. Úsalos como objetivo inicial y ajústalos según el ritmo, el drafting y las condiciones.'),
      faq('¿Qué es una milla de piscina?', 'Los nadadores competitivos suelen llamar milla a 1500 metros o a 1650 yardas. La milla real son 1760 yardas, aproximadamente 1609 metros.'),
    ],
  },
  'calories-calculator': {
    title: 'Calculadora de calorías al nadar',
    description: 'Estima las calorías quemadas al nadar según el estilo, la intensidad, el peso corporal y la duración.',
    h1: 'Calculadora de calorías al nadar',
    lead: 'Estima las calorías quemadas según tu peso, estilo, intensidad y tiempo en el agua.',
    sections: [
      section('Cómo usarla', [], ['Introduce tu peso corporal.', 'Elige el estilo de natación.', 'Elige una intensidad ligera, moderada o vigorosa.', 'Introduce la duración y lee la estimación y la tasa por hora.'], ['Introduce tu peso corporal.', 'Elige el estilo de natación.', 'Elige una intensidad ligera, moderada o vigorosa.', 'Introduce la duración y lee la estimación y la tasa por hora.']),
      section('Por qué difieren los estilos', ['La mariposa normalmente requiere más esfuerzo, mientras que mantenerse a flote es la opción de menor esfuerzo. La intensidad puede importar tanto como el estilo.']),
      section('¿Por qué usar la calculadora de calorías de natación?', ['La estimación combina peso, estilo, intensidad y duración mediante valores MET estándar, lo que ofrece un número más útil para planificar que una media genérica.']),
    ],
    faqs: [
      faq('¿Qué precisión tienen las estimaciones de calorías al nadar?', 'Son estimaciones basadas en valores MET, peso corporal y duración. La técnica, la temperatura de la piscina y el metabolismo individual afectan al resultado.'),
      faq('¿Cuántas calorías quema la natación en una hora?', 'La respuesta depende del estilo y la intensidad. Un nadador de 70 kg puede quemar aproximadamente 400–700 kcal por hora en un entrenamiento típico.'),
      faq('¿Debería reponer las calorías quemadas nadando?', 'Para la mayoría de los nadadores, comer con normalidad es adecuado. Usa la estimación como una orientación, no como una prescripción nutricional precisa.'),
    ],
  },
  'lengths-converter': {
    title: 'Conversor de distancias de natación – Yardas a metros y longitudes de piscina',
    description: 'Convierte distancias de natación: yardas a metros, metros a yardas y distancias a longitudes de piscina.',
    h1: 'Conversor de distancias y longitudes de natación',
    lead: 'Convierte yardas a metros o metros a yardas y descubre cuántas longitudes representa una distancia en una piscina de 25 yardas, 25 metros o 50 metros.',
    sections: [
      section('Cómo usarlo', [], ['Elige entre yardas y metros, o entre distancia y longitudes.', 'Introduce una distancia o un número de longitudes.', 'Usa los valores predefinidos para distancias de natación habituales.', 'Lee las longitudes completas, el resto o la distancia equivalente.'], ['Elige entre yardas y metros, o entre distancia y longitudes.', 'Introduce una distancia o un número de longitudes.', 'Usa los valores predefinidos para distancias de natación habituales.', 'Lee las longitudes completas, el resto o la distancia equivalente.']),
      section('Referencia rápida de yardas a metros', ['25 yardas equivalen a 22.86 metros, 50 yardas a 45.72 metros y 1650 yardas a 1508.76 metros. En la otra dirección, 25 metros equivalen a 27.34 yardas y 1500 metros a 1640.42 yardas.']),
      section('¿Por qué usar el conversor de longitudes?', ['Las preguntas sobre distancias de piscina afectan a los planes de entrenamiento. Convierte distancias exactas y cuenta longitudes en piscinas de 25 yardas, 25 metros y 50 metros.']),
    ],
    faqs: [
      faq('¿Cómo convierto 25 yardas a metros?', 'Multiplica las yardas por 0.9144: 25 yardas equivalen a 22.86 metros, la longitud de una piscina corta en yardas.'),
      faq('¿Cuántos metros son 50 yardas?', '50 yardas equivalen a 45.72 metros. Otras conversiones comunes incluyen 100 yardas = 91.44 metros y 1650 yardas = 1508.76 metros.'),
      faq('¿Cuántas longitudes tiene una natación de 1500 metros?', 'Son 60 longitudes en una piscina de 25 metros y 30 longitudes en una piscina de 50 metros. Una distancia de 1650 yardas representa 66 longitudes en una piscina de 25 yardas.'),
    ],
  },
  'scy-to-lcm': {
    title: 'Conversor de SCY a LCM – Conversor de tiempos de natación',
    description: 'Convierte tiempos de natación SCY a LCM con un método documentado de conversión de natación.',
    h1: 'Conversor de SCY a LCM',
    lead: 'Convierte un tiempo de piscina corta en yardas en un tiempo estimado de piscina larga en metros.',
    sections: [
      section('¿Qué es una conversión de SCY a LCM?', ['Una piscina de 25 yardas y una de 50 metros cambian la distancia y el número de vueltas. El conversor escala el tiempo y añade un ajuste por vuelta para la piscina más grande.']),
      section('Cómo funciona la estimación', ['Las pruebas de estilo libre usan sus combinaciones habituales: 500 Free a 400 Free, 1000 Free a 800 Free y 1650 Free a 1500 Free. Todos los resultados son estimaciones.']),
    ],
    faqs: [
      faq('¿Cuál es el factor de conversión de SCY a LCM?', 'El factor base de yardas a metros es 1.11, con ajustes de distancia y vueltas específicos para cada prueba. El estilo libre de larga distancia usa factores de combinación independientes.'),
      faq('¿Por qué los tiempos de LCM son más lentos?', 'Una piscina de 50 metros tiene menos vueltas que una de 25 yardas. El nadador de piscina corta recibe más impulsos de pared, por lo que el mismo esfuerzo puede ser más rápido en yardas.'),
    ],
  },
  'scy-to-scm': {
    title: 'Conversor de SCY a SCM – Conversor de tiempos de natación',
    description: 'Convierte tiempos de natación SCY a SCM, piscina corta en metros.',
    h1: 'Conversor de SCY a SCM',
    lead: 'Convierte un tiempo de una piscina de 25 yardas en un tiempo estimado para una piscina de 25 metros.',
    sections: [
      section('¿Qué es una conversión de SCY a SCM?', ['SCY y SCM usan ambas piscinas de 25 longitudes, por lo que el número de vueltas es el mismo. El cambio principal es que un metro es más largo que una yarda.']),
      section('Cómo funciona la estimación', ['El factor estándar es 1.11 para pruebas similares. El estilo libre de distancia usa combinaciones independientes para 500 a 400, 1000 a 800 y 1650 a 1500.']),
    ],
    faqs: [
      faq('¿Cuál es el factor de conversión de SCY a SCM?', 'Para pruebas similares, multiplica los segundos de piscina corta en yardas por 1.11 porque un carril de 25 yardas es más corto que uno de 25 metros.'),
      faq('¿500 yardas son lo mismo que 400 o 500 metros?', 'Una prueba de estilo libre de 500 yardas corresponde a la de 400 metros en competición internacional de piscina corta.'),
    ],
  },
  'scm-to-lcm': {
    title: 'Conversor de SCM a LCM – Conversor de tiempos de natación',
    description: 'Convierte tiempos de piscina corta en metros a tiempos estimados de piscina larga en metros.',
    h1: 'Conversor de SCM a LCM',
    lead: 'Convierte un tiempo de una piscina de 25 metros en un tiempo estimado para una piscina de 50 metros.',
    sections: [
      section('¿Qué es una conversión de SCM a LCM?', ['SCM y LCM usan las mismas distancias métricas, pero una piscina de 25 metros tiene más del doble de vueltas que una de 50 metros. La estimación ajusta esas vueltas adicionales.']),
      section('Cómo funciona la estimación', ['Los valores de segundos por vuelta específicos de cada estilo explican la diferencia. La misma lógica se aplica a las pruebas de estilo libre de 400, 800 y 1500.']),
    ],
    faqs: [
      faq('¿Cómo convierto SCM a LCM?', 'Las distancias coinciden, por lo que el conversor añade la diferencia de tiempo estimada causada por las vueltas adicionales de una piscina de 25 metros.'),
      faq('¿Cuánto más rápido es SCM que LCM?', 'Las pruebas de sprint pueden ganar unas décimas, mientras que las carreras de 200 o más pueden ganar un segundo o más porque contienen más vueltas.'),
    ],
  },
  'lcm-to-scy': {
    title: 'Conversor de LCM a SCY – Conversor de tiempos de natación',
    description: 'Convierte tiempos de piscina larga en metros a tiempos estimados de piscina corta en yardas.',
    h1: 'Conversor de LCM a SCY',
    lead: 'Convierte un tiempo de una piscina de 50 metros en un tiempo estimado para una piscina de 25 yardas.',
    sections: [
      section('¿Qué es una conversión de LCM a SCY?', ['Una carrera de 50 metros tiene menos vueltas, por lo que la conversión inversa elimina la ventaja de las vueltas y escala los metros a yardas.']),
      section('Cómo funciona la estimación', ['El estilo libre de distancia combina 400 metros con 500 yardas, 800 metros con 1000 yardas y 1500 metros con 1650 yardas. Todos los tiempos convertidos son estimaciones.']),
    ],
    faqs: [
      faq('¿Cuál es el factor de conversión de LCM a SCY?', 'Para pruebas similares se usa el inverso de 1.11, junto con un ajuste por las vueltas adicionales de una piscina de 25 yardas.'),
      faq('¿Por qué un tiempo de SCY es más rápido?', 'Una piscina de 25 yardas tiene más paredes y cada vuelta ofrece una ventaja de impulso que puede hacer que el tiempo total sea más rápido.'),
    ],
  },
  'lcm-to-scm': {
    title: 'Conversor de LCM a SCM – Conversor de tiempos de natación',
    description: 'Convierte tiempos de piscina larga en metros a tiempos estimados de piscina corta en metros.',
    h1: 'Conversor de LCM a SCM',
    lead: 'Convierte un tiempo de una piscina de 50 metros en un tiempo estimado para una piscina de 25 metros.',
    sections: [
      section('¿Qué es una conversión de LCM a SCM?', ['Las distancias son las mismas, por lo que la diferencia procede de las vueltas adicionales disponibles en una piscina de 25 metros.']),
      section('Cómo funciona la estimación', ['Se aplica un valor de segundos por vuelta específico del estilo a las paredes adicionales. Las carreras más largas muestran una diferencia mayor.']),
    ],
    faqs: [
      faq('¿Cómo convierto LCM a SCM?', 'Como las distancias son idénticas, el conversor elimina la ventaja de las vueltas de la piscina más larga mediante valores de vuelta específicos de cada estilo.'),
      faq('¿La piscina corta es más rápida que la larga?', 'Normalmente sí. Más paredes en una piscina de 25 metros ofrecen más impulsos y producen tiempos más rápidos para el mismo nadador y la misma prueba.'),
    ],
  },
  'scm-to-scy': {
    title: 'Conversor de SCM a SCY – Conversor de tiempos de natación',
    description: 'Convierte tiempos de piscina corta en metros a tiempos estimados de piscina corta en yardas.',
    h1: 'Conversor de SCM a SCY',
    lead: 'Convierte un tiempo de una piscina de 25 metros en un tiempo estimado para una piscina de 25 yardas.',
    sections: [
      section('¿Qué es una conversión de SCM a SCY?', ['Ambas piscinas son de recorrido corto y tienen el mismo número de vueltas. La conversión escala principalmente la distancia porque una yarda es más corta que un metro.']),
      section('Cómo funciona la estimación', ['Usa las combinaciones estándar de 400 metros a 500 yardas, 800 metros a 1000 yardas y 1500 metros a 1650 yardas. Los resultados son estimaciones.']),
    ],
    faqs: [
      faq('¿Cuál es el factor de conversión de SCM a SCY?', 'Para pruebas equivalentes, divide los segundos de SCM por 1.11 porque el número de vueltas es el mismo y solo cambia la distancia del carril.'),
      faq('¿Se pueden usar tiempos SCM convertidos en competiciones de EE. UU.?', 'Algunas competiciones aceptan tiempos convertidos, pero los organizadores pueden aplicar sus propias reglas. Consulta primero la información de inscripción de la prueba.'),
    ],
  },
  guides: {
    title: 'Guías – Conversor de tiempos de natación',
    description: 'Guías paso a paso para convertir tiempos de natación, calcular el ritmo y crear parciales de carrera.',
    h1: 'Guías del conversor de tiempos de natación',
    lead: 'Todo lo que necesitas para comparar tiempos entre piscinas, planificar ritmos y crear parciales de carrera.',
    sections: [
      section('Cómo funcionan las conversiones de tiempos de natación', ['SCY se nada en 25 yardas, SCM en 25 metros y LCM en 50 metros. Primero coincide la prueba, después escala la distancia y finalmente ajusta las vueltas.', 'Ninguna conversión es exacta. Usa los resultados para comparar y planificar, y sigue las reglas oficiales al presentar un tiempo.']),
      section('Referencia rápida', ['SCY a SCM: multiplica por 1.11 en pruebas similares. SCM a LCM: añade el tiempo de las vueltas. Las combinaciones de distancia incluyen 500 a 400, 1000 a 800 y 1650 a 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculadora de ritmo de natación', description: 'Convierte el tiempo total y la distancia en ritmos objetivo.', tag: 'Calculadora' },
      { route: 'split-calculator', title: 'Calculadora de parciales de natación', description: 'Divide un tiempo objetivo en parciales acumulados.', tag: 'Calculadora' },
      { route: 'css-calculator', title: 'Velocidad crítica de natación', description: 'Calcula el ritmo umbral y las zonas de entrenamiento.', tag: 'Calculadora' },
      { route: 'interval-calculator', title: 'Series y salidas', description: 'Crea una serie a partir de repeticiones, distancia y ritmo.', tag: 'Calculadora' },
      { route: 'scy-to-lcm', title: 'Conversión de SCY a LCM', description: 'Convierte piscina corta en yardas a piscina larga en metros.', tag: 'Conversión' },
      { route: 'scy-to-scm', title: 'Conversión de SCY a SCM', description: 'Convierte la piscina corta de EE. UU. a la internacional.', tag: 'Conversión' },
    ],
  },
  about: {
    title: 'Acerca de – Conversor de tiempos de natación',
    description: 'Acerca del conversor de tiempos de natación gratis para tiempos SCY, SCM y LCM.',
    h1: 'Acerca del conversor de tiempos de natación',
    lead: 'Una herramienta gratuita, rápida y respetuosa con la privacidad para comparar sesiones de natación entre piscinas de competición.',
    sections: [
      section('Por qué lo creamos', ['Los nadadores necesitan comparar tiempos entre yardas y metros al cambiar de competición o usar herramientas de ritmo. Creamos una página rápida que funciona en cualquier dispositivo y utiliza un método ampliamente entendido.', 'Todo funciona en tu navegador. Tus tiempos nunca salen de tu dispositivo.']),
      section('El método de conversión', ['La calculadora utiliza un enfoque basado en factores con ajustes documentados de piscina y por vuelta. Las pruebas de estilo libre de distancia utilizan sus propios factores. Los resultados son estimaciones cercanas, no conversiones oficiales.']),
      section('Limitaciones', ['Ninguna conversión es exacta. Las vueltas, la respiración, la altitud, el ritmo y el estilo de nado afectan al rendimiento real. Usa siempre las reglas oficiales para inscribirte en competiciones.']),
      section('Contacto', ['Las preguntas, correcciones o sugerencias son bienvenidas a través de la página de contacto.']),
    ],
  },
  contact: {
    title: 'Contacto – Conversor de tiempos de natación',
    description: 'Contacta con el equipo del Conversor de tiempos de natación para enviar preguntas, comentarios o correcciones.',
    h1: 'Contacto del Conversor de tiempos de natación',
    lead: '¿Has encontrado un problema o tienes una idea para una función? Envía un mensaje a hello@onlineswimtimeconverter.com.',
    sections: [
      section('Ponte en contacto', ['Leemos todos los mensajes. Usa la dirección de correo anterior para preguntas, correcciones, sugerencias de funciones y alianzas.']),
      section('¿Buscas una herramienta?', ['Usa las calculadoras y las guías para comparar tiempos, calcular el ritmo y crear planes de carrera.']),
    ],
  },
  'privacy-policy': {
    title: 'Política de privacidad – Conversor de tiempos de natación',
    description: 'Política de privacidad de las calculadoras del Conversor de tiempos de natación basadas en el navegador.',
    h1: 'Política de privacidad',
    lead: 'En vigor desde enero de 2026. Esta política explica qué datos recopila este sitio y cómo los utiliza.',
    sections: [
      section('Privacidad desde el diseño', ['Las calculadoras funcionan en tu navegador. Los tiempos y distancias introducidos en una calculadora no se transmiten a un servidor.']),
      section('Almacenamiento local y cookies', ['Tu navegador puede guardar preferencias como el tema o la configuración de las calculadoras. Este sitio utiliza un almacenamiento propio mínimo y no vende información personal.']),
      section('Datos y servicios automatizados', ['Los proveedores de alojamiento y análisis pueden procesar información técnica rutinaria para operar y mejorar el sitio.']),
      section('Tus derechos y los menores', ['Puedes solicitar el acceso, la corrección o la eliminación de datos personales cuando corresponda. El sitio está dirigido a público general y no recopila conscientemente datos de menores.']),
      section('Cambios en la política', ['Esta política puede actualizarse a medida que cambie el sitio. La versión actual se publica en esta página.']),
    ],
  },
  terms: {
    title: 'Términos del servicio – Conversor de tiempos de natación',
    description: 'Términos del servicio para las herramientas gratuitas del Conversor de tiempos de natación basadas en el navegador.',
    h1: 'Términos del servicio',
    lead: 'En vigor desde enero de 2026. Estos términos regulan tu uso de onlineswimtimeconverter.com.',
    sections: [
      section('Naturaleza del servicio', ['El sitio ofrece estimaciones gratuitas basadas en el navegador para tiempos de natación, ritmo y parciales. Las herramientas se proporcionan tal cual, sin garantías.']),
      section('No es consejo deportivo oficial', ['Los tiempos convertidos son estimaciones y no son oficiales ni certificados. Sigue las reglas de la organización que acepte tiempos de competición.']),
      section('Uso aceptable y responsabilidad', ['No hagas un uso indebido, no interrumpas ni hagas scraping del sitio. No somos responsables de los daños derivados del uso del servicio o de la confianza en sus estimaciones.']),
      section('Propiedad intelectual y cambios', ['El diseño, el texto y la funcionalidad del sitio no pueden reproducirse comercialmente sin permiso. Estos términos pueden cambiar cuando se publiquen.']),
    ],
  },
};
