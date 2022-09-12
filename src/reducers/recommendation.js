import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getRecommendation = createAsyncThunk(
  "recommendation/getRecommendation",
  async () => {
    const { data } = await client(`api/v1/videos`);
    console.log(8, data)
    return data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    isFetching: true,
    videos: [],
  },
  reducers: {
    addToRecommendation(state, action) {
      state.videos = [action.payload, ...state.videos];
    },
  },
  extraReducers: {
    [getRecommendation.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export const { addToRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
