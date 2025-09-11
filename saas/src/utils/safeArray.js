// Safe array utility functions
export const safeMap = (array, callback) => {
  return Array.isArray(array) ? array.map(callback) : [];
};

export const safeSome = (array, callback) => {
  return Array.isArray(array) ? array.some(callback) : false;
};

export const safeFilter = (array, callback) => {
  return Array.isArray(array) ? array.filter(callback) : [];
};

export const safeFind = (array, callback) => {
  return Array.isArray(array) ? array.find(callback) : undefined;
};

export const safeLength = (array) => {
  return Array.isArray(array) ? array.length : 0;
};

export const safeForEach = (array, callback) => {
  if (Array.isArray(array)) {
    array.forEach(callback);
  }
}; 