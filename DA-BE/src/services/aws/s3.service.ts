import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
export class S3Service {
  // Upload audio files to S3
  public static async uploadAudioFiles() {
    const files = fs.readdirSync("audio");
    for (const file of files) {
      const filePath = path.join("audio", file);
      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: `audio/${file}`,
        Body: fileContent,
        ContentType: "audio/mpeg",
      };

      try {
        const data = await s3.upload(params).promise();
        console.log(`Uploaded ${file} successfully: ${data.Location}`);
      } catch (err) {
        console.error(`Error uploading ${file}:`, err);
      }
    }
  }
}
