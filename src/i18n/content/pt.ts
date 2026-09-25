import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const portuguesePages: PageCatalog = {
  home: {
    title: 'Conversor de tempos de natação: SCY, SCM e LCM',
    description: 'Converta tempos de natação entre SCY, SCM e LCM, além de yards em metros. Conversor de tempos de natação gratuito para nadadores internacionais.',
    h1: 'Conversor de tempos de natação',
    lead: 'Converta tempos de natação entre as piscinas SCY, SCM e LCM, com conversões de yards para metros incluídas.',
    eyebrow: 'Calculadora de natação gratuita',
    sections: [
      section('Calculadoras de natação relacionadas', ['Compare ritmo, parciais, velocidade crítica de natação, séries, velocidade, calorias e comprimentos de piscina com ferramentas feitas para nadadores.']),
      section('Conversores de piscina', ['Escolha uma combinação de piscinas para converter um tempo de natação entre uma piscina de 25 yards, uma de 25 metros e uma de 50 metros.']),
      section('SCY, SCM e LCM', ['O comprimento da piscina altera o número de voltas e a distância percorrida. SCY usa 25 yards, SCM usa 25 metros e LCM usa 50 metros.']),
      section('Como funciona um conversor de tempos de natação?', ['O conversor aplica um fator de piscina documentado e um ajuste por volta. Muitos programas de categorias de base e Masters usam os fatores do Colorado.', 'Todos os resultados de conversão são estimativas, porque cada nadador ganha uma quantidade diferente com as voltas e as paredes.']),
      section('Como usar este conversor', ['Escolha a piscina e a prova, informe seu tempo e veja o tempo equivalente em cada piscina.']),
      section('Por que usar o conversor de tempos de natação?', ['É uma ferramenta gratuita e privada no navegador para comparar resultados, definir metas de classificação, planejar ritmos de treino e converter yards em metros sem instalar programas.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculadora de ritmo de natação', description: 'Encontre o ritmo alvo por 25, 50, 100, 200 ou 400.' },
      { route: 'split-calculator', title: 'Calculadora de parciais de natação', description: 'Gere parciais acumulados uniformes para qualquer distância de prova.' },
      { route: 'css-calculator', title: 'Velocidade crítica de natação (CSS)', description: 'Calcule o ritmo limiar e as zonas de treino a partir de um teste de 400 + 200.' },
      { route: 'interval-calculator', title: 'Séries e saídas', description: 'Monte uma série de treino com repetições, ritmo e saídas.' },
      { route: 'speed-calculator', title: 'Velocidade e projeção de prova', description: 'Converta o ritmo em m/s, km/h e tempos de prova projetados.' },
      { route: 'calories-calculator', title: 'Calorias ao nadar', description: 'Estime as calorias por estilo, intensidade, peso e tempo.' },
      { route: 'lengths-converter', title: 'Comprimentos e distância', description: 'Converta distâncias e comprimentos para piscinas de 25 yd, 25 m e 50 m.' },
    ],
    courses: [
      { code: 'SCY', name: 'Yards em piscina curta', length: '25 yards', usage: 'Ensino médio dos EUA, NCAA e competição de clubes' },
      { code: 'SCM', name: 'Metros em piscina curta', length: '25 metros', usage: 'Competição internacional em piscina curta' },
      { code: 'LCM', name: 'Metros em piscina longa', length: '50 metros', usage: 'Jogos Olímpicos e Campeonatos Mundiais' },
    ],
    faqs: [
      faq('O que é um conversor de tempos de natação?', 'Ele estima como um tempo em uma piscina se compara com o tempo equivalente em outra. O mesmo esforço pode produzir tempos finais diferentes porque o comprimento da piscina altera o número de voltas.'),
      faq('O que são SCY, SCM e LCM?', 'SCY é uma piscina de 25 yards, SCM é uma piscina de 25 metros e LCM é uma piscina de 50 metros. Esses são os três comprimentos padrão de piscina de competição.'),
      faq('Como converto SCY em LCM?', 'Selecione SCY como piscina de origem, escolha a prova e o tempo e selecione LCM como destino. O conversor aplica um fator de piscina e um ajuste por volta.'),
      faq('As conversões de tempos de natação são exatas?', 'Não. Voltas, paredes, respiração e ritmo variam de nadador para nadador, portanto cada conversão é uma estimativa. Considere os resultados aproximações próximas, não tempos oficiais.'),
      faq('O conversor de tempos de natação é gratuito e privado?', 'Sim. Ele funciona inteiramente no seu navegador, permite conversões ilimitadas e não envia os tempos informados a um servidor.'),
    ],
  },
  'pace-calculator': {
    title: 'Calculadora de ritmo de natação – Conversor de tempos de natação',
    description: 'Calcule o ritmo de natação por 100, 200, 400 ou qualquer distância a partir do tempo total e da distância.',
    h1: 'Calculadora de ritmo de natação',
    lead: 'Calcule seu ritmo por 25, 50, 100, 200 ou 400 em yards ou metros a partir de um tempo total e uma distância.',
    sections: [
      section('Como usar a calculadora de ritmo', [], ['Informe a distância total e escolha yards ou metros.', 'Informe o tempo total.', 'Escolha um intervalo de ritmo como 100, 200, 400 ou uma distância personalizada.', 'Calcule e use o resultado para planejar uma série uniforme.'], ['Informe a distância total e escolha yards ou metros.', 'Informe o tempo total.', 'Escolha um intervalo de ritmo como 100, 200, 400 ou uma distância personalizada.', 'Calcule e use o resultado para planejar uma série uniforme.']),
      section('Metas de ritmo comuns', ['O ritmo é o tempo necessário para percorrer um intervalo. Treinadores usam saídas para manter séries de treino consistentes.']),
      section('Por que usar a calculadora de ritmo de natação?', ['Converta um tempo total medido em segundos por 100, como os treinadores usam no relógio de ritmo. Escolha metros para um ritmo de 100 m ou yards para um ritmo de 100 yd.']),
    ],
    faqs: [
      faq('Como calculo o ritmo de natação?', 'Divida os segundos totais pela distância total e multiplique pelo intervalo de ritmo. Por exemplo, 6:05 em 500 m equivalem a 73 segundos por 100 m.'),
      faq('Qual é um bom ritmo de 100 metros?', 'Depende da prova e do nível. Use esta calculadora para dividir um tempo alvo em parciais realistas em vez de depender de uma única média.'),
      faq('Devo dividir minha prova em parciais iguais?', 'A maioria dos nadadores de fundo busca parciais quase iguais. Um pequeno positivo no final é normal; planeje de forma uniforme e ajuste com os dados da sua prova.'),
    ],
  },
  'split-calculator': {
    title: 'Calculadora de parciais de natação – Conversor de tempos de natação',
    description: 'Gere parciais de natação uniformes para qualquer distância de prova e veja os tempos acumulados a cada 25, 50 ou 100.',
    h1: 'Calculadora de parciais de natação',
    lead: 'Divida uma prova de natação em parciais alvo uniformes e leia os tempos acumulados a cada 50 ou 100.',
    sections: [
      section('Como usar a calculadora de parciais', [], ['Escolha uma distância de prova e uma unidade.', 'Informe o tempo objetivo.', 'Escolha o comprimento de cada parcial de 25, 50 ou 100.', 'Leia os tempos acumulados do relógio e o ritmo de cada parcial.'], ['Escolha uma distância de prova e uma unidade.', 'Informe o tempo objetivo.', 'Escolha o comprimento de cada parcial de 25, 50 ou 100.', 'Leia os tempos acumulados do relógio e o ritmo de cada parcial.']),
      section('Guia de ritmo de prova', ['Planeje um primeiro trecho rápido, mas controlado, e depois mantenha uma velocidade uniforme. Um pequeno positivo nos últimos trechos é normal em provas de fundo.']),
      section('Por que usar a calculadora de parciais de natação?', ['Um tempo final mostra o quão rápido você nadou; os parciais mostram como. Use metas acumuladas para tornar o plano de prova repetível no treino.']),
    ],
    faqs: [
      faq('O que são parciais de natação?', 'São os tempos de cada trecho de uma prova, normalmente a cada 50 ou 100. Eles permitem comparar o ritmo durante a prova em vez de ver apenas o tempo final.'),
      faq('Cada parcial deve ser exatamente igual?', 'A maioria dos nadadores de fundo planeja parciais quase iguais e pode desacelerar um pouco no final. Treine o ritmo que deseja executar.'),
      faq('Como usar parciais no treino?', 'Informe um tempo de prova alvo, pratique cada intervalo com uma saída e compare os tempos acumulados em cada virada.'),
    ],
  },
  'css-calculator': {
    title: 'Calculadora de CSS – Velocidade crítica de natação',
    description: 'Descubra a velocidade crítica de natação com um teste de 400 + 200 e obtenha o ritmo CSS, as zonas de treino e os tempos projetados.',
    h1: 'Calculadora de velocidade crítica de natação (CSS)',
    lead: 'Nade um 400 intenso e um 200 rápido para estimar o ritmo limiar, cinco zonas de treino e os tempos de prova projetados.',
    sections: [
      section('Como realizar o teste', [], ['Aqueça bem.', 'Nade um 400 no máximo esforço.', 'Recupere por 3–5 minutos e nade um 200 no máximo esforço.', 'Informe os dois tempos para calcular o CSS.'], ['Aqueça bem.', 'Nade um 400 no máximo esforço.', 'Recupere por 3–5 minutos e nade um 200 no máximo esforço.', 'Informe os dois tempos para calcular o CSS.']),
      section('Como entender suas zonas', ['Use ritmos de recuperação e aeróbico para o trabalho fácil, ritmo tempo para um esforço controlado, ritmo limiar para séries de CSS e Zona 5 para repetições curtas de alta qualidade.']),
      section('Por que usar a calculadora de velocidade crítica de natação?', ['Duas nadas no máximo esforço oferecem um ritmo limiar repetível e um sistema prático para zonas de treino e projeções de prova.']),
    ],
    faqs: [
      faq('O que é velocidade crítica de natação (CSS)?', 'O CSS é o ritmo mais rápido que você consegue manter com fadiga controlada. Ele é estimado a partir de um teste longo de 400 e curto de 200.'),
      faq('Com que frequência devo refazer o teste de CSS?', 'Refaça a cada quatro ou seis semanas ou no início de um novo bloco de treino, especialmente após uma melhora aeróbica.'),
      faq('O CSS é igual ao ritmo de prova?', 'Não exatamente. Um 400 pode ser um pouco mais rápido que o CSS, enquanto um 1500 ou uma milha normalmente se estabiliza perto do ritmo CSS.'),
    ],
  },
  'interval-calculator': {
    title: 'Calculadora de séries e saídas de natação',
    description: 'Monte séries de treino de natação com repetições, distância e ritmo e calcule os tempos de repetição e as saídas.',
    h1: 'Calculadora de séries e saídas de natação',
    lead: 'Transforme um ritmo alvo em uma série de treino completa com tempos de repetição, saídas, totais e horários de saída da parede.',
    sections: [
      section('Como usar o criador de séries', [], ['Informe as repetições e a distância de cada repetição.', 'Defina seu ritmo por 100.', 'Escolha um descanso fixo ou uma saída fixa.', 'Leia o tempo de repetição, os totais e os horários de saída.'], ['Informe as repetições e a distância de cada repetição.', 'Defina seu ritmo por 100.', 'Escolha um descanso fixo ou uma saída fixa.', 'Leia o tempo de repetição, os totais e os horários de saída.']),
      section('Séries clássicas para experimentar', ['Experimente uma série CSS, uma série aeróbica de 20 × 50, uma série de média distância de 6 × 200 ou uma escada descendente.']),
      section('Por que usar a calculadora de intervalos?', ['Ela elimina a aritmética de séries como 8 × 100 em 1:30 e produz um plano para o relógio de ritmo que você pode seguir na parede.']),
    ],
    faqs: [
      faq('O que é uma saída de natação?', 'Uma saída é o intervalo fixo em que você deixa a parede para cada repetição. A diferença entre a saída e o tempo de repetição é o descanso.'),
      faq('Devo montar séries com base em uma saída ou no descanso?', 'Ambos são usados. Uma saída fixa mantém o ritmo consistente; um descanso fixo mantém visível a relação entre esforço e descanso à medida que a fadiga altera o tempo da repetição.'),
      faq('Quanto tempo devo descansar entre repetições?', 'Séries de velocidade costumam usar 20–30 segundos ou mais, enquanto séries de limiar e CSS normalmente usam 10–15 segundos.'),
    ],
  },
  'speed-calculator': {
    title: 'Calculadora de velocidade e projeção de provas de natação',
    description: 'Converta tempo e distância de natação em ritmo por 100 m ou 100 yd, velocidade e tempos de prova projetados.',
    h1: 'Calculadora de velocidade e projeção de provas de natação',
    lead: 'Informe um tempo e uma distância de referência para ver ritmo, velocidade e tempos projetados de 200 até a milha.',
    sections: [
      section('Como usar', [], ['Escolha uma natação de referência.', 'Selecione metros ou yards e informe o tempo.', 'Leia o ritmo por 100, a velocidade e os tempos de prova projetados.', 'Use uma projeção para escolher um ritmo de treino.'], ['Escolha uma natação de referência.', 'Selecione metros ou yards e informe o tempo.', 'Leia o ritmo por 100, a velocidade e os tempos de prova projetados.', 'Use uma projeção para escolher um ritmo de treino.']),
      section('Referências que vale conhecer', ['O 400 é uma distância clássica de teste do CSS. O 1500 e o 1650 são provas comuns de milha em piscina, enquanto 1760 yards são a milha verdadeira.']),
      section('Por que usar a calculadora de velocidade?', ['Ritmo descreve um intervalo de treino e velocidade descreve o esforço que você produz. Esta ferramenta mostra os dois nas unidades usadas por treinadores e nadadores.']),
    ],
    faqs: [
      faq('Por que o ritmo por 100 yd é diferente do ritmo por 100 m?', 'Uma yard é menor que um metro, portanto 100 yards percorrem uma distância menor que 100 metros na mesma velocidade.'),
      faq('Quão confiáveis são os tempos de prova projetados?', 'Eles supõem que a velocidade de referência seja mantida por toda a distância. Use-os como meta inicial e ajuste conforme o ritmo, o drafting e as condições.'),
      faq('O que é uma milha em piscina?', 'Nadadores competitivos costumam chamar de milha uma distância de 1500 metros ou 1650 yards. A milha verdadeira tem 1760 yards, ou cerca de 1609 metros.'),
    ],
  },
  'calories-calculator': {
    title: 'Calculadora de calorias ao nadar',
    description: 'Estime as calorias gastas nadando por estilo, intensidade, peso corporal e duração.',
    h1: 'Calculadora de calorias ao nadar',
    lead: 'Estime as calorias gastas com seu peso, estilo, intensidade e tempo na água.',
    sections: [
      section('Como usar', [], ['Informe seu peso corporal.', 'Escolha o estilo de natação.', 'Escolha intensidade leve, moderada ou vigorosa.', 'Informe a duração e veja a estimativa e a taxa por hora.'], ['Informe seu peso corporal.', 'Escolha o estilo de natação.', 'Escolha intensidade leve, moderada ou vigorosa.', 'Informe a duração e veja a estimativa e a taxa por hora.']),
      section('Por que os estilos diferem', ['A borboleta normalmente exige mais esforço, enquanto ficar parado na água é a opção de menor esforço. A intensidade pode importar tanto quanto o estilo.']),
      section('Por que usar a calculadora de calorias de natação?', ['A estimativa combina peso, estilo, intensidade e duração usando valores MET padrão, oferecendo um número mais útil para planejamento do que uma média genérica.']),
    ],
    faqs: [
      faq('Quão precisas são as estimativas de calorias ao nadar?', 'São estimativas baseadas em valores MET, peso corporal e duração. Técnica, temperatura da piscina e metabolismo individual afetam o resultado.'),
      faq('Quantas calorias a natação queima em uma hora?', 'A resposta depende do estilo e da intensidade. Um nadador de 70 kg pode queimar cerca de 400–700 kcal por hora em um treino típico.'),
      faq('Devo comer as calorias gastas nadando?', 'Para a maioria dos nadadores, comer normalmente é adequado. Use a estimativa como orientação, não como uma prescrição nutricional precisa.'),
    ],
  },
  'lengths-converter': {
    title: 'Conversor de distâncias de natação – Yards em metros e comprimentos de piscina',
    description: 'Converta distâncias de natação: yards em metros, metros em yards e distâncias em comprimentos de piscina.',
    h1: 'Conversor de distâncias e comprimentos de natação',
    lead: 'Converta yards em metros ou metros em yards e veja quantos comprimentos uma distância representa em uma piscina de 25 yards, 25 metros ou 50 metros.',
    sections: [
      section('Como usar', [], ['Escolha yards e metros, ou distância e comprimentos.', 'Informe uma distância ou um número de comprimentos.', 'Use os valores rápidos para distâncias de natação comuns.', 'Leia os comprimentos completos, o restante ou a distância equivalente.'], ['Escolha yards e metros, ou distância e comprimentos.', 'Informe uma distância ou um número de comprimentos.', 'Use os valores rápidos para distâncias de natação comuns.', 'Leia os comprimentos completos, o restante ou a distância equivalente.']),
      section('Referência rápida de yards para metros', ['25 yards equivalem a 22.86 metros, 50 yards a 45.72 metros e 1650 yards a 1508.76 metros. No sentido inverso, 25 metros equivalem a 27.34 yards e 1500 metros a 1640.42 yards.']),
      section('Por que usar o conversor de comprimentos?', ['As perguntas sobre distâncias de piscina afetam os planos de treino. Converta distâncias exatas e conte comprimentos em piscinas de 25 yards, 25 metros e 50 metros.']),
    ],
    faqs: [
      faq('Como converto 25 yards em metros?', 'Multiplique os yards por 0.9144: 25 yards equivalem a 22.86 metros, o comprimento de uma piscina curta em yards.'),
      faq('Quantos metros são 50 yards?', '50 yards equivalem a 45.72 metros. Outras conversões comuns incluem 100 yards = 91.44 metros e 1650 yards = 1508.76 metros.'),
      faq('Quantos comprimentos tem uma distância de 1500 metros?', 'São 60 comprimentos em uma piscina de 25 metros e 30 comprimentos em uma piscina de 50 metros. Uma distância de 1650 yards tem 66 comprimentos em uma piscina de 25 yards.'),
    ],
  },
  'scy-to-lcm': {
    title: 'Conversor de SCY para LCM – Conversor de tempos de natação',
    description: 'Converta tempos de natação SCY em LCM usando um método documentado de conversão de natação.',
    h1: 'Conversor de SCY para LCM',
    lead: 'Converta um tempo de piscina curta em yards em um tempo estimado de piscina longa em metros.',
    sections: [
      section('O que é uma conversão de SCY para LCM?', ['Uma piscina de 25 yards e uma de 50 metros alteram a distância e o número de voltas. O conversor escala o tempo e acrescenta um ajuste por volta para a piscina maior.']),
      section('Como funciona a estimativa', ['As provas de nado livre usam os pares usuais: 500 Livre para 400 Livre, 1000 Livre para 800 Livre e 1650 Livre para 1500 Livre. Todos os resultados são estimativas.']),
    ],
    faqs: [
      faq('Qual é o fator de conversão de SCY para LCM?', 'O fator básico de yards para metros é 1.11, com ajustes de distância e de voltas específicos de cada prova. O nado livre de longa distância usa fatores de pareamento separados.'),
      faq('Por que os tempos de LCM são mais lentos?', 'Uma piscina de 50 metros tem menos voltas que uma de 25 yards. O nadador de piscina curta recebe mais impulsos da parede, portanto o mesmo esforço pode ser mais rápido em yards.'),
    ],
  },
  'scy-to-scm': {
    title: 'Conversor de SCY para SCM – Conversor de tempos de natação',
    description: 'Converta tempos de natação SCY em SCM, piscina curta em metros.',
    h1: 'Conversor de SCY para SCM',
    lead: 'Converta um tempo de uma piscina de 25 yards em um tempo estimado para uma piscina de 25 metros.',
    sections: [
      section('O que é uma conversão de SCY para SCM?', ['SCY e SCM usam ambas piscinas de 25 comprimentos, portanto o número de voltas é o mesmo. A principal mudança é que um metro é maior que uma yard.']),
      section('Como funciona a estimativa', ['O fator padrão é 1.11 para provas semelhantes. O nado livre de distância usa pares separados para 500 para 400, 1000 para 800 e 1650 para 1500.']),
    ],
    faqs: [
      faq('Qual é o fator de conversão de SCY para SCM?', 'Para provas semelhantes, multiplique os segundos da piscina curta em yards por 1.11, porque um carril de 25 yards é mais curto que um carril de 25 metros.'),
      faq('500 yards equivalem a 400 ou 500 metros?', 'Uma prova de nado livre de 500 yards corresponde à prova de 400 metros na competição internacional de piscina curta.'),
    ],
  },
  'scm-to-lcm': {
    title: 'Conversor de SCM para LCM – Conversor de tempos de natação',
    description: 'Converta tempos de piscina curta em metros em tempos estimados de piscina longa em metros.',
    h1: 'Conversor de SCM para LCM',
    lead: 'Converta um tempo de uma piscina de 25 metros em um tempo estimado para uma piscina de 50 metros.',
    sections: [
      section('O que é uma conversão de SCM para LCM?', ['SCM e LCM usam as mesmas distâncias métricas, mas uma piscina de 25 metros tem mais que o dobro de voltas de uma piscina de 50 metros. A estimativa ajusta essas voltas extras.']),
      section('Como funciona a estimativa', ['Valores de segundos por volta específicos de cada estilo explicam a diferença. A mesma lógica se aplica às provas de nado livre de 400, 800 e 1500.']),
    ],
    faqs: [
      faq('Como converto SCM para LCM?', 'Como as distâncias são iguais, o conversor acrescenta a diferença estimada de tempo causada pelas voltas extras em uma piscina de 25 metros.'),
      faq('Quanto mais rápido é SCM do que LCM?', 'Provas de sprint podem ganhar algumas décimos, enquanto provas de 200 ou mais podem ganhar um segundo ou mais, pois têm mais voltas.'),
    ],
  },
  'lcm-to-scy': {
    title: 'Conversor de LCM para SCY – Conversor de tempos de natação',
    description: 'Converta tempos de piscina longa em metros em tempos estimados de piscina curta em yards.',
    h1: 'Conversor de LCM para SCY',
    lead: 'Converta um tempo de uma piscina de 50 metros em um tempo estimado para uma piscina de 25 yards.',
    sections: [
      section('O que é uma conversão de LCM para SCY?', ['Uma prova de 50 metros tem menos voltas; por isso, a conversão inversa remove a vantagem das voltas e escala os metros para yards.']),
      section('Como funciona a estimativa', ['O nado livre de distância combina 400 metros com 500 yards, 800 metros com 1000 yards e 1500 metros com 1650 yards. Todos os tempos convertidos são estimativas.']),
    ],
    faqs: [
      faq('Qual é o fator de conversão de LCM para SCY?', 'Para provas semelhantes, usa-se o inverso de 1.11, junto com um ajuste para as voltas extras em uma piscina de 25 yards.'),
      faq('Por que um tempo de SCY é mais rápido?', 'Uma piscina de 25 yards tem mais paredes, e cada volta oferece uma vantagem de impulso que pode tornar o tempo total mais rápido.'),
    ],
  },
  'lcm-to-scm': {
    title: 'Conversor de LCM para SCM – Conversor de tempos de natação',
    description: 'Converta tempos de piscina longa em metros em tempos estimados de piscina curta em metros.',
    h1: 'Conversor de LCM para SCM',
    lead: 'Converta um tempo de uma piscina de 50 metros em um tempo estimado para uma piscina de 25 metros.',
    sections: [
      section('O que é uma conversão de LCM para SCM?', ['As distâncias são iguais, portanto a diferença vem das voltas adicionais disponíveis em uma piscina de 25 metros.']),
      section('Como funciona a estimativa', ['Um valor de segundos por volta específico do estilo é aplicado às paredes extras. Corridas mais longas mostram uma diferença maior.']),
    ],
    faqs: [
      faq('Como converto LCM para SCM?', 'Como as distâncias são idênticas, o conversor remove a vantagem de voltas do percurso mais longo usando valores de volta específicos de cada estilo.'),
      faq('A piscina curta é mais rápida que a longa?', 'Geralmente sim. Mais paredes em uma piscina de 25 metros oferecem mais impulsos e produzem tempos mais rápidos para o mesmo nadador e a mesma prova.'),
    ],
  },
  'scm-to-scy': {
    title: 'Conversor de SCM para SCY – Conversor de tempos de natação',
    description: 'Converta tempos de piscina curta em metros em tempos estimados de piscina curta em yards.',
    h1: 'Conversor de SCM para SCY',
    lead: 'Converta um tempo de uma piscina de 25 metros em um tempo estimado para uma piscina de 25 yards.',
    sections: [
      section('O que é uma conversão de SCM para SCY?', ['As duas piscinas são curtas e têm o mesmo número de voltas. A conversão escala principalmente a distância, porque uma yard é menor que um metro.']),
      section('Como funciona a estimativa', ['Use os pares padrão de 400 metros para 500 yards, 800 metros para 1000 yards e 1500 metros para 1650 yards. Os resultados são estimativas.']),
    ],
    faqs: [
      faq('Qual é o fator de conversão de SCM para SCY?', 'Para provas correspondentes, divida os segundos de SCM por 1.11, porque o número de voltas é o mesmo e apenas a distância do carril muda.'),
      faq('Tempos de SCM convertidos podem ser usados em competições nos EUA?', 'Algumas competições aceitam tempos convertidos, mas os organizadores podem usar regras próprias. Verifique primeiro as informações de inscrição da prova.'),
    ],
  },
  guides: {
    title: 'Guias – Conversor de tempos de natação',
    description: 'Guias passo a passo para conversão de tempos de natação, ritmo e parciais de prova.',
    h1: 'Guias do conversor de tempos de natação',
    lead: 'Tudo o que você precisa para comparar tempos entre piscinas, planejar ritmos e montar parciais de prova.',
    sections: [
      section('Como funcionam as conversões de tempos de natação', ['As provas em SCY são nadadas em 25 yards, as de SCM em 25 metros e as de LCM em 50 metros. Primeiro, identifique a prova; depois, escala a distância e, por fim, ajuste as voltas.', 'Nenhuma conversão é exata. Use os resultados para comparação e planejamento e siga as regras oficiais ao apresentar um tempo.']),
      section('Referência rápida', ['SCY para SCM: multiplique por 1.11 em provas semelhantes. SCM para LCM: some o tempo das voltas. Os pares de distância incluem 500 para 400, 1000 para 800 e 1650 para 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Calculadora de ritmo de natação', description: 'Transforme tempo total e distância em ritmos alvo.', tag: 'Calculadora' },
      { route: 'split-calculator', title: 'Calculadora de parciais de natação', description: 'Divida um tempo objetivo em parciais acumulados.', tag: 'Calculadora' },
      { route: 'css-calculator', title: 'Velocidade crítica de natação', description: 'Calcule o ritmo limiar e as zonas de treino.', tag: 'Calculadora' },
      { route: 'interval-calculator', title: 'Séries e saídas', description: 'Monte uma série a partir de repetições, distância e ritmo.', tag: 'Calculadora' },
      { route: 'scy-to-lcm', title: 'Conversão de SCY para LCM', description: 'Converta piscina curta em yards em piscina longa em metros.', tag: 'Conversão' },
      { route: 'scy-to-scm', title: 'Conversão de SCY para SCM', description: 'Converta a piscina curta dos EUA na internacional.', tag: 'Conversão' },
    ],
  },
  about: {
    title: 'Sobre – Conversor de tempos de natação',
    description: 'Sobre o Conversor de tempos de natação gratuito para tempos SCY, SCM e LCM.',
    h1: 'Sobre o Conversor de tempos de natação',
    lead: 'Uma ferramenta gratuita, rápida e que respeita sua privacidade para comparar performances de natação entre piscinas de competição.',
    sections: [
      section('Por que criamos esta ferramenta', ['Os nadadores precisam comparar tempos em yards e metros ao trocar de competição ou usar ferramentas de ritmo. Criamos uma página rápida que funciona em qualquer dispositivo e usa um método amplamente compreendido.', 'Tudo funciona no seu navegador. Seus tempos nunca saem do seu dispositivo.']),
      section('O método de conversão', ['A calculadora usa uma abordagem baseada em fatores, com ajustes documentados de piscina e por volta. Provas de nado livre de distância usam fatores próprios. Os resultados são estimativas próximas, não conversões oficiais.']),
      section('Limitações', ['Nenhuma conversão é exata. Voltas, respiração, altitude, ritmo e estilo de natação afetam o desempenho real. Use sempre as regras oficiais para inscrições em competições.']),
      section('Contato', ['Perguntas, correções ou sugestões são bem-vindas pela página de contato.']),
    ],
  },
  contact: {
    title: 'Contato – Conversor de tempos de natação',
    description: 'Fale com a equipe do Conversor de tempos de natação para enviar perguntas, comentários ou correções.',
    h1: 'Contato do Conversor de tempos de natação',
    lead: 'Encontrou um problema ou tem uma ideia de recurso? Envie uma mensagem para hello@onlineswimtimeconverter.com.',
    sections: [
      section('Entre em contato', ['Lemos todas as mensagens. Use o endereço de e-mail acima para perguntas, correções, sugestões de recursos e parcerias.']),
      section('Procurando uma ferramenta?', ['Use as calculadoras e os guias para comparar tempos, calcular ritmo e montar planos de prova.']),
    ],
  },
  'privacy-policy': {
    title: 'Política de privacidade – Conversor de tempos de natação',
    description: 'Política de privacidade das calculadoras do Conversor de tempos de natação baseadas no navegador.',
    h1: 'Política de privacidade',
    lead: 'Vigente desde janeiro de 2026. Esta política explica quais dados este site coleta e como são usados.',
    sections: [
      section('Privacidade desde o projeto', ['As calculadoras funcionam no seu navegador. Tempos e distâncias inseridos em uma calculadora não são transmitidos a um servidor.']),
      section('Armazenamento local e cookies', ['Seu navegador pode armazenar preferências como tema ou configurações das calculadoras. Este site usa armazenamento próprio mínimo e não vende informações pessoais.']),
      section('Dados e serviços automatizados', ['Provedores de hospedagem e análise podem processar informações técnicas de rotina para operar e melhorar o site.']),
      section('Seus direitos e crianças', ['Você pode solicitar acesso, correção ou exclusão de dados pessoais quando aplicável. O site destina-se ao público geral e não coleta conscientemente dados de crianças.']),
      section('Mudanças na política', ['Esta política pode ser atualizada conforme o site mudar. A versão atual é publicada nesta página.']),
    ],
  },
  terms: {
    title: 'Termos de serviço – Conversor de tempos de natação',
    description: 'Termos de serviço para as ferramentas gratuitas do Conversor de tempos de natação baseadas no navegador.',
    h1: 'Termos de serviço',
    lead: 'Vigente desde janeiro de 2026. Estes termos regem o uso de onlineswimtimeconverter.com.',
    sections: [
      section('Natureza do serviço', ['O site oferece estimativas gratuitas baseadas no navegador para tempos de natação, ritmo e parciais. As ferramentas são fornecidas como estão, sem garantias.']),
      section('Não é conselho esportivo oficial', ['Tempos convertidos são estimativas e não são oficiais nem certificados. Siga as regras da organização que aceitar tempos de competição.']),
      section('Uso aceitável e responsabilidade', ['Não use o site indevidamente, não o perturbe e não faça scraping. Não somos responsáveis por danos decorrentes do uso do serviço ou da confiança em suas estimativas.']),
      section('Propriedade intelectual e alterações', ['O design, o texto e a funcionalidade do site não podem ser reproduzidos comercialmente sem permissão. Estes termos podem mudar quando publicados.']),
    ],
  },
};
