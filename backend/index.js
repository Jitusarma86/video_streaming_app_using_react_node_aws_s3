import express from "express";
import { upload } from './upload.js'
import dotenv from "dotenv"
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import fs from 'fs'
import cors from 'cors'
import { uploadDirectoryToS3 } from './s3.js'
dotenv.config();
const app = express()


app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));

app.use(express.static("public")) // set the public folder for media

app.post("/API/upload-video", upload.single('file'), async (req, res) => {

    /* Create directory for storing the chunks */

    const directoryName = Date.now().toString()
    const path = `./public/DIR${directoryName}`

    fs.access(path, (error) => {
        if (error) {
            fs.mkdirSync(path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully !!");
                }
            });
        } else {
            res.status(400).json({
                'msg': "Given Directory already exists"
            })
        }
    });


    /* Creating Chunks for given video*/

    ffmpeg.setFfmpegPath(ffmpegStatic)
    const inputPath = req.file.path
    const outputpath = `${path}/output.mpd"`

    const scaleOptions = [
        "scale=1280:720",  // 720p
        "scale=640:360",   // 360p
        "scale=1920:1080", // 1080p (Full HD)
        "scale=854:480"    // 480p
    ]

    const videoCodec = "libx264"
    const x264Otions = "keyint=24:min-keyint=24:no-scenecut"
    const videoBitrates = ['500k', '1000k', '2000k', '4000k'];

    const promiseChunk = new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputPath)
            .videoFilters(scaleOptions)
            .videoCodec(videoCodec)
            .addOption('-x264opts', x264Otions)
            .outputOptions("-b:v", videoBitrates[0])
            .format('dash')
            .output(outputpath)
            .on('start', (commandLine) => {
                console.log('Spawned FFmpeg with command: ' + commandLine);
            })
            .on('stderr', (stderrLine) => {
                console.log('FFmpeg stderr:', stderrLine);
            })
            .on('end', () => {
                console.log("Successfull")
                resolve("Chunks Created Successfull")
            })
            .on('error', (err, stdout, stderr) => {
                console.error("Error occurred:", err.message);
                console.error("FFmpeg output:", stdout);
                console.error("FFmpeg stderr:", stderr);
                reject("Error")
            })
            .run()
    })


    let result
    try {
        result = await promiseChunk
    } catch (err) {
        console.log(err)
    }

    if (result) {
        fs.unlinkSync(req.file.path)
        const s3Prefix = `DIR${directoryName}`;
        const uploadedLink = await uploadDirectoryToS3(path, s3Prefix)
        if (uploadedLink) {
            setTimeout(() => {
                fs.rmSync(`public/${s3Prefix}`, { recursive: true, force: true });
            }, 500)
            res.status(200).json({
                'url': uploadedLink
            })
        }
    } else {
        res.status(500).json({
            'msg': result
        })
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})