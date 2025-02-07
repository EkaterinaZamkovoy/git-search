import { createSlice } from '@reduxjs/toolkit';

interface Repos {
  id: string;
  name: string;
  html_url: string;
  stargazers_count: number;
  update_at: string;
}

interface ReposState {
  repos: Repos[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
  page: number;
  hasMore: boolean;
}
const initialState: ReposState = {
  repos: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
};

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {},
});
