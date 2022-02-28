/* eslint-disable linebreak-style */
import Modal from './Modal';

export default class MsgModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.msg-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal msg-form-modal hidden" data-type="msgModal" novalidate>
        <div class="form-title">Action message</div>
          <p class="message-content"></p>
        </div>       
      </form>
    `;
  }
}
