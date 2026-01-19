"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideoBackground() {
    const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Initial play
        if (video1Ref.current) {
            video1Ref.current.play().catch(() => {
                // Autoplay might be blocked until interaction
            });
        }
    }, []);

    const handleVideo1Ended = () => {
        // Determine next video
        const nextVideo = video2Ref.current;
        if (nextVideo) {
            nextVideo.currentTime = 0;
            nextVideo.play().then(() => {
                setActiveVideo(2);
            }).catch(console.error);
        }
    };

    const handleVideo2Ended = () => {
        // Loop back to video 1
        const nextVideo = video1Ref.current;
        if (nextVideo) {
            nextVideo.currentTime = 0;
            nextVideo.play().then(() => {
                setActiveVideo(1);
            }).catch(console.error);
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
            {/* Video 1 */}
            <video
                ref={video1Ref}
                src="/videos/hero-1.mp4"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeVideo === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                muted
                playsInline
                onEnded={handleVideo1Ended}
            />

            {/* Video 2 */}
            <video
                ref={video2Ref}
                src="/videos/hero-2.mp4"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeVideo === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                muted
                playsInline
                onEnded={handleVideo2Ended}
            />

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none"></div>
        </div>
    );
}
