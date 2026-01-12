/**
 * @description: 类型判断相关的工具函数
 * @param {any} value
 * @return {boolean}
 */
export function isObject(value: any): value is Record<any, any> {
  return value !== null && typeof value === "object";
}

/**
 * @description: 判断是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value: any): value is string {
  return typeof value === "string";
}
