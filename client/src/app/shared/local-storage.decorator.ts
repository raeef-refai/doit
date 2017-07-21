function getLocalStorageItem(key: string): string | object {
  const item: string = localStorage.getItem(key);

  if (item && /\{|\}/.test(item)) {
    return JSON.parse(item);
  } else {
    return item;
  }
}

function setLocalStorageItem(key, value: any): void {
  if (!value) {
    return localStorage.removeItem(key);
  }

  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

export function LocalStorage(storageKey: string) {
  return (target: any, key: string) => {
    Reflect.defineProperty(target, key, {
      get: () => getLocalStorageItem(storageKey),

      set: (value: string | object) => {
        setLocalStorageItem(storageKey, value);
      },
    });
  };
}
