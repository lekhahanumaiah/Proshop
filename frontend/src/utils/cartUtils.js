export const addDecimals = (num) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state) => {
  // Items price = sum of item.price * item.qty
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Shipping price (free if itemsPrice > 100)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Tax price (15%)
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // Total price = items + shipping + tax
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  // Persist cart in localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
