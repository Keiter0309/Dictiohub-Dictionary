const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Array of words to create
  const words = [
    {
      word: "abandon",
      exampleWords: [
        {
          exampleText: "The baby had been abandoned by its mother.",
          source: "Oxford Dictionary",
        },
        {
          exampleText:
            "People often simply abandon their pets when they go abroad.",
          source: "Oxford Dictionary",
        },
        {
          exampleText: "We have been abandoned to our fate, said one resident.",
          source: "Oxford Dictionary",
        },
        {
          exampleText:
            "The study showed a deep fear among the elderly of being abandoned to the care of strangers.",
          source: "Oxford Dictionary",
        },
      ],
      pronunciations: [
        {
          audioPath: "/path/to/audio.mp3",
          dialect: "American",
          ipaText: "/əˈbæn.dən/",
        },
      ],
      definitions: [
        {
          definitionText:
            "A way of behaving that is not sensible and shows that you do not care about the possible results of your actions or what other people think.",
          usageExample: "He spent money with careless abandon.",
          partOfSpeech: "noun",
        },
        {
          definitionText:
            "To leave somebody, especially somebody you are responsible for, with no intention of returning.",
          usageExample: "The baby had been abandoned by its mother.",
          partOfSpeech: "verb",
        },
        {
          definitionText: "To leave somebody to something.",
          usageExample:
            "We have been abandoned to our fate,’ said one resident.",
          partOfSpeech: "verb",
        },
      ],
      categories: ["General"],
      synonymsAntonyms: {
        synonyms: "spontaneity, disregard, freedom, impulse, licentiousness",
        antonyms: "restraint, self-restraint",
      },
      meanings: [
        {
          meaningText:
            "A way of behaving that is not sensible and shows that you do not care about the possible results of your actions or what other people think.",
        },
        {
          meaningText:
            "To leave somebody, especially somebody you are responsible for, with no intention of returning.",
        },
        {
          meaningText: "To leave somebody to something.",
        },
      ],
    },
    {
      word: "ability",
      exampleWords: [
        {
          exampleText:
            "People with the disease may lose their ability to communicate.",
          source: "Oxford Dictionary",
        },
        {
          exampleText: "This program has the ability to adapt to its user.",
          source: "Oxford Dictionary",
        },
        {
          exampleText:
            "Students must demonstrate the ability to understand simple texts.",
          source: "Oxford Dictionary",
        },
        {
          exampleText:
            "She has an uncanny ability to predict what consumers will want.",
          source: "Oxford Dictionary",
        },
        {
          exampleText:
            "A gentle form of exercise will increase your ability to relax.",
          source: "Oxford Dictionary",
        },
      ],
      pronunciations: [
        {
          audioPath: "/path/to/audio.mp3",
          dialect: "American",
          ipaText: "/əˈbɪləti/",
        },
      ],
      definitions: [
        {
          definitionText:
            "The fact that somebody/something is able to do something.",
          usageExample: " ",
          partOfSpeech: "noun",
        },
      ],
      categories: ["General"],
      synonymsAntonyms: {
        synonyms: "capability, capacity, competence, intelligence, proficiency",
        antonyms: "inability, incapacity, aptitude, competency, facility",
      },
      meanings: [
        {
          meaningText:
            "The fact that somebody/something is able to do something.",
        },
      ],
    },
  ];

  // Create words
  for (const wordData of words) {
    const word = await prisma.word.create({
      data: {
        word: wordData.word,
        createdAt: new Date(),
        updatedAt: new Date(),
        exampleWords: {
          create: wordData.exampleWords.map((exampleWord) => ({
            exampleText: exampleWord.exampleText,
            source: exampleWord.source,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
        pronunciations: {
          create: wordData.pronunciations.map((pronunciation) => ({
            audioPath: pronunciation.audioPath,
            dialect: pronunciation.dialect,
            ipaText: pronunciation.ipaText,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
        definitions: {
          create: await Promise.all(
            wordData.definitions.map(async (def) => {
              const pos = await prisma.partOfSpeech.upsert({
                where: { partOfSpeech: def.partOfSpeech },
                update: {},
                create: { partOfSpeech: def.partOfSpeech },
              });
              return {
                definitionText: def.definitionText,
                usageExample: def.usageExample,
                partOfSpeech: def.partOfSpeech,
                posId: pos.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
            })
          ),
        },
        wordCategories: {
          create: wordData.categories.map((categoryName) => ({
            category: {
              connectOrCreate: {
                where: { categoryName },
                create: {
                  categoryName,
                },
              },
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
        synonymsAntonyms: {
          create: {
            synonyms: wordData.synonymsAntonyms.synonyms,
            antonyms: wordData.synonymsAntonyms.antonyms,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        meanings: {
          create: wordData.meanings.map((meaning) => ({
            meaningText: meaning.meaningText,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        },
      },
    });

    console.log(`Created word with id: ${word.id}`);
  }

  console.log("Data added successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
