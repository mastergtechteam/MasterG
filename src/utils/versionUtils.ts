export const isVersionLower = (current: string, minimum: string): boolean => {
  const currentParts = current.split(".").map(Number);
  const minParts = minimum.split(".").map(Number);

  for (let i = 0; i < minParts.length; i++) {
    if ((currentParts[i] || 0) < (minParts[i] || 0)) return true;
    if ((currentParts[i] || 0) > (minParts[i] || 0)) return false;
  }

  return false;
};
