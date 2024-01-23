import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profileImage: null,
    },
    reducers: {
        setProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
    },
});

export const { setProfileImage } = userSlice.actions;
export const selectProfileImage = (state) => state.user.profileImage;
export default userSlice.reducer;
