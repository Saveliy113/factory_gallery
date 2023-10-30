export const apiConfig = {
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`,
  },
};

export const queryParams = {
  client_id: process.env.VUE_APP_ACCESS_KEY,
  count: 8,
  // query: state.searchQuery,
};
