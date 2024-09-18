const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const wordsData = [
    {
      word: "serendipity",
      meaning:
        "the occurrence and development of events by chance in a happy or beneficial way",
      pronunciation: "ˌserənˈdipədē",
      example: "A fortunate stroke of serendipity.",
      definition:
        "the occurrence and development of events by chance in a happy or beneficial way.",
      partOfSpeech: "noun",
      exampleText: "Finding the perfect gift by pure serendipity.",
      source: "Example Source",
      audioPath: "/path/to/audio/serendipity.mp3",
      dialect: "American",
      ipaText: "ˌserənˈdipədē",
    },
    {
      word: "ephemeral",
      meaning: "lasting for a very short time",
      pronunciation: "ɪˈfɛmərəl",
      example: "Fame in the world of rock and pop is largely ephemeral.",
      definition: "lasting for a very short time.",
      partOfSpeech: "adjective",
      exampleText: "The beauty of the sunset was ephemeral.",
      source: "Example Source",
      audioPath: "/path/to/audio/ephemeral.mp3",
      dialect: "British",
      ipaText: "ɪˈfɛmərəl",
    },
    {
      word: "ubiquitous",
      meaning: "present, appearing, or found everywhere",
      pronunciation: "yo͞oˈbikwədəs",
      example: "His ubiquitous influence was felt by all the family.",
      definition: "present, appearing, or found everywhere.",
      partOfSpeech: "adjective",
      exampleText: "The ubiquitous nature of the internet.",
      source: "Example Source",
      audioPath: "/path/to/audio/ubiquitous.mp3",
      dialect: "American",
      ipaText: "yo͞oˈbikwədəs",
    },
    {
      word: "beatitude",
      meaning: "supreme blessedness",
      pronunciation: "bēˈatiˌt(y)o͞od",
      example: "The expression of beatitude on her face.",
      definition: "supreme blessedness.",
      partOfSpeech: "noun",
      exampleText: "The beatitude of the moment.",
      source: "Example Source",
      audioPath: "/path/to/audio/beatitude.mp3",
      dialect: "American",
      ipaText: "bēˈatiˌt(y)o͞od",
    },
    {
      word: "cynosure",
      meaning:
        "a person or thing that is the center of attention or admiration",
      pronunciation: "ˈsīnəˌSHo͝or",
      example: "The Eiffel Tower is the cynosure of Paris.",
      definition:
        "a person or thing that is the center of attention or admiration.",
      partOfSpeech: "noun",
      exampleText: "The cynosure of all eyes.",
      source: "Example Source",
      audioPath: "/path/to/audio/cynosure.mp3",
      dialect: "American",
      ipaText: "ˈsīnəˌSHo͝or",
    },
    {
      word: "limerence",
      meaning: "the state of being infatuated or obsessed with another person",
      pronunciation: "ˈlimərəns",
      example:
        "Limerence is a state of mind which results from a romantic attraction to another person combined with an overwhelming, obsessive need to have one's feelings reciprocated.",
      definition:
        "the state of being infatuated or obsessed with another person.",
      partOfSpeech: "noun",
      exampleText: "The limerence of a new romance.",
      source: "Example Source",
      audioPath: "/path/to/audio/limerence.mp3",
      dialect: "American",
      ipaText: "ˈlimərəns",
    },
    {
      word: "lackadaisical",
      meaning: "lacking enthusiasm and determination; carelessly lazy",
      pronunciation: "ˌlakəˈdāzik(ə)l",
      example: "A lackadaisical defense left the team vulnerable to attack.",
      definition: "lacking enthusiasm and determination; carelessly lazy.",
      partOfSpeech: "adjective",
      exampleText: "A lackadaisical attitude to work.",
      source: "Example Source",
      audioPath: "/path/to/audio/lackadaisical.mp3",
      dialect: "American",
      ipaText: "ˌlakəˈdāzik(ə)l",
    },
    {
      word: "ambiguous",
      meaning: "open to more than one interpretation; having a double meaning",
      pronunciation: "amˈbiɡyo͞oəs",
      example: "The question is rather ambiguous.",
      definition:
        "open to more than one interpretation; having a double meaning.",
      partOfSpeech: "adjective",
      exampleText: "The ambiguous nature of the question.",
      source: "Example Source",
      audioPath: "/path/to/audio/ambiguous.mp3",
      dialect: "American",
      ipaText: "amˈbiɡyo͞oəs",
    },
    {
      word: "bucolic",
      meaning:
        "relating to the pleasant aspects of the countryside and country life",
      pronunciation: "byo͞oˈkälik",
      example: "The church is lovely for its bucolic setting.",
      definition:
        "relating to the pleasant aspects of the countryside and country life.",
      partOfSpeech: "adjective",
      exampleText: "The bucolic charm of the countryside.",
      source: "Example Source",
      audioPath: "/path/to/audio/bucolic.mp3",
      dialect: "American",
      ipaText: "byo͞oˈkälik",
    },
    {
      word: "circumlocution",
      meaning:
        "the use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive",
      pronunciation: "ˌsərkəmˌlōˈkyo͞oSH(ə)n",
      example: "His admission came after years of circumlocution.",
      definition:
        "the use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive.",
      partOfSpeech: "noun",
      exampleText: "The use of circumlocution in the speech.",
      source: "Example Source",
      audioPath: "/path/to/audio/circumlocution.mp3",
      dialect: "American",
      ipaText: "ˌsərkəmˌlōˈkyo͞oSH(ə)n",
    },
    {
      word: "discombobulate",
      meaning: "disconcert or confuse (someone)",
      pronunciation: "ˌdiskəmˈbäbyəˌlāt",
      example: "The change in policy has discombobulated the staff.",
      definition: "disconcert or confuse (someone).",
      partOfSpeech: "verb",
      exampleText: "The discombobulating effect of the new policy.",
      source: "Example Source",
      audioPath: "/path/to/audio/discombobulate.mp3",
      dialect: "American",
      ipaText: "ˌdiskəmˈbäbyəˌlāt",
    },
    {
      word: "effervescent",
      meaning: "vivacious and enthusiastic",
      pronunciation: "ˌefərˈves(ə)nt",
      example: "An effervescent personality.",
      definition: "vivacious and enthusiastic.",
      partOfSpeech: "adjective",
      exampleText: "The effervescent nature of her personality.",
      source: "Example Source",
      audioPath: "/path/to/audio/effervescent.mp3",
      dialect: "American",
      ipaText: "ˌefərˈves(ə)nt",
    },
    {
      word: "fashionista",
      meaning: "a person who is fashionable",
      pronunciation: "ˌfaSHəˈnēstə",
      example:
        "She is a fashionista who is always up-to-date with the latest trends.",
      definition: "a person who is fashionable.",
      partOfSpeech: "noun",
      exampleText: "The fashionista's latest outfit.",
      source: "Example Source",
      audioPath: "/path/to/audio/fashionista.mp3",
      dialect: "American",
      ipaText: "ˌfaSHəˈnēstə",
    },
    {
      word: "declarative",
      meaning: "stating an assertion",
      pronunciation: "dəˈklarədiv",
      example: "A declarative statement.",
      definition: "stating an assertion.",
      partOfSpeech: "adjective",
      exampleText: "The declarative nature of the statement.",
      source: "Example Source",
      audioPath: "/path/to/audio/declarative.mp3",
      dialect: "American",
      ipaText: "dəˈklarədiv",
    },
    {
      word: "euphoria",
      meaning: "a feeling or state of intense excitement and happiness",
      pronunciation: "yo͞oˈfôrēə",
      example: "The euphoria of success.",
      definition: "a feeling or state of intense excitement and happiness.",
      partOfSpeech: "noun",
      exampleText: "The euphoria of the moment.",
      source: "Example Source",
      audioPath: "/path/to/audio/euphoria.mp3",
      dialect: "American",
      ipaText: "yo͞oˈfôrēə",
    },
    {
      word: "felicity",
      meaning: "intense happiness",
      pronunciation: "fəˈlisədē",
      example: "She was unable to contain her felicity.",
      definition: "intense happiness.",
      partOfSpeech: "noun",
      exampleText: "The felicity of the moment.",
      source: "Example Source",
      audioPath: "/path/to/audio/felicity.mp3",
      dialect: "American",
      ipaText: "fəˈlisədē",
    },
    {
      word: "garrulous",
      meaning: "excessively talkative, especially on trivial matters",
      pronunciation: "ˈɡerələs",
      example: "Polonius is portrayed as a foolish, garrulous",
      definition: "excessively talkative, especially on trivial matters.",
      partOfSpeech: "adjective",
      exampleText: "The garrulous nature of the character.",
      source: "Example Source",
      audioPath: "/path/to/audio/garrulous.mp3",
      dialect: "American",
      ipaText: "ˈɡerələs",
    },
  ];

  for (const wordData of wordsData) {
    // Create a word
    const word = await prisma.words.create({
      data: {
        word: wordData.word,
        meaning: wordData.meaning,
        pronunciation: wordData.pronunciation,
        example: wordData.example,
        definition: wordData.definition,
        partOfSpeech: wordData.partOfSpeech,
      },
    });

    // Create an example word associated with the word
    const exampleWord = await prisma.exampleWords.create({
      data: {
        wordId: word.id,
        exampleText: wordData.exampleText,
        source: wordData.source,
      },
    });

    // Create a pronunciation associated with the word
    const pronunciation = await prisma.pronunciations.create({
      data: {
        wordId: word.id,
        audioPath: wordData.audioPath,
        dialect: wordData.dialect,
        ipaText: wordData.ipaText,
      },
    });

    console.log({ word, exampleWord, pronunciation });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
