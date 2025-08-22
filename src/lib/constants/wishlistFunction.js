export const handleWishlistFunction = (setWishlist, product) => {
  const productId = product?._id;
  if (!productId) return;

  // Local Storage se wishlist get karo
  let storedWishlist = JSON.parse(localStorage.getItem("bottomshub_wishlist")) || [];

  if (storedWishlist.includes(productId)) {
    // Agar product already wishlist me hai → remove karo
    storedWishlist = storedWishlist.filter((id) => id !== productId);
    setWishlist(false);
    console.log("Removed from wishlist:", productId);
  } else {
    // Agar nahi hai → add karo
    storedWishlist.push(productId);
    setWishlist(true);
    console.log("Added to wishlist:", productId);
  }

  // Local Storage update karo
  localStorage.setItem("bottomshub_wishlist", JSON.stringify(storedWishlist));
};
