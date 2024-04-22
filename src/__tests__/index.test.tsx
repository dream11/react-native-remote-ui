import ComponentCache from '../cache/componentCache';
import { getTTLFromResponseHeaders } from '../utils/utils';
import * as React from 'react';

// Test TTL value parsing from response headers
describe('getTTLFromResponseHeaders', () => {
  test('should return ttl value in milliseconds from response headers', () => {
    expect(getTTLFromResponseHeaders({ 'Cache-Control': 'max-age=3000' })).toBe(
      3000
    );
  });

  test('should return -1 if cache control header not found in response headers', () => {
    expect(getTTLFromResponseHeaders({})).toBe(-1);
  });

  test('should return -1 if non standard cache control header value is used', () => {
    expect(getTTLFromResponseHeaders({ 'Cache-Control': '3000' })).toBe(-1);
  });
});

// Test component caching
describe('Component Cache', () => {
  const cache = ComponentCache.getInstance<React.Component>();
  const uri = 'https://my-component.com/mock-component';
  const timestamp = Date.now();
  const component = new React.Component({});
  const cacheItem = {
    value: component,
    ttl: 3000,
    timestamp: timestamp,
  };
  cache.set(uri, cacheItem);

  test('should return ttl value stored against URI', () => {
    expect(cache.getTTL(uri)).toBe(3000);
  });

  test('should return timestamp value stored against URI', () => {
    expect(cache.getTimeStamp(uri)).toBe(timestamp);
  });

  test('should return component value stored against URI', () => {
    expect(cache.get(uri)).toBe(component);
  });
});
