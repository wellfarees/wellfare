/*

  CREDITS
    
    Algorithm and the core logic implemented by Roland @Wellfare
    For more, visit http://www.rolandfrd.com/
    
    Also big thanks to Sienna who helped creating the final texts as the main output of the algorithm.
    You can contact her via discord: sienna#1161

    Algorithm exclusively for Wellfare™


*/

interface EmojiSet {
  name: string;
  emojis: string[];
}

interface EnumeratedSets {
  [key: string]: number;
}

enum RecapTypes {
  MANIA = "mania",
  LOST = "lost",
  DEPRESSED = "depressed",
  DELIGHTED = "delighted",
  STRESSED = "stressed",
  DEFAULT = "default",
}

const EMOJI_SETS: EmojiSet[] = [
  {
    name: "hyper_happiness",
    emojis: ["🥰", "🤪"],
  },
  {
    name: "joy",
    emojis: ["😌", "😊"],
  },
  {
    name: "dangerous",
    emojis: ["😟", "😞"],
  },
  {
    name: "draining_sadness",
    emojis: ["😰", "😭"],
  },
  {
    name: "evil",
    emojis: ["😈", "😡"],
  },
  {
    name: "deranging",
    emojis: ["😖", "😨"],
  },
];

// Loops through the set of emojis and returns the set names that the provided emojis belong to
const retrieveEmojiSetsFromRecap = (recapEmojiList: string[]): string[] => {
  return recapEmojiList
    .map((emoji) => {
      return EMOJI_SETS.filter((set) => set.emojis.includes(emoji)).map(
        (set) => set.name
      );
    })
    .flat();
};

const processDuplicates = (arr: string[]): EnumeratedSets => {
  // TODO: Rewrite using functional approach, immutable fashion
  const counts: { [key: string]: number } = {};
  arr.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
};

// NOTE: At least 4 records a week for recap to be generated!
const calculateRecapType = (sets: EnumeratedSets): RecapTypes => {
  // NOTE: Max amount of sets is 7 (because 7 records a week)
  // Core logic of figuring out what the recap description will consist of
  // Predict prescribed set combinations and return one of the recap types

  const hasProvidedSets = (setTypes: EnumeratedSets): boolean => {
    return Object.keys(setTypes).every(
      (val) => Object.keys(sets).includes(val) && setTypes[val] === sets[val]
    );
  };

  const maniacalSets: EnumeratedSets = {
    hyper_happiness: 1,
    evil: 2,
    deranging: 1,
  };

  const lostKidSets: EnumeratedSets = {
    deranging: 2,
    draining_sadness: 1,
    dangerous: 1,
  };

  const extremelyDepressedSets: EnumeratedSets = {
    dangerous: 2,
    deranging: 2,
  };

  const extremelyHappySets: EnumeratedSets = {
    joy: 2,
    hyper_happiness: 2,
  };

  const simplyStressedOutSets: EnumeratedSets = {
    draining_sadness: 2,
    joy: 1,
    evil: 1,
  };

  // Return the type of the given recap
  if (hasProvidedSets(maniacalSets)) return RecapTypes.MANIA;
  else if (hasProvidedSets(lostKidSets)) return RecapTypes.LOST;
  else if (hasProvidedSets(extremelyDepressedSets)) return RecapTypes.DEPRESSED;
  else if (hasProvidedSets(extremelyHappySets)) return RecapTypes.DELIGHTED;
  else if (hasProvidedSets(simplyStressedOutSets)) return RecapTypes.STRESSED;
  else return RecapTypes.DEFAULT;
};

// NOTE: Assumes there's always an enclosing '**' for the bold text
const parseRecapTextToHTML = (initialRecap: string): string => {
  const splitIntoParagraphs = initialRecap
    .split("\n")
    .map((paragraph) => {
      return `<p>${paragraph}</p>`;
    })
    .join("");

  const parseAsterisks = (recap: string): string => {
    const regex = /(\*\*)/g;
    let matchResult;

    const initialMatches = initialRecap.match(regex);
    if (!initialMatches) return recap;

    while ((matchResult = regex.exec(recap))) {
      const currentMatches = recap.match(regex)!;
      const needsToBeClosed =
        (initialMatches?.length - currentMatches?.length) % 2 !== 0;

      const replaced =
        recap.substring(0, matchResult.index) +
        `<${needsToBeClosed ? "/" : ""}b>` +
        recap.substring(matchResult.index + 2);

      return parseAsterisks(replaced);
    }

    return recap;
  };

  return parseAsterisks(splitIntoParagraphs);
};

// TODO: Finish recap texts
const generateRecapFromGivenType = (
  type: RecapTypes,
  usedDefaultIndex: number | null
): { index: number | null; recap: string } => {
  const defaults = [
    "Your mood varies throughout the week, and you are unable to be placed under a direct category. You may have been anxious, frustrated, ecstatic, and/or stressed.\nContinue journalizing on **Wellfare™** to express your emotions thoroughly, as we are here to help you track your mood.\nIt is highly recommended to create a schedule to maintain your daily life, starting from when you wake up to when you go to sleep.\nRemember to drink water daily, get fresh air, and have a good sleep, your body will thank you in the future, and exercise at a moderate level to keep both your mentality and physicality healthy.",

    "You have experienced both **highs and lows this week**, and you have had different methods of cope. Whether it has been tackling the situation by yourself, seeking help and refuge with others, or simply ignoring it all together, it has caused you to have a mixed array of emotions.\nA combination to which we cannot distinguish into certain categories.\nFor these, no direct advice can be given, however general advice such as managing your time and emotions can. Do not overestimate your abilities, nor should you underestimate them. Work at a moderate pace to reduce stress and anxiety.",

    "There isn't a specific type of mood that you could relate to, since both positive and negative emotions have been present in your life lately.\n Keep journalizing your feelings and thus developing **mindfulness and self-awareness** which are the qualities that are incredibly useful to keep oneself in a positive tone in this hectic society. Don't forget that you're never alone in this world and there will always be someone you can rely on or talk your heart out with.",
  ];

  const staticDefaultsIndex = usedDefaultIndex;

  // uses recursion to regenerate index if it's already been used (provided in parent's function argument)
  const generateDifferentRandomIndex = (
    usedDefaultIndex: number | null
  ): number => {
    if (usedDefaultIndex === null)
      // if the provided default index is not set (is null), return a completely random index (in range)
      return Math.floor(Math.random() * defaults.length);
    else if (
      // if the randomly generated index is different from the one that's provided, return it
      typeof usedDefaultIndex === "number" &&
      usedDefaultIndex !== staticDefaultsIndex
    ) {
      return usedDefaultIndex;
    } else {
      // make another recursive call and generate a random index again (maybe it'll be different this time?)
      return generateDifferentRandomIndex(
        Math.floor(Math.random() * defaults.length)
      );
    }
  };

  let indexUsed = usedDefaultIndex;
  let recap = "";

  switch (type) {
    case RecapTypes.MANIA:
      recap = `This week must have been really emotionally exhausting. You've been experiencing ups and downs, mostly the latter though\n
Your thoughts might have been entering and leaving your mind more rapidly than usual. You've been more sleep deprived and possibly been having more desire for sex in any shape or form.\nIf this is true about you, you might be going through **period of mania**. If not, there's just a whole lot that is going on in your life and that's completely normal.`;
      break;
    case RecapTypes.LOST:
      recap =
        "Lately throughout the week, you've been feeling quite overwhelmed and frustrated, causing you to feel quite lost and hopeless.\nYou haven't been acting like yourself and you're scared of what you can do, so you have been emotionally distancing yourself slightly from people, anxious of people's thoughts and opinions.\nIf your emotions relate to this, you may be experiencing **loneliness and fatigue of society**. Try to take a step back and assess the situation, to which you should then slowly connect with society once more.";
      break;
    case RecapTypes.DEPRESSED:
      recap =
        "Your thoughts throughout the week has been abnormal as you and others around you are wary of what you can do.\nYou have been experiencing more low points than highs this week, and although you are **overwhelmed and full of anxiety**, you are too fatigued to try to make an effort of change.\nTake a moment to surround yourself with the good things and people in your life, and focus on creating new hobbies. Express your interest in new things.";
      break;
    case RecapTypes.DELIGHTED:
      recap =
        "It's great! Throughout the week you've been quite happy, which is spectacular to see! Your mood has constantly been joyful as you have experienced pleasurable moments this week.\nYou've been feeling **loved, special, and quite crazy** in the best way possible. Watch yourself, however, not to overwork yourself while feeling too motivated in the moment.\nIf your emotions relate to this, this week you have been quite joyful but do not overestimate your ability to cope.\nTo maintain this, create new hobbies and challenges that you'll enjoy and find pleasure in.";
      break;
    case RecapTypes.STRESSED:
      recap =
        "Unfortunately, throughout the week you have been both emotionally and physically overwhelmed. With the obsession of not knowing how other's think about you, you have been **feeling quite lonely** as it seems you have been trying to overcome your challenges by yourself.\nYou have been happy a few times, which is good, however your mood has dropped drastically afterward.\nUnable to handle all the emotions and challenges that have been thrown at you, you often say or do things that you would not normally do.\nIf you are related to this, you have been yielding to the pressure of psychological stress. Often take a break and don't overwork yourself. Slowly pace yourself to manage each task individually.";
      break;
    default:
      const randomIndex = generateDifferentRandomIndex(usedDefaultIndex || 0);
      indexUsed = randomIndex;
      recap = defaults[randomIndex];
      break;
  }
  return { index: indexUsed, recap };
};

// End function that you can use to get a recap description!
// If array consists of at least 4 elements (emojis, thus records during that week) returns generated recap text, otherwise null
export const generateRecapFromEmojis = (
  emojisArr: string[],
  lastDefaultRecapIndex: number | null
): { indexUsed: number | null; recap: string | null } => {
  if (emojisArr.length < 4) return { indexUsed: null, recap: null };

  const sets = retrieveEmojiSetsFromRecap(emojisArr);
  const enumeratedSets = processDuplicates(sets);
  const recapType = calculateRecapType(enumeratedSets);
  const { index, recap } = generateRecapFromGivenType(
    recapType,
    lastDefaultRecapIndex
  );
  const parsedRecap = parseRecapTextToHTML(recap);

  return { indexUsed: index, recap: parsedRecap };
};

// example call
const recap = generateRecapFromEmojis(["😟", "😞", "😖", "😨"], 0); // will return one of the written texts and the index that was used
