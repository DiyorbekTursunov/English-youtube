import { configureStore } from '@reduxjs/toolkit';
import checkUserIsLogin from '@/features/auth_slice/checkUserIsLogin';

export const store = configureStore({
  reducer: {
    checkUser: checkUserIsLogin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;