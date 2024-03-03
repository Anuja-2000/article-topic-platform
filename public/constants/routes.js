const BASE_URL = "http://localhost:3001/api";

export const ARTICLE_ROUTES = {
  CREATE: `${BASE_URL}/article`,
  FIND: `${BASE_URL}/article`,
  FIND_BY_ID: (id) => `${BASE_URL}/article/${id}`,
  UPDATE: (id) => `${BASE_URL}/article/${id}`,
  DELETE: (id) => `${BASE_URL}/article/${id}`,
};


