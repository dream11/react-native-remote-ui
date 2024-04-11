class ComponentCache<T> {
  // TODO implement TTL based cache bursting
  private static instance: ComponentCache<any>;
  private cache: Map<string, T | null>;

  constructor() {
    this.cache = new Map<string, T>();
  }

  public static getInstance<T>(): ComponentCache<T> {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache<T>();
    }
    return ComponentCache.instance;
  }

  set(key: string, value: T | null): void {
    this.cache.set(key, value);
  }

  get(key: string): T | null {
    const component = this.cache.get(key);
    if (component) {
      return component;
    }
    return null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export default ComponentCache;
