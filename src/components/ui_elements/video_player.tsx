import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoType } from '../../lib/types/video_type';

interface YouTubePlayerProps {
  videoData: VideoType | null;
}

const YouTubePlayer = ({ videoData }: YouTubePlayerProps) => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Initialize videoUrl state

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        if (videoData) {          
          // Construct the video URL
          const url = `https://www.youtube.com/embed/${videoData.video_id}?si=m5LpDydoMt9O1Lx6`;
          setVideoUrl(url); // Set the video URL in state

        } else {
          // Handle case where videoData is null or undefined
          console.warn('Video data is null or undefined.');
        }
        
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();

  }, [videoData, navigate]); // Depend on videoData and navigate

  // Render the iframe with the video URL if available
  return (
    <>
      {videoUrl && (
        <iframe
          className="w-full h-[290px] -mt-0"
          id='video_player'
          src={videoUrl} // Use the video URL for embedding
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
};

export default YouTubePlayer;