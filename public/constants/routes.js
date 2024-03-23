const BASE_URL = "http://localhost:3001/api";

export const ARTICLE_ROUTES = {
  CREATE: `${BASE_URL}/article`,
  FIND: `${BASE_URL}/article`,
  FIND: (writerId) => `${BASE_URL}/article/${writerId}`,
  FIND_BY_ID: (id) => `${BASE_URL}/article/${id}`,
  UPDATE: (id) => `${BASE_URL}/article/${id}`,
  DELETE: (id) => `${BASE_URL}/article/${id}`,
  FIND_BY_WRITER_ID: (writerId) => `${BASE_URL}/article/${writerId}`,
};


