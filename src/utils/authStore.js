let confirmationResult = null;

export const setConfirmation = value => {
  confirmationResult = value;
};

export const getConfirmation = () => {
  return confirmationResult;
};
