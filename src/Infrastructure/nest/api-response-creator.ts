export const apiResponseCreator = {
  success: (data: any) => ({ success: true, data, error: null }),
  failure: (error: any) => ({ success: false, error, data: null }),
};
