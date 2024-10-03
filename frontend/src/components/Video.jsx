import dashjs from 'dashjs';
import { useRef, useEffect } from 'react';
export default function Video({ url }) {
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            const player = dashjs.MediaPlayer().create();
            player.initialize(videoRef.current, url, true);
        }
    }, [])
    return (
        <>
            <video
                ref={videoRef}
                controls
                autoPlay
                style={{ width: '100%', height: 'auto' }}
            />
        </>
    )
}