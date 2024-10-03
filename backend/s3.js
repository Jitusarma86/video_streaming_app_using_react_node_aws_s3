import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs'
import path from 'path'
import dotenv from "dotenv"
dotenv.config();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESSKEYID;
const secretAccessKey = process.env.AWS_SECRETACCESSKEY;
const bucketName = process.env.S3_BUCKET_NAME

const s3Config = {
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
};
const s3Client = new S3Client(s3Config);

export const uploadDirectoryToS3 = async (directoryPath, s3Prefix) => {
    const files = fs.readdirSync(directoryPath);
    for (const fileName of files) {
        const filePath = path.join(directoryPath, fileName);  //read the file path
        const fileStream = fs.createReadStream(filePath); // Read file as stream
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `media/${s3Prefix}/${fileName}`,
            Body: fileStream,
            ContentType: getMimeType(fileName),
        });


        try {
            const response = await s3Client.send(command);
            console.log("File chunks are successfully uploaded in S3");
        } catch (err) {
            console.error(err);
        }
    }
    return `https://${bucketName}.s3.amazonaws.com/media/${s3Prefix}/output.mpd%22`
}

const getMimeType = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    switch (ext) {
        case '.mpd':
            return 'application/dash+xml';
        case '.mp4':
            return 'video/mp4';
        case '.m4s':
            return 'video/iso.segment';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.txt':
            return 'text/plain';
        default:
            return 'application/octet-stream';
    }
};
