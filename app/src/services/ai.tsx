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
  const form = new FormData();
  form.append('image', blob);

  const { data } = await http.post(AGE_DETECT_URL, { body: form });

  return data;
}

/**
 * Detect profanity from given string data.
 *
 * @param string
 */
export async function detectProfanity(string: string): Promise<any> {
  const { data } = await http.get(`${PROFANITY_DETECT_URL}?string=${string}`);

  return data;
}
