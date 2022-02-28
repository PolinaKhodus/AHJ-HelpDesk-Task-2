/* eslint-disable linebreak-style */
import Modal from './Modal';

export default class EditModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.edit-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal edit-form-modal hidden" data-type="editModal" novalidate>
        <div class="form-title">Ticket editing</div>
        
        <div class="row name-row">
          <label for="edit-description">Название</label>
          <input type="text" class="ticket-name" id="edit-description" name="ticket-name">          
        </div> 
        <div class="row cost-row">
          <label for="edit-full-description">Стоимость</label>
          <textarea type="text" class="ticket-description" id="edit-full-description" name="ticket-description"></textarea>          
        </div>        
        <div class="row btns-row">
          <button type="button" class="btn save-btn edit-save-btn">Save</button>
          <button type="button" class="btn reset-btn edit-reset-btn">Cancel</button>
        </div>       
      </form>
    `;
  }
}
