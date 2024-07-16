import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrlAxios } from '@/axiosConfig';
import { NavigateFunction } from 'react-router-dom';
import { userType } from '@/lib/types/user_type';

interface CheckUserState {
  userData: userType
  loading: boolean;
  error: string | null;
}

const initialState: CheckUserState = {
  userData: {
    username: "",
    lastname: "",
    password: "",
    verification: "",
    role: "",
    _id: ""
  },
  loading: true,
  error: null,
};

interface PostCheckUserTokenResponse {
  verification: string;
  user: userType; // Ensure this matches your response
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
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('verification', JSON.stringify(response.data.user.verification));
        return {
          verification: response.data.user.verification,
          user: response.data.user,
        };
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
      .addCase(postCheckUserToken.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user; // Update the userData with the received user data
      })
      .addCase(postCheckUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to verify user'; // Set error message
      });
  },
});

export default checkUserIsLogin.reducer;
