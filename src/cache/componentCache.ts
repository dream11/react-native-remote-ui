export interface CacheItem<T> {
  // React component
  value: T;
  // TTL in milliseconds
  // Default is -1, which means cache will persist in app session
  // Cache will be purged for any new requests, based on ttl and timestamp values
  ttl: number;
  // Timestamp at which cache was created
  timestamp: number;
}

class RemoteComponentCache<T> {
  private static instance: RemoteComponentCache<any>;
  private cache: Map<string, CacheItem<T> | null>;

  constructor() {
    this.cache = new Map<string, CacheItem<T>>();
  }

  public static getInstance<T>(): RemoteComponentCache<T> {
    if (!RemoteComponentCache.instance) {
      RemoteComponentCache.instance = new RemoteComponentCache<T>();
    }
    return RemoteComponentCache.instance;
  }

  set(key: string, value: CacheItem<T> | null): void {
    this.cache.set(key, value);
  }

  get(key: string): T | null {
    const component = this.cache.get(key);
    if (component) {
      return component.value;
    }
    return null;
  }

  getTTL(key: string): number {
    const value = this.cache.get(key);
    if (value && value.ttl) {
      return value.ttl;
    }
    return -1;
  }

  getTimeStamp(key: string): number {
    const value = this.cache.get(key);
    if (value && value.timestamp) {
      return value.timestamp;
    }
    return -1;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export default RemoteComponentCache;
