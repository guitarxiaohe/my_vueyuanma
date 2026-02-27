export let activeSub = null;

class ReactivityEffect {
  constructor(public fn: Function) {}

  run() {
    // debugger;
    const prevSub = activeSub;
    activeSub = this;
    try {
      return this.fn();
    } finally {
      activeSub = prevSub;
    }
  }
  // 当依赖发生变化时，调用当前effect实例的notify方法，notify方法会调用schedule方法，schedule方法会再次调用run方法，重新执行fn函数，从而实现响应式更新
  notify() {
    this.schedule();
  }
  // 默认直接执行run方法，也可以通过options传入scheduler函数来覆盖默认行为
  schedule() {
    this.run();
  }
}
export function effect(fn, options = {}) {
  // debugger;
  const e = new ReactivityEffect(fn);
  Object.assign(e, options);
  e.run();
  /**
   * 返回一个函数，调用时会执行effect的run方法
   * 这里的run方法会执行fn函数，并且在执行过程中会将activeSub设置为当前effect实例，这样在fn函数中访问到的activeSub就是当前effect实例，可以用来收集依赖
   * 当fn函数中的依赖发生变化时，会调用当前effect实例的notify方法，notify方法会调用schedule方法，schedule方法会再次调用run方法，重新执行fn函数，从而实现响应式更新
   */
  const render = e.run.bind(e);
  render.effect = e;
  return render;
}
