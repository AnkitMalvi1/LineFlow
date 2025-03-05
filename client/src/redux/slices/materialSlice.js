import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { toast } from "react-toastify";

// Fetch materials from API
export const fetchMaterials = createAsyncThunk("materials/fetchMaterials", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/materials");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch materials");
    }
});

const materialSlice = createSlice({
    name: "materials",
    initialState: { materials: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.loading = false;
                state.materials = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default materialSlice.reducer;
