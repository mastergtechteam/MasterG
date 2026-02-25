export const selectIsProfileComplete = state => {
  const profile = state.retailer.profile;

  if (!profile) return false;

  return (
    profile?.storeName &&
    profile?.ownerName &&
    profile?.address?.line1 &&
    profile?.address?.city &&
    profile?.address?.pincode
  );
};
