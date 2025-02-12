import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRepos } from '../api/githubApi';

interface Repos {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

interface ReposState {
  repos: Repos[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
  page: number;
  hasMore: boolean;
  userName: string;
}
const initialState: ReposState = {
  repos: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
  userName: '',
};

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    resetState: () => {
      return { ...initialState };
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRepos.pending, state => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(
      fetchRepos.fulfilled,
      (state, action: PayloadAction<Repos[]>) => {
        if (action.payload.length < 20) {
          state.hasMore = false;
        }
        state.repos = [...state.repos, ...action.payload];
        state.status = 'succeeded';
      }
    );
    builder.addCase(fetchRepos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = (action.payload as string) || 'Ошибка загрузки данных';
    });
  },
});

export const { resetState, setUserName, clearError } = reposSlice.actions;

export const reposReducer = reposSlice.reducer;
