import {
  CartState,
} from "@/components/shared/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  myCart: {
    userEmail: "",
    userName: "",
    myCartsData: [],
  },
  isPending: true,
  isRejected: false,
};

const myCartSlice = createSlice({
  name: "myCart",
  initialState,
  reducers: {
    addItems: (
      state,
      {
        payload,
      }: PayloadAction<{
        userEmail: string;
        userName: string;
        myCartsData: CartState["myCart"]["myCartsData"];
      }>
    ) => {
      const { userName, userEmail, myCartsData } = payload;
      state.myCart.myCartsData = [...myCartsData];
      state.myCart.userName = userName;
      state.myCart.userEmail = userEmail;
    },
  },
});

export const { addItems } = myCartSlice.actions;
export default myCartSlice.reducer;
