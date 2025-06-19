import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addToCart: (state, { payload }) => {
      // Sepette aynı üründen var mı
      const found = state.cart.find(
        (item) =>
          item.id === payload.item.id && item.type === payload.selectedType
      );
      if (found) {
        // Eğer sepette aynı elemandan varsa miktarını arttır
        found.amount++;
      } else {
        // Eğer sepette aynı elemandan yoksa sepete ekle
        state.cart.push({
          ...payload.item,
          type: payload.selectedType,
          amount: 1,
        });
      }
    },

    deleteFromCart: (state, { payload }) => {
      // Sepette aynı üründen var mı
      const index = state.cart.findIndex(
        (item) => item.id === payload.id && item.type === payload.type
      );
      if (state.cart[index].amount > 1) {
        // Eğer miktar 1'den fazla ise  miktarı azalt
        state.cart[index].amount--;
      } else {
        // Eğer miktar 1  ise  ürünü kaldır
        state.cart.splice(index, 1);
      }
    },
    createOrder: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, deleteFromCart, createOrder } = cartSlice.actions;

export default cartSlice.reducer;
