import { activeSub } from "./effect";
import { link, proparger, Link } from "./system";

enum RefFlags {
  IS_REF = "__v_isRef",
}

class Refimpl<T> {
  // 值
  private _value: T;

  // 标记当前是ref对象
  private [RefFlags.IS_REF]: boolean = true;

  // 依赖来源
  private subs: Link;

  private subsTail: Link | undefined;
  constructor(value: T) {
    this._value = value;
  }

  get value() {
    trackRef(this);
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
    trigger(this);
  }
}

export function ref(fn) {
  return new Refimpl(fn);
}

export function isRef(value): boolean {
  return !!(value && value[RefFlags.IS_REF]);
}

/** 追踪ref的依赖
 * @param dep 依赖对象
 */
export function trackRef(dep) {
  if (activeSub) {
    link(dep, activeSub);
  }
}

/** 触发ref的依赖更新
 * @param dep 依赖对象
 */
export function trigger(dep) {
  console.log("dep ==>", dep);
  if (dep.subs) {
    proparger(dep.subs);
  }
}
