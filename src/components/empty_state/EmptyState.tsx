import React from 'react'
import './YouTube.scss';
import YouTube from "react-youtube";
import {Box} from "@material-ui/core";

export default function EmptyState() {
    return <Box className="video-background">
        <Box className="video-foreground">
            <YouTube
                videoId={"ZuuVjuLNvFY"}
                opts={{
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        mute: 1
                    }
                }}
                className="video-iframe"
                onReady={(event: any) => event.target.mute()}
                onEnd={(event: any) => event.target.playVideo()}
            />
        </Box>
    </Box>;
};