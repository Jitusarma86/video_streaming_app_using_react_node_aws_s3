import { useState } from "react"
import { InputFile, Btn } from "../components/Inputes"
import { apiCall } from "../services/Axios"
export default function Upload() {

    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState("")
    const [url, setUrl] = useState('No url')
    function fileHandelar(e) {
        setFile(e.target.files[0])
    }

    async function handleClick() {
        setLoader(true)
        const result = await apiCall.postAPI('/API/upload-video', file)
        setLoader(false)
        if (result) {
            setUrl(result.url)
            alert('Successfully uploaded')
        }
    }
    return (
        <div className="container">
            <div className="upload-page">
                <InputFile
                    label="Upload video:"
                    type="file"
                    name="file"
                    onChange={fileHandelar}
                />
                {!loader ?
                    <Btn
                        type="button"
                        onClick={handleClick}
                    >
                        Submit
                    </Btn>
                    : `Loading.....
                     It may take time, do not refresh the page....`}
                <br />
                URL: {url}
            </div>
        </div>
    )
}