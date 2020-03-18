export type MappingKey<T, V extends Record<keyof V, keyof T>> = V | (keyof T)[];

type MapValueOf<T> = (key: keyof T) => () => T[keyof T];
type MapMethodOf<T> = (key: keyof T) => T[keyof T];

/**
 * 对象的字符串数组映射
 * @param valueOf
 * @param arr
 */
export function mapValueOfKeys<T, V extends keyof T>(
  arr: V[],
  valueOf: MapValueOf<T>
) {
  const ret = {} as { [K in V]: () => T[K] };
  arr.forEach(key => {
    ret[key] = valueOf(key) as () => T[Extract<V, keyof T>];
  });
  return ret;
}

/**
 * 对象的json映射
 * @param valueOf
 * @param json
 */
export function mapValueOfJson<T, V extends Record<keyof V, keyof T>>(
  json: V,
  valueOf: MapValueOf<T>
) {
  const ret = {} as { [K in keyof V]: () => T[V[K]] };
  for (const k in json) {
    ret[k] = valueOf(json[k]) as T[V[Extract<keyof V, string>]];
  }
  return ret;
}

/**
 * 函数的数组映射
 * @param valueOf
 * @param arr
 */
export function mapMethodOfKeys<T, V extends keyof T>(
  arr: V[],
  valueOf: MapMethodOf<T>
) {
  const ret = {} as { [K in V]: T[K] };
  arr.forEach(key => {
    ret[key] = valueOf(key) as T[Extract<V, keyof T>];
  });
  return ret;
}

/**
 * 函数的json映射
 * @param valueOf
 * @param json
 */
export function mapMethodOfJson<T, V extends Record<keyof V, keyof T>>(
  json: V,
  valueOf: MapMethodOf<T>
) {
  const ret = {} as { [K in keyof V]: T[V[K]] };
  for (const k in json) {
    ret[k] = valueOf(json[k]) as T[V[Extract<keyof V, string>]];
  }
  return ret;
}
