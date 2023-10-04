import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ChatRoom, UserChatData, UserProfile } from '../types';

export interface UserState {
	profile?: UserProfile;
	chatData?: UserChatData;
	chatRooms?: [ChatRoom];
}

const initialState: UserState = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			console.log('Set user profile', action.payload.email);
			state.profile = action.payload;
		},
		setChatData: (state, action: PayloadAction<UserChatData>) => {
			console.log('Set user chat data', action.payload.email);
			state.chatData = action.payload;
		},
	},
});

export const { setProfile, setChatData } = userSlice.actions;
export const userReducer = userSlice.reducer;
