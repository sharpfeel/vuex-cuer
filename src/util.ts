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

//绑定store
export function bind<T, V>(cuer: T, value: V) {
  Object.assign(value, {
    store: cuer
  });
  return value;
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
