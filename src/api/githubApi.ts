import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        if (status === 400) return rejectWithValue('Некорректный запрос');
        if (status === 401) return rejectWithValue('Необходима авторизация');
        if (status === 403) return rejectWithValue('Доступ запрещён');
        if (status === 404) return rejectWithValue('Пользователь не найден');
        if (status >= 500)
          return rejectWithValue('Сервер временно недоступен');
        return rejectWithValue(
          axiosError.response.data?.message || 'Ошибка запроса'
        );
      }
      if (axiosError.message === 'Network Error') {
        return rejectWithValue('Проблемы с сетью. Проверьте интернет.');
      }
      return rejectWithValue(axiosError.message || 'Неизвестная ошибка');
    }
  }
);
