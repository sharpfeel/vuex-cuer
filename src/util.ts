import { KeyOf, Method, Methods } from "./type";

/**
 * 获取`ICuer`对象上的原链函数
 * @param obj
 */
export function keys<T>(obj?: T) {
  if (obj != null) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
      v => v != "constructor"
    ) as KeyOf<T>[];
  }
  return [];
}

/**
 * 覆盖 ICuer 对象，转换成 store 属性的类型
 * @param obj
 * @param keys
 */
export function cover<T>(
  obj: T | undefined,
  keys: KeyOf<T>[],
  replace: (key: KeyOf<T>, m: Method) => void
) {
  if (obj != null) {
    const ms: Methods = {};
    keys.forEach(key => {
      ms[key] = (obj[key] as unknown) as Method;
      if (ms[key]) {
        replace(key, ms[key]);
      }
    });
  }
}

/**
 *
 * @param obj
 * @param key
 * @param v
 */
export function assign<T, K extends string, V>(obj: T, key: K, v: V) {
  ((obj as unknown) as { [P in K]: V })[key] = v;
  return obj;
}

/**
 * 绑定state
 * @param obj
 * @param cuer
 */
export function bindState<T, V>(obj: T, state: V) {
  return assign(obj, "state", state);
}

/**
 * 绑定store
 * @param cuer
 * @param obj
 */
export function bindStore<T, V>(obj: T, cuer: V) {
  return assign(obj, "store", cuer);
}

/**
 * 重写 对象 属性
 */
export function rewrite<T>(
  obj: T | undefined,
  keys: KeyOf<T>[],
  write: (key: KeyOf<T>) => unknown
) {
  if (obj != null) {
    keys.forEach(key => {
      obj[key] = write(key) as T[KeyOf<T>];
    });
  }
}
