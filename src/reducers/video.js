import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getVideo = createAsyncThunk("video/getVideo", async (videoId) => {
  const { data } = await client(
    `api/v1/videos/${videoId}`
  );
  return data;
});

const videoSlice = createSlice({
  name: "slice",
  initialState: {
    isFetching: true,
    data: {}
  },
  reducers: {
    clearVideo(state, action) {
      state.isFetching = true;
      state.data = {};
    },
    addComment(state, action) {
      state.data = {
        ...state.data,
        comments: [action.payload, ...state.data.comment.content],
      };
    },
    like(state, action) {
      console.log(30, state)
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount + 1,
      };
    },
    dislike(state, action) {
      console.log("dislike", state)
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount + 1,
      };
    },
    cancelLike(state, action) {
      console.log("cancelLike", state)
      state.data = {
        ...state.data,
        isLiked: !state.data.isLiked,
        likesCount: state.data.likesCount - 1,
      };
    },
    cancelDislike(state, action) {
      console.log("cancelDislike", state)
      state.data = {
        ...state.data,
        isDisliked: !state.data.isDisliked,
        dislikesCount: state.data.dislikesCount - 1,
      };
    },
  },
  extraReducers: {
    [getVideo.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
  },
});

export const {
  clearVideo,
  addComment,
  like,
  dislike,
  cancelLike,
  cancelDislike,
} = videoSlice.actions;

export default videoSlice.reducer;
