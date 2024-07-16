export interface VideoType {
    liked_videos_user_id: [{ _id: string }]
    recently_viewed_videos_user_id: [{ _id: string }]
    _id: string;
    video_youtube_id: string;
    video_img_url: string;
    video_name: string;
    video_description: string;
    video_views: string;
    video_likes: string;
    video_clicked_count: string;
    video_rec_controller: string;
    video_type: string;
    updatedAt: string;
    __v: number;
}