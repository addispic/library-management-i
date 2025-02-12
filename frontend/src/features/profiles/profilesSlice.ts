import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// config
import { SOCKET } from "../../config";

// store
import { RootState } from "../../store";

// types
type IProfile = {
  _id: string;
  file: string;
  flag: "bg" | "pro";
};
type IProfiles = {
  user: string;
  profiles: IProfile[];
};
type IInitialState = {
  isProfilesFetching: boolean;
  profiles: IProfiles[];
  isProfileUploading: boolean;
};

// initial state
const initialState: IInitialState = {
  isProfilesFetching: false,
  profiles: [],
  isProfileUploading: false,
};

// get profiles
export const getProfiles = createAsyncThunk(
  "profiles/getProfiles",
  async () => {
    try {
      const response = await axios.get("/api/profiles");
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "unexpected error occurred - get profiles" };
      }
    }
  }
);

// new profile
export const newProfile = createAsyncThunk(
  "profiles/newProfile",
  async (data: FormData) => {
    try {
      const response = await axios.post("/api/profiles/new", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "unexpected error - new profile" };
      }
    }
  }
);

// slice
const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    profileUpdateEvent: (state, action) => {
      const { _id, user, file } = action.payload;
      const topIndex = state.profiles.findIndex((pro) => pro.user === user);
      const secondIndex = state.profiles[topIndex].profiles.findIndex(
        (pr) => pr._id === _id
      );
      state.profiles[topIndex].profiles[secondIndex].file = file;
    },
    newProfileEvent: (state, action) => {
      const { _id, user, file, flag } = action.payload;
      const topIndex = state.profiles.findIndex((pro) => pro.user === user);
      if (topIndex === -1) {
        state.profiles.push({ user, profiles: [{ _id, file, flag }] });
      } else {
        state.profiles[topIndex].profiles.push({ _id, file, flag });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // get profiles
      .addCase(getProfiles.pending, (state) => {
        state.isProfilesFetching = true;
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.isProfilesFetching = false;
        if (action.payload.profiles) {
          state.profiles = action.payload.profiles;
        }
      })
      .addCase(getProfiles.rejected, (state) => {
        state.isProfilesFetching = false;
      })
      //   new profile
      .addCase(newProfile.pending, (state) => {
        state.isProfileUploading = true;
      })
      .addCase(newProfile.fulfilled, (state, action) => {
        state.isProfileUploading = false;
        if (action.payload.updatedProfile) {
          const { _id, user, file } = action.payload.updatedProfile;
          const topIndex = state.profiles.findIndex((pro) => pro.user === user);
          const secondIndex = state.profiles[topIndex].profiles.findIndex(
            (pr) => pr._id === _id
          );
          state.profiles[topIndex].profiles[secondIndex].file = file;
          SOCKET.emit("profileUpdate", action.payload.updatedProfile);
        }
        if (action.payload.newProfile) {
          const { _id, user, file, flag } = action.payload.newProfile;
          const topIndex = state.profiles.findIndex((pro) => pro.user === user);
          if (topIndex === -1) {
            state.profiles.push({ user, profiles: [{ _id, file, flag }] });
          } else {
            state.profiles[topIndex].profiles.push({ _id, file, flag });
          }
          SOCKET.emit("newProfile", action.payload.newProfile);
        }
      })
      .addCase(newProfile.rejected, (state) => {
        state.isProfileUploading = false;
      });
  },
});

// exports
// actions
export const {newProfileEvent,profileUpdateEvent} = profilesSlice.actions
// selectors
// profiles
export const profilesSelector = (state: RootState) => state.profiles.profiles;
// is profile uploading
export const isProfileUploadingSelector = (state: RootState) =>
  state.profiles.isProfileUploading;
// reducer
export default profilesSlice.reducer;
