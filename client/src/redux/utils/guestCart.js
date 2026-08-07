export const getGuestCart = () => {
  return JSON.parse(localStorage.getItem("guestCart")) || [];
};

export const saveGuestCart = (cart) => {
  localStorage.setItem("guestCart", JSON.stringify(cart));
};

export const clearGuestCart = () => {
  localStorage.removeItem("guestCart");
};
