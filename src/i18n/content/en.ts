import type { PageCatalog } from './types';

const faq = (question: string, answer: string) => ({ question, answer });
const section = (heading: string, paragraphs: string[] = [], bullets?: string[], steps?: string[]) => ({ heading, paragraphs, bullets, steps });

export const englishPages: PageCatalog = {
  home: {
    title: 'Swim Time Converter: SCY, SCM & LCM Calculator',
    description: 'Convert swimming times between SCY, SCM and LCM, plus yards to meters. Free swim time calculator for international swimmers.',
    h1: 'Swim Time Converter',
    lead: 'Convert swimming times between SCY, SCM and LCM courses, with yards-to-meters conversions included.',
    eyebrow: 'Free swimming calculator',
    sections: [
      section('Related swim calculators', ['Compare pace, splits, critical swim speed, intervals, speed, calories and pool lengths with tools built for swimmers.']),
      section('Course converters', ['Choose a course pairing to convert a swim time between a 25-yard pool, a 25-meter pool and a 50-meter pool.']),
      section('SCY vs SCM vs LCM', ['Pool length changes the number of turns and the distance covered. SCY uses 25 yards, SCM uses 25 meters and LCM uses 50 meters.']),
      section('How does a swim time converter work?', ['The converter applies a documented course factor and a per-turn adjustment. Colorado factors are used by many age-group and Masters programs.', 'All conversion results are estimates because every swimmer gains a different amount from turns and walls.']),
      section('How to use this converter', ['Choose the course and event, enter your time, and read the equivalent time in every course.']),
      section('Why use the swim time converter?', ['A free, private browser tool for comparing results, setting qualifying goals, planning training paces and converting yards to meters without installing software.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Swim Pace Calculator', description: 'Find target pace per 25, 50, 100, 200 or 400.' },
      { route: 'split-calculator', title: 'Swim Split Calculator', description: 'Generate even cumulative splits for any race distance.' },
      { route: 'css-calculator', title: 'Critical Swim Speed (CSS)', description: 'Calculate threshold pace and training zones from a 400 + 200 test.' },
      { route: 'interval-calculator', title: 'Interval & Send-off', description: 'Build a training set with repeats, pace and send-offs.' },
      { route: 'speed-calculator', title: 'Speed & Race Projection', description: 'Convert pace to m/s, km/h and projected race times.' },
      { route: 'calories-calculator', title: 'Swimming Calories', description: 'Estimate calories by stroke, intensity, weight and time.' },
      { route: 'lengths-converter', title: 'Lengths & Distance', description: 'Convert pool distances and lengths for 25 yd, 25 m and 50 m pools.' },
    ],
    courses: [
      { code: 'SCY', name: 'Short Course Yards', length: '25 yards', usage: 'U.S. high school, NCAA and club competition' },
      { code: 'SCM', name: 'Short Course Meters', length: '25 meters', usage: 'International short-course competition' },
      { code: 'LCM', name: 'Long Course Meters', length: '50 meters', usage: 'Olympic Games and World Championships' },
    ],
    faqs: [
      faq('What is a swim time converter?', 'It estimates how a time in one pool course compares with an equivalent time in another course. The same effort can produce different finish times because pool length changes turns.'),
      faq('What are SCY, SCM and LCM?', 'SCY is a 25-yard pool, SCM is a 25-meter pool and LCM is a 50-meter pool. These are the three standard competition course lengths.'),
      faq('How do I convert SCY to LCM?', 'Select SCY as the source course, choose the event and time, then select LCM as the target. The converter applies a course factor and a per-turn adjustment.'),
      faq('Are swimming time conversions exact?', 'No. Turns, walls, breathing and pacing vary by swimmer, so every conversion is an estimate. Treat results as close approximations rather than official times.'),
      faq('Is the swim time converter free and private?', 'Yes. It runs entirely in your browser, has unlimited conversions and does not send entered times to a server.'),
    ],
  },
  'pace-calculator': {
    title: 'Swim Pace Calculator – Swim Time Converter',
    description: 'Calculate swimming pace per 100, 200, 400 or any distance from total time and distance.',
    h1: 'Swim Pace Calculator',
    lead: 'Work out your pace per 25, 50, 100, 200 or 400 in yards or meters from a total time and distance.',
    sections: [
      section('How to use the pace calculator', [], ['Enter the total distance and choose yards or meters.', 'Enter the total time.', 'Choose a pace interval such as 100, 200, 400 or a custom distance.', 'Calculate and use the result to plan an even set.'], ['Enter the total distance and choose yards or meters.', 'Enter the total time.', 'Choose a pace interval such as 100, 200, 400 or a custom distance.', 'Calculate and use the result to plan an even set.']),
      section('Common pace targets', ['Pace is the time needed to cover one interval. Coaches use send-offs to keep training sets consistent.']),
      section('Why use the swim pace calculator?', ['Convert a measured total time into the seconds per 100 that coaches use on a pace clock. Choose meters for a 100 m pace or yards for a 100 yd pace.']),
    ],
    faqs: [
      faq('How do you calculate a swim pace?', 'Divide total seconds by total distance and multiply by the pace interval. For example, 6:05 over 500 m is 73 seconds per 100 m.'),
      faq('What is a good 100-meter pace?', 'It depends on the event and level. Use this calculator to break a target time into realistic splits rather than relying on a single average.'),
      faq('Should I even-split my race?', 'Most distance swimmers aim for nearly even splits. A small positive slide at the end is normal, so plan even and adjust from your race data.'),
    ],
  },
  'split-calculator': {
    title: 'Swim Split Calculator – Swim Time Converter',
    description: 'Generate even swim splits for any race distance and see cumulative split times for every 25, 50 or 100.',
    h1: 'Swim Split Calculator',
    lead: 'Break a swim race into even target splits and read cumulative times at every 50 or 100.',
    sections: [
      section('How to use the split calculator', [], ['Choose a race distance and unit.', 'Enter the goal time.', 'Choose a split length of 25, 50 or 100.', 'Read cumulative clock times and the pace behind each split.'], ['Choose a race distance and unit.', 'Enter the goal time.', 'Choose a split length of 25, 50 or 100.', 'Read cumulative clock times and the pace behind each split.']),
      section('Race pacing guide', ['Plan a quick but controlled first length, then hold an even speed. A positive slide in the final lengths is normal for distance races.']),
      section('Why use the swim split calculator?', ['A finish time shows how fast you went; splits show how. Use cumulative targets to make a race plan repeatable in training.']),
    ],
    faqs: [
      faq('What are swim splits?', 'Splits are the times for each segment of a race, usually every 50 or 100. They let a swimmer compare pace during the race instead of only seeing the final time.'),
      faq('Should every split be exactly even?', 'Most distance swimmers plan nearly even splits and may slow slightly at the end. Train the rhythm you want to execute.'),
      faq('How do I use splits in training?', 'Enter a target race time, practice each interval on send-off and compare cumulative times at every turn.'),
    ],
  },
  'css-calculator': {
    title: 'CSS Calculator – Critical Swim Speed',
    description: 'Find Critical Swim Speed from a 400 + 200 test and get CSS pace, training zones and projected times.',
    h1: 'Critical Swim Speed (CSS) Calculator',
    lead: 'Swim a hard 400 and a fast 200 to estimate threshold pace, five training zones and projected race times.',
    sections: [
      section('How to run the test', [], ['Warm up thoroughly.', 'Swim an all-out 400.', 'Recover for 3–5 minutes and swim an all-out 200.', 'Enter both times to calculate CSS.'], ['Warm up thoroughly.', 'Swim an all-out 400.', 'Recover for 3–5 minutes and swim an all-out 200.', 'Enter both times to calculate CSS.']),
      section('Understanding your zones', ['Use recovery and aerobic paces for easy work, tempo for controlled pace, threshold for CSS sets and Zone 5 for short high-quality repeats.']),
      section('Why use the Critical Swim Speed calculator?', ['Two all-out swims provide a repeatable threshold pace and a practical system for training zones and race projections.']),
    ],
    faqs: [
      faq('What is Critical Swim Speed (CSS)?', 'CSS is the fastest pace you can hold with controlled fatigue. It is estimated from a long 400 and short 200 test.'),
      faq('How often should I retest CSS?', 'Retest every four to six weeks or at the start of a new training block, especially after an aerobic improvement.'),
      faq('Is CSS the same as race pace?', 'Not exactly. A 400 can be slightly faster than CSS, while a 1500 or mile usually settles close to CSS pace.'),
    ],
  },
  'interval-calculator': {
    title: 'Swim Interval & Send-off Calculator',
    description: 'Build swim training sets with repeats, distance and pace, then calculate repeat times and send-offs.',
    h1: 'Swim Interval & Send-off Calculator',
    lead: 'Turn a target pace into a complete training set with repeat times, send-offs, totals and wall-clock leave times.',
    sections: [
      section('How to use the set builder', [], ['Enter repeats and distance per repeat.', 'Set your pace per 100.', 'Choose fixed rest or a fixed send-off.', 'Read repeat time, totals and leave times.'], ['Enter repeats and distance per repeat.', 'Set your pace per 100.', 'Choose fixed rest or a fixed send-off.', 'Read repeat time, totals and leave times.']),
      section('Classic sets to try', ['Try a CSS set, an aerobic 20 × 50 set, a mid-distance 6 × 200 set or a descending ladder.']),
      section('Why use the interval calculator?', ['It removes the arithmetic from sets such as 8 × 100 on 1:30 and produces a pace-clock plan you can follow at the wall.']),
    ],
    faqs: [
      faq('What is a swim send-off?', 'A send-off is the fixed interval at which you leave the wall for each repeat. The difference between send-off and repeat time is your rest.'),
      faq('Should I build sets around a send-off or rest?', 'Both are used. A fixed send-off makes pacing consistent; fixed rest keeps the work-to-rest relationship visible as fatigue changes the repeat time.'),
      faq('What rest should I take between repeats?', 'Speed sets often use 20–30 seconds or more, while threshold and CSS sets commonly use 10–15 seconds.'),
    ],
  },
  'speed-calculator': {
    title: 'Swim Speed & Race Projection Calculator',
    description: 'Convert swim time and distance into pace per 100m or 100yd, speed and projected race times.',
    h1: 'Swim Speed & Race Projection Calculator',
    lead: 'Enter one benchmark time and distance to see pace, speed and projected times from 200 to the mile.',
    sections: [
      section('How to use it', [], ['Choose a benchmark swim.', 'Select meters or yards and enter the time.', 'Read pace per 100, speed and projected race times.', 'Use a projection to choose a training pace.'], ['Choose a benchmark swim.', 'Select meters or yards and enter the time.', 'Read pace per 100, speed and projected race times.', 'Use a projection to choose a training pace.']),
      section('Benchmarks worth knowing', ['The 400 is a classic CSS test distance. The 1500 and 1650 are common pool-mile races, while 1760 yards is the true mile.']),
      section('Why use the speed calculator?', ['Pace describes a training interval and speed describes the effort you produce. This tool shows both in the units coaches and swimmers use.']),
    ],
    faqs: [
      faq('Why does pace per 100 yd differ from pace per 100 m?', 'A yard is shorter than a meter, so 100 yards covers less distance than 100 meters at the same speed.'),
      faq('How reliable are projected race times?', 'They assume the benchmark speed holds for the full distance. Use them as a starting target and adjust for pacing, drafting and conditions.'),
      faq('What is a pool mile?', 'Competitive swimmers often call 1500 meters or 1650 yards a mile. The true mile is 1760 yards, or about 1609 meters.'),
    ],
  },
  'calories-calculator': {
    title: 'Swimming Calories Calculator',
    description: 'Estimate calories burned swimming by stroke, intensity, body weight and duration.',
    h1: 'Swimming Calories Calculator',
    lead: 'Estimate calories burned from your weight, stroke, intensity and time in the water.',
    sections: [
      section('How to use it', [], ['Enter body weight.', 'Choose the stroke.', 'Choose light, moderate or vigorous intensity.', 'Enter duration and read the estimate and hourly rate.'], ['Enter body weight.', 'Choose the stroke.', 'Choose light, moderate or vigorous intensity.', 'Enter duration and read the estimate and hourly rate.']),
      section('Why the strokes differ', ['Butterfly generally requires the most effort, while treading water is the lowest-effort option. Intensity can matter as much as the stroke.']),
      section('Why use the swimming calories calculator?', ['The estimate combines weight, stroke, intensity and duration using standard MET values, giving a more useful planning number than a generic average.']),
    ],
    faqs: [
      faq('How accurate are swimming calorie estimates?', 'They are estimates based on MET values, body weight and duration. Technique, pool temperature and individual metabolism affect the result.'),
      faq('How many calories does swimming burn in an hour?', 'The answer depends on stroke and intensity. A 70 kg swimmer may burn roughly 400–700 kcal per hour in typical training.'),
      faq('Should I eat back calories burned swimming?', 'For most swimmers, eating normally is appropriate. Use the estimate as a guide, not as a precise nutrition prescription.'),
    ],
  },
  'lengths-converter': {
    title: 'Swim Distance Converter – Yards to Meters & Pool Lengths',
    description: 'Convert swim distances: yards to meters, meters to yards and distances to pool lengths.',
    h1: 'Swim Distance & Lengths Converter',
    lead: 'Convert yards to meters or meters to yards, then see how many lengths a distance represents in a 25-yard, 25-meter or 50-meter pool.',
    sections: [
      section('How to use it', [], ['Choose yards and meters or distance and lengths.', 'Enter a distance or number of lengths.', 'Use quick presets for common swim distances.', 'Read the full lengths, remainder or equivalent distance.'], ['Choose yards and meters or distance and lengths.', 'Enter a distance or number of lengths.', 'Use quick presets for common swim distances.', 'Read the full lengths, remainder or equivalent distance.']),
      section('Yards to meters quick reference', ['25 yards equals 22.86 meters, 50 yards equals 45.72 meters and 1650 yards equals 1508.76 meters. In the other direction, 25 meters equals 27.34 yards and 1500 meters equals 1640.42 yards.']),
      section('Why use the lengths converter?', ['Pool distance questions affect training plans. Convert exact distances and count lengths for 25-yard, 25-meter and 50-meter pools.']),
    ],
    faqs: [
      faq('How do I convert 25 yards to meters?', 'Multiply yards by 0.9144: 25 yards equals 22.86 meters, the length of a short-course yards pool.'),
      faq('What is 50 yards in meters?', '50 yards equals 45.72 meters. Other common conversions include 100 yards = 91.44 meters and 1650 yards = 1508.76 meters.'),
      faq('How many lengths is a 1500-meter swim?', 'It is 60 lengths in a 25-meter pool and 30 lengths in a 50-meter pool. A 1650-yard swim is 66 lengths in a 25-yard pool.'),
    ],
  },
  'scy-to-lcm': {
    title: 'SCY to LCM Converter – Swim Time Converter',
    description: 'Convert SCY swim times to LCM using a documented swimming conversion method.',
    h1: 'SCY to LCM Converter',
    lead: 'Convert a short-course yards time into an estimated long-course meters time.',
    sections: [
      section('What is an SCY to LCM conversion?', ['A 25-yard pool and a 50-meter pool change the distance and number of turns. The converter scales the time and adds a per-turn adjustment for the larger pool.']),
      section('How the estimate works', ['Distance freestyle events use their usual pairings: 500 Free to 400 Free, 1000 Free to 800 Free and 1650 Free to 1500 Free. Every result is an estimate.']),
    ],
    faqs: [
      faq('What is the SCY to LCM conversion factor?', 'The base yard-to-meter factor is 1.11, with event-specific distance and turn adjustments. Long-distance freestyle uses separate pairing factors.'),
      faq('Why are LCM times slower?', 'A 50-meter pool has fewer turns than a 25-yard pool. The short-course swimmer receives more wall push-offs, so the same effort can be faster in yards.'),
    ],
  },
  'scy-to-scm': {
    title: 'SCY to SCM Converter – Swim Time Converter',
    description: 'Convert SCY swim times to SCM short-course meters.',
    h1: 'SCY to SCM Converter',
    lead: 'Convert a 25-yard pool time into an estimated 25-meter pool time.',
    sections: [
      section('What is an SCY to SCM conversion?', ['SCY and SCM both use 25-length pools, so the number of turns is the same. The main change is that a meter is longer than a yard.']),
      section('How the estimate works', ['The standard factor is 1.11 for similar events. Distance freestyle uses separate pairings for 500 to 400, 1000 to 800 and 1650 to 1500.']),
    ],
    faqs: [
      faq('What is the SCY to SCM conversion factor?', 'For similar events, multiply short-course yard seconds by 1.11 because a 25-yard lane is shorter than a 25-meter lane.'),
      faq('Is 500 yards the same as 400 or 500 meters?', 'A 500-yard freestyle corresponds to the 400-meter freestyle in international short-course competition.'),
    ],
  },
  'scm-to-lcm': {
    title: 'SCM to LCM Converter – Swim Time Converter',
    description: 'Convert short-course meter times to estimated long-course meter times.',
    h1: 'SCM to LCM Converter',
    lead: 'Convert a 25-meter pool time into an estimated 50-meter pool time.',
    sections: [
      section('What is an SCM to LCM conversion?', ['SCM and LCM use the same metric distances, but a 25-meter pool has more than twice as many turns as a 50-meter pool. The estimate adjusts for those extra turns.']),
      section('How the estimate works', ['Stroke-specific seconds-per-turn values account for the difference. The same logic applies to 400, 800 and 1500 freestyle events.']),
    ],
    faqs: [
      faq('How do I convert SCM to LCM?', 'Distances match, so the converter adds the estimated time difference caused by the extra turns in a 25-meter pool.'),
      faq('How much faster is SCM than LCM?', 'Sprint events may gain a few tenths, while 200s and longer races can gain a second or more because they contain more turns.'),
    ],
  },
  'lcm-to-scy': {
    title: 'LCM to SCY Converter – Swim Time Converter',
    description: 'Convert long-course meter times to estimated short-course yard times.',
    h1: 'LCM to SCY Converter',
    lead: 'Convert a 50-meter pool time into an estimated 25-yard pool time.',
    sections: [
      section('What is an LCM to SCY conversion?', ['A 50-meter race has fewer turns, so the reverse conversion removes the turn advantage and scales meters down to yards.']),
      section('How the estimate works', ['Distance freestyle pairs 400 meters to 500 yards, 800 meters to 1000 yards and 1500 meters to 1650 yards. All converted times are estimates.']),
    ],
    faqs: [
      faq('What is the LCM to SCY conversion factor?', 'The reverse of 1.11 is used for similar events, together with an adjustment for the extra turns in a 25-yard pool.'),
      faq('Why is an SCY time faster?', 'A 25-yard pool has more walls, and every turn provides a push-off advantage that can make the overall time faster.'),
    ],
  },
  'lcm-to-scm': {
    title: 'LCM to SCM Converter – Swim Time Converter',
    description: 'Convert long-course meter times to estimated short-course meter times.',
    h1: 'LCM to SCM Converter',
    lead: 'Convert a 50-meter pool time into an estimated 25-meter pool time.',
    sections: [
      section('What is an LCM to SCM conversion?', ['The distances are the same, so the difference comes from the additional turns available in a 25-meter pool.']),
      section('How the estimate works', ['A stroke-specific seconds-per-turn value is applied across the extra walls. Longer races show a larger difference.']),
    ],
    faqs: [
      faq('How do I convert LCM to SCM?', 'Because the distances are identical, the converter removes the turn advantage of the longer course using stroke-specific turn values.'),
      faq('Is short course faster than long course?', 'Usually yes. More walls in a 25-meter pool provide more push-offs, producing faster times for the same swimmer and event.'),
    ],
  },
  'scm-to-scy': {
    title: 'SCM to SCY Converter – Swim Time Converter',
    description: 'Convert short-course meter times to estimated short-course yard times.',
    h1: 'SCM to SCY Converter',
    lead: 'Convert a 25-meter pool time into an estimated 25-yard pool time.',
    sections: [
      section('What is an SCM to SCY conversion?', ['Both pools are short course and have the same number of turns. The conversion mainly scales the distance because a yard is shorter than a meter.']),
      section('How the estimate works', ['Use the standard pairings 400 meters to 500 yards, 800 meters to 1000 yards and 1500 meters to 1650 yards. Results are estimates.']),
    ],
    faqs: [
      faq('What is the SCM to SCY conversion factor?', 'For matching events, divide SCM seconds by 1.11 because the number of turns is the same and only lane distance changes.'),
      faq('Can converted SCM times be used for U.S. meets?', 'Some meets accept converted times, but organizers may use their own rules. Check the event entry information first.'),
    ],
  },
  guides: {
    title: 'Guides – Swim Time Converter',
    description: 'Step-by-step guides for swimming time conversion, pace and race splits.',
    h1: 'Swim Time Converter Guides',
    lead: 'Everything you need to compare swimming times across courses, plan paces and build race splits.',
    sections: [
      section('How swim time conversions work', ['SCY is swum in 25 yards, SCM in 25 meters and LCM in 50 meters. Match events first, scale the distance and then adjust for turns.', 'No conversion is exact. Use results for comparison and planning, and follow official rules when submitting a time.']),
      section('Quick reference', ['SCY to SCM: multiply by 1.11 for similar events. SCM to LCM: add turn time. Distance pairings include 500 to 400, 1000 to 800 and 1650 to 1500.']),
    ],
    tools: [
      { route: 'pace-calculator', title: 'Swim Pace Calculator', description: 'Turn total time and distance into target paces.', tag: 'Calculator' },
      { route: 'split-calculator', title: 'Swim Split Calculator', description: 'Break a goal time into cumulative splits.', tag: 'Calculator' },
      { route: 'css-calculator', title: 'Critical Swim Speed', description: 'Calculate threshold pace and training zones.', tag: 'Calculator' },
      { route: 'interval-calculator', title: 'Interval & Send-off', description: 'Build a set from repeats, distance and pace.', tag: 'Calculator' },
      { route: 'scy-to-lcm', title: 'SCY to LCM Conversion', description: 'Convert short-course yards to long-course meters.', tag: 'Conversion' },
      { route: 'scy-to-scm', title: 'SCY to SCM Conversion', description: 'Convert U.S. short course to international short course.', tag: 'Conversion' },
    ],
  },
  about: {
    title: 'About – Swim Time Converter',
    description: 'About the free Swim Time Converter for SCY, SCM and LCM times.',
    h1: 'About Swim Time Converter',
    lead: 'A free, fast and privacy-friendly tool for comparing swimming performances across competition pool courses.',
    sections: [
      section('Why we built it', ['Swimmers need to compare times between yards and meters when moving between meets or using pace tools. We built one fast page that works on any device and uses a widely understood method.', 'Everything runs in your browser. Your times never leave your device.']),
      section('The conversion method', ['The calculator uses a factor-based approach with documented course and per-turn adjustments. Distance freestyle events use their own factors. Results are close estimates, not official conversions.']),
      section('Limitations', ['No conversion is exact. Turns, breathing, altitude, pacing and stroke style affect real performance. Always use official rules for competition entries.']),
      section('Contact', ['Questions, corrections or suggestions are welcome through the contact page.']),
    ],
  },
  contact: {
    title: 'Contact – Swim Time Converter',
    description: 'Contact the Swim Time Converter team with questions, feedback or corrections.',
    h1: 'Contact Swim Time Converter',
    lead: 'Found a problem or have a feature idea? Send a message to hello@onlineswimtimeconverter.com.',
    sections: [
      section('Get in touch', ['We read every message. Use the email address above for questions, corrections, feature suggestions and partnerships.']),
      section('Looking for a tool?', ['Use the calculators and guides to compare times, calculate pace and build race plans.']),
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy – Swim Time Converter',
    description: 'Privacy policy for the browser-based Swim Time Converter calculators.',
    h1: 'Privacy Policy',
    lead: 'Effective January 2026. This policy explains what data this site collects and how it is used.',
    sections: [
      section('Privacy-first by design', ['Calculators run in your browser. Times and distances entered into a calculator are not transmitted to a server.']),
      section('Local storage and cookies', ['Your browser may store preferences such as theme or calculator settings. This site uses minimal first-party storage and does not sell personal information.']),
      section('Automated data and services', ['Hosting and analytics providers may process routine technical information to operate and improve the site.']),
      section('Your rights and children', ['You may request access, correction or deletion of personal data where applicable. The site is intended for general audiences and does not knowingly collect children’s data.']),
      section('Policy changes', ['This policy may be updated as the site changes. The current version is posted on this page.']),
    ],
  },
  terms: {
    title: 'Terms of Service – Swim Time Converter',
    description: 'Terms of service for the free browser-based Swim Time Converter tools.',
    h1: 'Terms of Service',
    lead: 'Effective January 2026. These terms govern your use of onlineswimtimeconverter.com.',
    sections: [
      section('Nature of the service', ['The site provides free browser-based estimates for swimming times, pace and splits. Tools are provided as available without warranties.']),
      section('No official sports advice', ['Converted times are estimates and are not official or certified. Follow the rules of the organization that accepts competition times.']),
      section('Acceptable use and liability', ['Do not misuse, disrupt or scrape the site. We are not liable for damages arising from use of the service or reliance on its estimates.']),
      section('Intellectual property and changes', ['The site design, text and functionality may not be reproduced commercially without permission. These terms may change when posted.']),
    ],
  },
};
