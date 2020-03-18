/**
 * 函数通用类型
 */
export type Method = (...args: unknown[]) => unknown;

/**
 * 函数通用类型集合
 */
export type Methods = { [key: string]: Method };

export type KeyOf<T> = Extract<keyof T, string>;

/**
 * 解析函数的参数
 */
export type Params<T> = Parameters<Extract<T, Method>>;
