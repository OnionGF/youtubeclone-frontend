import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getLikedVideos = createAsyncThunk(
  "likedVideo/getLikedVideos",
  async () => {
    const { data } = await client(
      `/api/v1/user/videos/liked`
    );
    return data;
  }
);

const likedVideoSlice = createSlice({
  name: "likedVideo",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getLikedVideos.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export const {
  addToLikedVideos,
  removeFromLikedVideos,
} = likedVideoSlice.actions;

export default likedVideoSlice.reducer;
