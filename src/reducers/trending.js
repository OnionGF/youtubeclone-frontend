import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getTrending = createAsyncThunk(
  "trending/getTrending",
  async () => {
    const { data } = await client(`/api/v1/videos`);
    return data;
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getTrending.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default trendingSlice.reducer;
