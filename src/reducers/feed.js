import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getFeed = createAsyncThunk("feed/getFeed", async () => {
  const { data } = await client(`/api/v1/user/videos/feed`);
  return data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getFeed.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default feedSlice.reducer;
