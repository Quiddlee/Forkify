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

const AJAX = async (url, uploadData) => {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

export default AJAX;
