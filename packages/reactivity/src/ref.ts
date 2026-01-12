import { activeSub } from "./effect";

enum RefFlags {
  IS_REF = "__v_isRef",
}

class Refimpl<T> {
  // 值
  private _value: T;

  // 标记当前是ref对象
  private [RefFlags.IS_REF]: boolean = true;

  // 依赖来源
  private subs;
  constructor(value: T) {
    this._value = value;
  }

  get value() {
    console.log("访问get函数 ==>", activeSub);
    // 保存依赖
    if (activeSub) {
      this.subs = activeSub;
    }
    return this._value;
  }

  set value(newValue: T) {
    console.log("访问set函数 ==>", this._value);
    this._value = newValue;

    this.subs && this.subs();
  }
}

export function ref(fn) {
  return new Refimpl(fn);
}

export function isRef(value): boolean {
  return !!(value && value[RefFlags.IS_REF]);
}
