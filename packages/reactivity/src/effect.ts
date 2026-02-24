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

  notify() {
    this.schedule();
  }
  schedule() {
    this.run();
  }
}
export function effect(fn, options = {}) {
  // debugger;
  const e = new ReactivityEffect(fn);
  Object.assign(e, options);
  e.run();
}
