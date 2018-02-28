// Firefox和Chrome早期版本中带有前缀
const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;
let observer;
export function childListChangeObserver(selector, done) {
  if (observer) {
    observer.disconnect();
  }
  // 选择目标节点
  let target = document.querySelector(selector);
  // 创建观察者对象
  observer = new MutationObserver(function(mutations) {
    // 停止观察
    observer.disconnect();
    observer = undefined;
    done();
  });
  // 配置观察选项:
  let config = { childList: true };
  // 传入目标节点和观察选项
  observer.observe(target, config);
}
export function shouldChildNotEmptyObserver(selector, done) {
  if (observer) {
    observer.disconnect();
  }
  // 选择目标节点
  let target = document.querySelector(selector);
  // 创建观察者对象
  observer = new MutationObserver(function(mutations) {
    // 停止观察
    observer.disconnect();
    observer = undefined;
    expect(!!document.querySelector(selector).innerHTML).to.equal(true);
    done();
  });
  // 配置观察选项:
  let config = { childList: true };
  // 传入目标节点和观察选项
  observer.observe(target, config);
}
export function shouldChildEmptyObserver(selector, done) {
  if (observer) {
    observer.disconnect();
  }
  // 选择目标节点
  let target = document.querySelector(selector);
  // 创建观察者对象
  observer = new MutationObserver(function(mutations) {
    // 停止观察
    observer.disconnect();
    observer = undefined;
    expect(!document.querySelector(selector).innerHTML).to.equal(true);
    done();
  });
  // 配置观察选项:
  let config = { childList: true };
  // 传入目标节点和观察选项
  observer.observe(target, config);
}

export function attributesChangeObserver(selector, callback) {
  if (observer) {
    observer.disconnect();
  }
  // 选择目标节点
  let target = document.querySelector(selector);
  // 创建观察者对象
  observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    observer = undefined;
    callback && callback();
  });
  // 配置观察选项:
  let config = {
    attributes: true,
  };
  // 传入目标节点和观察选项
  observer.observe(target, config);
}

export function isFullscreen() {
  const documentContext = document;
  return (
    documentContext.fullscreenElement ||
    documentContext.webkitCurrentFullScreenElement ||
    documentContext.mozFullScreenElement ||
    documentContext.msFullscreenElement
  );
}