import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import materialReducer from "./slices/materialSlice";
import workstationReducer from "./slices/workstationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        materials: materialReducer,
        workstations: workstationReducer 
    },
});

export default store;
