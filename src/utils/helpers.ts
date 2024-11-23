import path from 'path';

export const newDate = () => {
  const now = new Date();
  return new Date(now).toISOString();
};
export const getExtension = (filename) => {
  const ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1];
};
