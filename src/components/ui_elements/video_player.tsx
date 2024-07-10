import { useEffect, useState } from 'react';
import { VideoType } from '../../lib/types/video_type';

interface YouTubePlayerProps {
  videoData: VideoType | null;
}

const YouTubePlayer = ({ videoData }: YouTubePlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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

  return (
    <>
      {isLoading ? (
        <div role="status" className="flex items-center justify-center h-[290px] w-full bg-gray-600  animate-pulse dark:bg-gray-700">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        videoUrl && (
          <iframe
            className="w-full h-[290px] -mt-0"
            id="video_player"
            src={`${videoUrl}?playsinline=1&iv_load_policy=3&rel=0&showinfo=0&controls=1&fs=0&autoplay=1&enablejsapi=1&widgetid=1`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            autoSave='true'
          ></iframe>
        )
      )}
    </>
  );
};

export default YouTubePlayer;