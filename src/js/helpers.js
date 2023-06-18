import { TIMEOUT_SECONDS } from './config';

/**
 * @param s {number}
 * @returns {Promise<error>}
 */
const timeout = (s) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

/**
 * @param url {string}
 * @returns {Promise<Object | Error>}
 */
const getJSON = async (url) => {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

/**
 * @param url {string}
 * @param uploadData {Object}
 * @returns {Promise<*>}
 */
export const sentJSON = async (url, uploadData) => {
  const fetchPro = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  });

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

export default getJSON;
