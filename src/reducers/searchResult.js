import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getSearchResults = createAsyncThunk(
  "searchResult",
  async (searchTerm) => {
    const { data: users } = await client(
      `/api/v1/users/search?searchterm=${searchTerm}`
    );

    const { data: videos } = await client(
      `/api/v1/videos/search?searchterm=${searchTerm}`
    );

    return { users, videos };
  }
);

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    isFetching: true,
    users: [],
    videos: [],
  },
  reducers: {
    toggleSubscribeSearchResults(state, action) {
      state.users = state.users.map((user) =>
        action.payload === user.id
          ? { ...user, isSubscribed: !user.isSubscribed }
          : user
      );
    },
    clearSearchResults(state, action) {
      state.users = [];
      state.videos = [];
      state.isFetching = true;
    },
  },
  extraReducers: {
    [getSearchResults.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload.videos;
      state.users = action.payload.users;
    },
  },
});

export const {
  toggleSubscribeSearchResults,
  unsubscribeFromSearchResults,
  clearSearchResults,
} = searchResultSlice.actions;

export default searchResultSlice.reducer;
