import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './commonThunks';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    loading: false,
    error: null,
    data: {}, // 👈 key-value storage
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { endpoint, params } = action.meta.arg;
        const key = `${endpoint}_${JSON.stringify(params)}`;

        state.loading = false;
        state.data[key] = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commonSlice.reducer;
