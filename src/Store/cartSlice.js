import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const incomingItem = action.payload;
      const existingItem = state.items.find((item) => item.id === incomingItem.id);

      if (existingItem) {
        existingItem.quantity += incomingItem.quantity ?? 1;
        return;
      }

      state.items.push({
        ...incomingItem,
        quantity: incomingItem.quantity ?? 1,
      });
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
