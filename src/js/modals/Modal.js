/* eslint-disable linebreak-style */
export default class Modal {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  init() {
    this.bindToDom();
  }

  show() {
    this.form.classList.remove('hidden');
    this.setPosition(this.parent);
  }

  hide() {
    this.form.classList.add('hidden');
    this.form.reset();
  }

  setPosition(target) {
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.y;
    const targetLeft = targetRect.x;
    const modWidth = this.form.offsetWidth;

    this.form.style.top = `${targetTop + window.pageYOffset - 30}px`;
    this.form.style.left = `${targetLeft + window.pageXOffset - (modWidth - targetRect.width) / 2}px`;
  }
}
