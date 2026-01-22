export let activeSub = null;

class ReactivityEffect {
  constructor(public fn: Function) {}

  run() {
    const prevSub = activeSub;
    activeSub = this;
    try {
      return this.fn();
    } finally {
      activeSub = prevSub;
    }
  }
}
export function effect(fn) {
  debugger;

  const e = new ReactivityEffect(fn);
  e.run();
}
