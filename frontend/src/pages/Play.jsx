import { useState } from "react"
import { Input, Btn } from "../components/Inputes"
import Video from "../components/Video"
export default function Play() {
    const [url, setUrl] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    function handleClick(e) {
        if (url !== '') {
            setIsSubmit(true)
        }
    }


    return (
        <div className="container">
            <div className="upload-page">

                <Input
                    label="Enter video link to play:"
                    type="text"
                    name="url"
                    value={url}
                    placeholder="Video link"
                    onChange={(e) => setUrl(e.target.value)}

                />
                <Btn onClick={handleClick}> Play Video </Btn>

            </div>
            {isSubmit ? <Video url={url} /> : ''}


        </div>
    )
}