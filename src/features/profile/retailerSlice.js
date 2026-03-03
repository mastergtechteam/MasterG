// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   profile: {
//     id: null,
//     retailerId: null,
//     ownerName: '',
//     storeName: '',
//     status: 'PENDING',

//     storeImage: '',

//     contact: {
//       mobile: '',
//       alternateMobile: '',
//       email: '',
//     },

//     address: {
//       line1: '',
//       line2: '',
//       area: '',
//       city: '',
//       state: '',
//       pincode: '',
//     },

//     documents: {
//       panNumber: '',
//       gstNumber: '',
//       panImage: '',
//       gstImage: '',
//     },

//     createdAt: null,
//     updatedAt: null,
//   },
//   loading: false,
// };

// const retailerSlice = createSlice({
//   name: 'retailer',
//   initialState,
//   reducers: {
//     setRetailerProfile: (state, action) => {
//       const payload = action.payload || {};

//       // Assign only available values (fallback to existing state)
//       state.profile = {
//         ...state.profile,
//         ...payload,
//         contact: {
//           ...state.profile.contact,
//           ...(payload.contact || {}),
//         },
//         address: {
//           ...state.profile.address,
//           ...(payload.address || {}),
//         },
//         documents: {
//           ...state.profile.documents,
//           ...(payload.documents || {}),
//         },
//       };
//     },

//     clearRetailerProfile: state => {
//       state.profile = initialState.profile;
//     },
//   },
// });

// export const { setRetailerProfile, clearRetailerProfile } =
//   retailerSlice.actions;

// export default retailerSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRetailerProfileApi } from '../../screens/services/Profile/profileService';

//
// ✅ Async Thunk
//
export const loadRetailerProfile = createAsyncThunk(
  'retailer/loadProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchRetailerProfileApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//
// ✅ Initial State (KEEP YOUR STRUCTURE)
//
const initialState = {
  profile: {
    id: null,
    retailerId: null,
    ownerName: '',
    storeName: '',
    status: 'PENDING',

    storeImage: '',

    contact: {
      mobile: '',
      alternateMobile: '',
      email: '',
    },

    address: {
      line1: '',
      line2: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
    },

    documents: {
      panNumber: '',
      gstNumber: '',
      panImage: '',
      gstImage: '',
    },

    createdAt: null,
    updatedAt: null,
  },
  loading: false,
  error: null,
};

//
// ✅ Slice
//
const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setRetailerProfile: (state, action) => {
      const payload = action.payload || {};

      state.profile = {
        ...state.profile,
        ...payload,
        contact: {
          ...state.profile.contact,
          ...(payload.contact || {}),
        },
        address: {
          ...state.profile.address,
          ...(payload.address || {}),
        },
        documents: {
          ...state.profile.documents,
          ...(payload.documents || {}),
        },
      };
    },

    clearRetailerProfile: state => {
      state.profile = initialState.profile;
      state.loading = false;
      state.error = null;
    },
  },

  //
  // ✅ Add Async Handling Here
  //
  extraReducers: builder => {
    builder
      .addCase(loadRetailerProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRetailerProfile.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload || {};

        state.profile = {
          ...state.profile,
          ...payload,
          contact: {
            ...state.profile.contact,
            ...(payload.contact || {}),
          },
          address: {
            ...state.profile.address,
            ...(payload.address || {}),
          },
          documents: {
            ...state.profile.documents,
            ...(payload.documents || {}),
          },
        };
      })
      .addCase(loadRetailerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRetailerProfile, clearRetailerProfile } =
  retailerSlice.actions;

export default retailerSlice.reducer;
