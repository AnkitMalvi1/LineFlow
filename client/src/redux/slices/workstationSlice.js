import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { toast } from "react-toastify";

// ✅ Fetch all workstations
export const fetchWorkstations = createAsyncThunk(
    "workstations/fetchWorkstations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/workstations");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch workstations");
        }
    }
);

// ✅ Create a new workstation
export const createWorkstation = createAsyncThunk(
    "workstations/createWorkstation",
    async (workstation, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/workstations", workstation);
            toast.success("Workstation created successfully");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create workstation");
        }
    }
);

// ✅ Update workstation status
export const updateWorkstation = createAsyncThunk(
    "workstations/updateWorkstation",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const { data } = await API.put(`/workstations/${id}`, { status });
            toast.success("Workstation status updated");
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update workstation");
        }
    }
);

const workstationSlice = createSlice({
    name: "workstations",
    initialState: { workstations: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkstations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWorkstations.fulfilled, (state, action) => {
                state.loading = false;
                state.workstations = action.payload;
            })
            .addCase(fetchWorkstations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createWorkstation.fulfilled, (state, action) => {
                state.workstations.push(action.payload);
            })
            .addCase(updateWorkstation.fulfilled, (state, action) => {
                const index = state.workstations.findIndex(w => w._id === action.payload._id);
                if (index !== -1) state.workstations[index] = action.payload;
            });
    },
});

export default workstationSlice.reducer;
