import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export const fetchRepos = createAsyncThunk(
  'repos/retchRepos',
  async (
    { username, page }: { username: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${username}/repos?per_page=20&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки репозиториев');
    }
  }
);
