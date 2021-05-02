import http from '../utils/http';

import { dataURLtoBlob } from '../utils/string';
import { AGE_DETECT_URL, PROFANITY_DETECT_URL } from '../constants/endpoints';

/**
 * Detect age of the user in the image.
 *
 * @returns {Promise<Object>}
 */
export async function detectAge(image: any): Promise<any> {
  const blob = dataURLtoBlob(image);
  const data = new FormData();
  data.append('image', blob);

  const res = await http.post(AGE_DETECT_URL, { body: data });

  return res;
}

/**
 * Detect profanity from given string data.
 *
 * @param string
 */
export async function detectProfanity(string: string): Promise<any> {
  const res = await http.get(`${PROFANITY_DETECT_URL}?string=${string}`);

  return res;
}
