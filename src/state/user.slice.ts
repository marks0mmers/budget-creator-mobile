import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginUser, User} from "../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../constants/Constants";

const login = createAsyncThunk(
    "users/login",
    async (loginUser: LoginUser) => {
        const res = await fetch(`${API_URL}/api/users/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(loginUser),
        });
        const user: User & {token?: string} | undefined = await res.json();
        if (user?.token) {
            await AsyncStorage.setItem("token", user?.token);
            delete user.token;
        }
        return user;
    }
);

const getCurrentUser = createAsyncThunk(
    "users/getCurrentUser",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${API_URL}/api/users/current`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
                }
            });
            const user: User = await res.json();
            return user;
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)

interface UsersState {
    currentUser?: User;
    failed: boolean;
    loading: boolean;
}

const initialState: UsersState = {
    currentUser: undefined,
    failed: false,
    loading: false,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = true;
            state.currentUser = action.payload;
            state.failed = false;
        });

        builder.addCase(getCurrentUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, state => {
            state.loading = false;
            state.failed = true;
        })
    }
});

export {
    login,
    getCurrentUser,
};

export default usersSlice.reducer;
