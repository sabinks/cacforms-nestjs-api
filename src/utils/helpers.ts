export const newDate = () => {
  const now = new Date();
  return new Date(now).toISOString();
};
