import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // 👈 yahi pura cart rahega
  meta: {
    problem: null,
    reason: '',
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 🔹 NEW: store problem + reason once
    setOtherCartMeta: (state, action) => {
      state.meta.problem = action.payload.problem;
      state.meta.reason = action.payload.reason;
    },

    replaceCart: (state, action) => {
      state.items = action.payload;
    },

    mergeCart: (state, action) => {
      action.payload.forEach(newItem => {
        const existing = state.items.find(
          item =>
            item.serviceType === newItem.serviceType &&
            item.acType === newItem.acType,
        );

        if (existing) {
          existing.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      });
    },

    updateQuantity: (state, action) => {
      const { serviceType, acType, delta } = action.payload;

      const item = state.items.find(
        i => i.serviceType === serviceType && i.acType === acType,
      );

      if (item) {
        item.quantity += delta;
      }

      state.items = state.items.filter(i => i.quantity > 0);
    },

    addOrMergeItems: (state, action) => {
      const { source, items } = action.payload;

      if (source === 'HOME') {
        state.items = items;
        return;
      }

      // VIEW_CART → MERGE
      items.forEach(newItem => {
        const index = state.items.findIndex(
          item =>
            item.serviceType === newItem.serviceType &&
            item.acType === newItem.acType,
        );

        if (index !== -1) {
          state.items[index].quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      });
    },

    clearCart: state => {
      state.items = [];
    },
  },
});



export const {
  setOtherCartMeta,
  replaceCart,
  mergeCart,
  clearCart,
  updateQuantity,
  addOrMergeItems,
} = cartSlice.actions;
export default cartSlice.reducer;
