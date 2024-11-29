import { PrismaClient } from "@prisma/client";
import path from "path";
import {PollyService} from '../src/services/aws/polly.service'

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data
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
        data: { categoryName: "Academic" },
      }),
      prisma.category.create({
        data: { categoryName: "Literature" },
      }),
      prisma.category.create({
        data: { categoryName: "Common Usage" },
      }),
    ]);

    // Create parts of speech
    const partsOfSpeech = await Promise.all([
      prisma.partOfSpeech.create({
        data: { partOfSpeech: "adjective" },
      }),
      prisma.partOfSpeech.create({
        data: { partOfSpeech: "noun" },
      }),
    ]);

    // Word data
    const words = [
      {
        word: "resilient",
        definitions: [
          {
            posId: partsOfSpeech[0].id,
            partOfSpeech: "adjective",
            definitionText: "Able to recover quickly from difficult conditions",
            usageExample: "The resilient plant survived despite the drought.",
          },
          {
            posId: partsOfSpeech[0].id,
            partOfSpeech: "adjective",
            definitionText: "Having the quality of being able to return to original form after being bent or compressed",
            usageExample: "The resilient material bounced back to its original shape.",
          },
        ],
        examples: [
          {
            exampleText: "The resilient economy quickly recovered from the recession.",
            source: "Financial Times",
          },
          {
            exampleText: "She showed a resilient spirit in face of adversity.",
            source: "Literary Example",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/resilient-us.mp3",
            dialect: "American",
            ipaText: "rɪˈzɪliənt",
          },
        ],
        meanings: [
          {
            meaningText: "Having the ability to withstand or recover quickly from difficult conditions",
          },
        ],
        synonymsAntonyms: {
          synonyms: "tough, flexible, adaptable, elastic",
          antonyms: "fragile, weak, inflexible",
        },
        categories: [categories[0].id, categories[2].id],
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
            audioPath: "/audio/ephemeral-us.mp3",
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
        categories: [categories[1].id],
      },
      {
        word: "ubiquitous",
        definitions: [
          {
            posId: partsOfSpeech[0].id,
            partOfSpeech: "adjective",
            definitionText: "Present, appearing, or found everywhere",
            usageExample: "The ubiquitous presence of smartphones",
          },
        ],
        examples: [
          {
            exampleText: "The company aims to make its products ubiquitous in the market.",
            source: "Business Insider",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/ubiquitous-us.mp3",
            dialect: "American",
            ipaText: "juˈbɪkwɪtəs",
          },
        ],
        meanings: [
          {
            meaningText: "Present, appearing, or found everywhere",
          },
        ],
        synonymsAntonyms: {
          synonyms: "omnipresent, pervasive, universal, ever-present",
          antonyms: "rare, scarce, limited, uncommon",
        },
        categories: [categories[2].id],
      },
      {
        word: "beauty",
        definitions: [
          {
            posId: partsOfSpeech[1].id,
            partOfSpeech: "noun",
            definitionText: "A combination of qualities that pleases the aesthetic senses",
            usageExample: "The beauty of a sunset",
          }
        ],
        examples: [
          {
            exampleText: "The beauty of the landscape took my breath away.",
            source: "Travel Magazine",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/beauty-us.mp3",
            dialect: "American",
            ipaText: "ˈbjuːti",
          },
        ],
        meanings: [
          {
            meaningText: "A combination of qualities that pleases the aesthetic senses",
          },
        ],
        synonymsAntonyms: {
          synonyms: "attractiveness, loveliness, charm, elegance",
          antonyms: "ugliness, unattractiveness, repulsiveness",
        },
        categories: [categories[0].id, categories[2].id],
      },
      {
        word: "study",
        definitions: [
          {
            posId: partsOfSpeech[1].id,
            partOfSpeech: "noun",
            definitionText: "The devotion of time and attention to acquiring knowledge",
            usageExample: "She spent hours in the library for her study.",
          },
          {
            posId: partsOfSpeech[1].id,
            partOfSpeech: "noun",
            definitionText: "A detailed investigation and analysis of a subject or situation",
            usageExample: "The study of climate change",
          },
        ],
        examples: [
          {
            exampleText: "The study of history helps us understand the present.",
            source: "Historical Journal",
          },
        ],
        pronunciations: [
          {
            audioPath: "/audio/study-us.mp3",
            dialect: "American",
            ipaText: "ˈstʌdi",
          },
        ],
        meanings: [
          {
            meaningText: "The devotion of time and attention to acquiring knowledge",
          },
          {
            meaningText: "A detailed investigation and analysis of a subject or situation",
          },
        ],
        synonymsAntonyms: {
          synonyms: "research, learning, investigation, analysis",
          antonyms: "ignorance, neglect, disregard",
        },
        categories: [categories[0].id],
      },
    ];

    // Create words and their related data
    for (const wordData of words) {
      const word = await prisma.word.create({
        data: { word: wordData.word },
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

      // Create pronunciations and generate audio files
      await Promise.all(
        wordData.pronunciations.map(async (pron) => {
          const audioPath = path.join(
            `audio/${wordData.word}.mp3`
          );
          
          const audio = path.join(
            `${wordData.word}.mp3`
          )
          await PollyService.synthesizeSpeech(wordData.word, audioPath);
          await prisma.pronunciation.create({
            data: {
              wordId: word.id,
              ...pron,
              audioPath: audio,
            },
          });
        })
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