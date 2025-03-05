import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const response = await API.post("/orders", orderData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Fetch orders from API
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get("/orders");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState: { orders: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
