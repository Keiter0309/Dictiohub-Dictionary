import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

export class S3Service {
  private static client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  // Upload audio files to S3
  public static async uploadAudioFiles() {
    const files = fs.readdirSync("audio");
    for (const file of files) {
      const filePath = path.join("audio", file);
      const fileContent = fs.readFileSync(filePath);
      
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `audio/${file}`,
        Body: fileContent,
        ContentType: "audio/mpeg",
      });

      try {
        const response = await this.client.send(command);
        console.log(`Uploaded ${file} successfully`);
      } catch (err) {
        console.error(`Error uploading ${file}:`, err);
      }
    }
  }
}