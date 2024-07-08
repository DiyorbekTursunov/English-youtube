import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrlAxios } from '@/axiosConfig';
import { NavigateFunction } from 'react-router-dom';
import { VideoType } from '@/lib/types/video_type';

interface CheckUserState {
    videos: VideoType[];
    loading: boolean;
    error: string | null;
}

const initialState: CheckUserState = {
    videos: [],
    loading: true,
    error: null,
};

interface PostCheckUserTokenResponse {
    verification: string;
}

// Async thunk to handle user token check
export const postCheckUserToken = createAsyncThunk<
    PostCheckUserTokenResponse,
    { navigate: NavigateFunction },
    {
        rejectValue: string;
    }
>(
    'checkUser/postCheckUserToken',
    async ({ navigate }, { rejectWithValue }) => {
        try {
            const verification = localStorage.getItem('verification') as string;
            const token = JSON.parse(verification);

            const response = await baseUrlAxios.post('/auth/check', { verification: token });

            if (response.status === 200) {
                localStorage.setItem('verification', JSON.stringify(response.data.user.verification));
                return { verification: response.data.user.verification };
            } else {
                localStorage.removeItem('verification');
                throw new Error('Failed to verify user');
            }

        } catch (error: unknown) {
            console.log(error);
            localStorage.removeItem('verification');
            navigate('/register');
            return rejectWithValue('An error occurred while verifying the user');
        }
    }
);

// Slice to handle user state
const checkUserIsLogin = createSlice({
    name: 'checkUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postCheckUserToken.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error state on pending
            })
            .addCase(postCheckUserToken.fulfilled, (state) => {
                state.loading = false;
                // Handle successful verification if needed
            })
            .addCase(postCheckUserToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to verify user'; // Set error message
            });
    },
});

export default checkUserIsLogin.reducer;
