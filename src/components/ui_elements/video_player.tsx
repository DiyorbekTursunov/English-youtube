import { useEffect, useRef, useState } from 'react';
import { VideoType } from '../../lib/types/video_type';

interface YouTubePlayerProps {
  videoData: VideoType | null;
}

const YouTubePlayer = ({ videoData }: YouTubePlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);


  console.log(videoData);
  

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const fetchVideoUrl = async () => {
      try {
        if (videoData) {
          const url = `https://www.youtube.com/embed/${videoData.video_youtube_id}?si=m5LpDydoMt9O1Lx6`;
          setVideoUrl(url);
        } else {
          console.warn('Video data is null or undefined.');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, [videoData]);


  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDocument) {
          const element = iframeDocument.querySelector('.ytp-chrome-top');

          console.log(element);

          if (element) {
            (element as HTMLElement).style.display = 'block';
          }
        }
      };
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <img src={videoData?.video_img_url} alt="Video Thumbnail" className="w-full h-[250px]" />
      ) : (
        videoUrl && (
          <iframe
            ref={iframeRef}
            className="w-full h-[290px] max-w-[500px] -mt-0 absolute top-0 z-30"
            id="video_player"
            src={`${videoUrl}?playsinline=1&iv_load_policy=3&rel=0&showinfo=0&controls=1&fs=1&autoplay=1&enablejsapi=1&widgetid=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            autoSave='true'
          ></iframe>
        )
      )}
    </>
  );
};

export default YouTubePlayer;