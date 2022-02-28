/* eslint-disable linebreak-style */
import Modal from './Modal';

export default class DeleteModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.delete-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal delete-form-modal hidden" data-type="deleteModal" novalidate>
        <div class="form-title">Ticket deleting</div> 
        <p>Delete ticket from list?</p>       
        <div class="row btns-row">
          <button type="button" class="btn save-btn delete-save-btn">Delete</button>
          <button type="button" class="btn reset-btn delete-reset-btn">Cancel</button>
        </div>       
      </form>
    `;
  }
}
