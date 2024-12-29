import {
  PollyClient,
  DescribeVoicesCommand,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";
import fs from "fs";
import path from "path";
import { S3Service } from "./s3.service";
import dotenv from "dotenv";

dotenv.config();

const polly = new PollyClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export class PollyService {
  public static async getAvailableVoices() {
    try {
      const command = new DescribeVoicesCommand({});
      const response = await polly.send(command);
      return response.Voices || [];
    } catch (error) {
      console.error("Error fetching Polly voices:", error);
      return [];
    }
  }

  public static async synthesizeSpeech(text: string, outputPath: string) {
    try {
      const command = new SynthesizeSpeechCommand({
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Joanna",
      });

      const response = await polly.send(command);
      if (response.AudioStream) {
        // Convert to Buffer using unknown intermediary
        const audioBuffer = Buffer.from(
          await response.AudioStream.transformToByteArray()
        );
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, audioBuffer);

         await S3Service.uploadAudioFiles();
      }
    } catch (error) {
      console.error(`Error synthesizing speech for ${text}:`, error);
    }
  }
}
