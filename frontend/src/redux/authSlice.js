import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedUsers:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        // actions
        setAuthUser:(state,action) => {
            state.user = action.payload;
        },
        setSuggestedUsers:(state,action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile:(state,action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action) => {
            state.selectedUser = action.payload;
        },
        updateFollowing:(state,action) => {
            const { userId, isFollowing } = action.payload;
            if (state.user) {
                if (isFollowing) {
                    // Unfollow
                    state.user.following = state.user.following.filter(id => id !== userId);
                } else {
                    // Follow
                    state.user.following.push(userId);
                }
            }
            // Update userProfile followers count if viewing that profile
            if (state.userProfile && state.userProfile._id === userId) {
                if (isFollowing) {
                    // Remove current user from followers
                    state.userProfile.followers = state.userProfile.followers.filter(id => id !== state.user._id);
                } else {
                    // Add current user to followers
                    state.userProfile.followers.push(state.user._id);
                }
            }
        }
    }
});
export const {
    setAuthUser, 
    setSuggestedUsers, 
    setUserProfile,
    setSelectedUser,
    updateFollowing,
} = authSlice.actions;
export default authSlice.reducer;
