/* eslint-disable linebreak-style */
import Modal from './Modal';

export default class AddModal extends Modal {
  // eslint-disable-next-line  no-useless-constructor
  constructor(parent) {
    super(parent);
  }

  init() {
    super.init();
    this.form = document.querySelector('.add-form-modal');
  }

  bindToDom() {
    document.body.insertAdjacentHTML('beforeend', this.createMarkup());
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup() {
    return `
      <form class="modal add-form-modal hidden" data-type="newModal" novalidate>
        <div class="form-title">Add ticket</div>
        
        <div class="row name-row">
          <label for="add-description">Shortcart</label>
          <input type="text" class="ticket-name" id="add-description" name="ticket-name">          
        </div> 
        <div class="row cost-row">
          <label for="add-full-description">Full description</label>
          <textarea type="text" class="ticket-description" id="add-full-description" name="ticket-description"></textarea>          
        </div>        
        <div class="row btns-row">
          <button type="button" class="btn save-btn add-save-btn">Save</button>
          <button type="button" class="btn reset-btn add-reset-btn">Cancel</button>
        </div>       
      </form>
    `;
  }
}
