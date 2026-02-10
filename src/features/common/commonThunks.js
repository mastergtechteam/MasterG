import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../api/apiClient';

export const fetchData = createAsyncThunk(
  'common/fetchData',
  async ({ endpoint, params }, { rejectWithValue }) => {
    try {
      return await apiGet(endpoint, params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
