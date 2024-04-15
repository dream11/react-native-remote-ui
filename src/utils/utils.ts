import { type RawAxiosResponseHeaders } from 'axios';
import { RSCResponseHeaders } from './constants';

export const getTTLFromResponseHeaders = (
  headers: Partial<RawAxiosResponseHeaders>
): number => {
  if (headers === undefined) {
    return -1;
  }
  const cacheControlHeader = headers[RSCResponseHeaders.ttl] as string;
  // Extract TTL from Cache-Control header
  // Example: "max-age=1000"
  // value is in milliseconds
  const maxAgeMatch = cacheControlHeader?.match(/max-age=(\d+)/);
  if (maxAgeMatch && maxAgeMatch.length > 1) {
    return parseInt(maxAgeMatch[1], 10);
  }
  // Default TTL value if not specified in headers
  return -1;
};
