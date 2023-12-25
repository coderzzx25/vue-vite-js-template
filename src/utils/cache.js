const CacheType = {
  local: 'local',
  session: 'session'
};

class Cache {
  constructor(type) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage;
  }

  setCache(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key) {
    this.storage.removeItem(key);
  }

  clearCache() {
    this.storage.clear();
  }
}

const localCache = new Cache(CacheType.local);
const sessionCache = new Cache(CacheType.session);

export { localCache, sessionCache };
