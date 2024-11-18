import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data if needed
    await prisma.wordCategory.deleteMany();
    await prisma.synonymsAntonyms.deleteMany();
    await prisma.meaning.deleteMany();
    await prisma.pronunciation.deleteMany();
    await prisma.exampleWord.deleteMany();
    await prisma.definition.deleteMany();
    await prisma.word.deleteMany();
    await prisma.category.deleteMany();
    await prisma.partOfSpeech.deleteMany();

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          categoryName: "Academic",
        },
      }),
      prisma.category.create({
        data: {
          categoryName: "Literature",
        },
      }),
      prisma.category.create({
        data: {
          categoryName: "Common Usage",
        },
      }),
    ]);

    // Create parts of speech
    const partsOfSpeech = await Promise.all([
      prisma.partOfSpeech.create({
        data: {
          partOfSpeech: "adjective",
        },
      }),
      prisma.partOfSpeech.create({
        data: {
          partOfSpeech: "noun",
        },
      }),
    ]);

    // Create words with their related data
    const words = [
      {
        word: "resilient",
        definitions: [
          {
            posId: partsOfSpeech[0].id, // adjective
            partOfSpeech: "adjective",
            definitionText: "Able to recover quickly from difficult conditions",
            usageExample: "The resilient plant survived despite the drought.",
          },
          {
            posId: partsOfSpeech[0].id,
            partOfSpeech: "adjective",
            definitionText:
              "Having the quality of being able to return to original form after being bent or compressed",
            usageExample:
              "The resilient material bounced back to its original shape.",
          },
        ],
        examples: [
          {
            exampleText:
              "The resilient economy quickly recovered from the recession.",
            source: "Financial Times",
          },
          {
            exampleText: "She showed a resilient spirit in face of adversity.",
            source: "Literary Example",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/resilient.mp3",
            dialect: "American",
            ipaText: "rɪˈzɪliənt",
          },
          {
            audioPath: "/audio/resilient-uk.mp3",
            dialect: "British",
            ipaText: "rɪˈzɪliənt",
          },
        ],
        meanings: [
          {
            meaningText:
              "Having the ability to withstand or recover quickly from difficult conditions",
          },
        ],
        synonymsAntonyms: {
          synonyms: "tough, flexible, adaptable, elastic",
          antonyms: "fragile, weak, inflexible",
        },
        categories: [categories[0].id, categories[2].id], // Academic, Common Usage
      },
      {
        word: "ephemeral",
        definitions: [
          {
            posId: partsOfSpeech[0].id,
            partOfSpeech: "adjective",
            definitionText: "Lasting for a very short time",
            usageExample: "The ephemeral beauty of cherry blossoms",
          },
        ],
        examples: [
          {
            exampleText: "Social media fame is often ephemeral.",
            source: "Digital Marketing Journal",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/ephemeral.mp3",
            dialect: "American",
            ipaText: "ɪˈfem(ə)rəl",
          },
        ],
        meanings: [
          {
            meaningText: "Existing only briefly; short-lived",
          },
        ],
        synonymsAntonyms: {
          synonyms: "fleeting, transitory, temporary, brief",
          antonyms: "permanent, lasting, enduring",
        },
        categories: [categories[1].id], // Literature
      },
      {
        word: "serendipity",
        definitions: [
          {
            posId: partsOfSpeech[1].id, // noun
            partOfSpeech: "noun",
            definitionText:
              "The occurrence and development of events by chance in a happy or beneficial way",
            usageExample: "Finding his dream job was pure serendipity.",
          },
        ],
        examples: [
          {
            exampleText:
              "Meeting her future husband at the airport was serendipity.",
            source: "Contemporary Fiction",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/serendipity.mp3",
            dialect: "American",
            ipaText: "ˌserənˈdipədi",
          },
        ],
        meanings: [
          {
            meaningText:
              "The faculty of making fortunate discoveries by accident",
          },
        ],
        synonymsAntonyms: {
          synonyms: "chance, fortune, luck",
          antonyms: "misfortune, design, plan",
        },
        categories: [categories[1].id], // Literature
      },
    ];

    // Create words and their related data
    for (const wordData of words) {
      const word = await prisma.word.create({
        data: {
          word: wordData.word,
        },
      });

      // Create definitions
      await Promise.all(
        wordData.definitions.map((def) =>
          prisma.definition.create({
            data: {
              wordId: word.id,
              ...def,
            },
          })
        )
      );

      // Create examples
      await Promise.all(
        wordData.examples.map((example) =>
          prisma.exampleWord.create({
            data: {
              wordId: word.id,
              ...example,
            },
          })
        )
      );

      // Create pronunciations
      await Promise.all(
        wordData.pronunciations.map((pron) =>
          prisma.pronunciation.create({
            data: {
              wordId: word.id,
              ...pron,
            },
          })
        )
      );

      // Create meanings
      await Promise.all(
        wordData.meanings.map((meaning) =>
          prisma.meaning.create({
            data: {
              wordId: word.id,
              ...meaning,
            },
          })
        )
      );

      // Create synonyms and antonyms
      await prisma.synonymsAntonyms.create({
        data: {
          wordId: word.id,
          ...wordData.synonymsAntonyms,
        },
      });

      // Create word categories
      await Promise.all(
        wordData.categories.map((categoryId) =>
          prisma.wordCategory.create({
            data: {
              wordId: word.id,
              categoryId: categoryId,
              categoryName:
                categories.find((c) => c.id === categoryId)?.categoryName || "",
            },
          })
        )
      );
    }

    console.log("Seed data created successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
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
