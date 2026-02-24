export interface Link {
  sub: Function;

  nextSub: Link | undefined;

  prevSub: Link | undefined;
}
/**
 * 关联订阅者
 * 建立链表关系
 * @param dep 依赖对象
 * @param sub 订阅者函数
 */
export function link(dep, sub) {
  const newLink: Link = {
    sub,
    nextSub: undefined,
    prevSub: undefined,
  };
  /**
   * 关联链表
   * 判断是否有尾，如果有尾节点下级指向当前节点，当前节点上级指向尾节点，更新尾节点为当前节点
   */
  if (dep.subsTail) {
    dep.subsTail.nextSub = newLink;
    newLink.prevSub = dep.subsTail;
    dep.subsTail = newLink;
  } else {
    dep.subs = newLink;
    dep.subsTail = newLink;
  }
}

/**
 * 通知订阅者更新
 * @param dep
 * @param sub
 */
export function proparger(subs) {
  let link = subs;
  const queuedEffect = [];
  while (link) {
    console.log("link ==>", link);
    queuedEffect.push(link.sub);
    link = link.nextSub;
  }
  queuedEffect.forEach((effect) => effect.notify());
}
