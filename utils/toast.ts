import toast from "react-hot-toast";

const addedToCartSuccess = () => {
  toast.success("Added to cart");
};

const addedToCartFailure = () => {
  toast.error("Failed to add to cart");
};

const deletedFromCartSuccess = () => {
  toast.success("Removed item from cart");
};

const deletedFromCartFailure = () => {
  toast.error("Failed to remove item from cart");
};

export {
  addedToCartSuccess,
  addedToCartFailure,
  deletedFromCartSuccess,
  deletedFromCartFailure,
};
