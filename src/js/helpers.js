import { TIMEOUT_SECONDS } from './config';

const timeout = (s) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

const getJSON = async (url) => {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  return data;
};

export default getJSON;
