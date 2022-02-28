/* eslint-disable linebreak-style */
import { v4 } from 'uuid';
import moment from 'moment';

export default class Ticket {
  constructor({
    description, name, status = false, id = v4(), created,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = JSON.parse(status);
    this.created = created || moment().format('DD.MM.YY hh:mm');
  }

  createMarkup() {
    return `
      <div class="ticket-box" data-id=${this.id} data-status=${this.status}>
        <div class="first-row">
          <div class="control status-box${this.status ? ' checked' : ''}"></div>
          <div class="name-box">${this.name}</div>
          <div class="date-box">${this.created}</div>
          <div class="control-box">
            <div class="control edit-box"></div>
            <div class="control delete-box"></div>
          </div>
        </div>
        <div class="description-box hidden">${this.description}</div>        
      </div>
    `;
  }

  bindToDom(container) {
    container.insertAdjacentHTML('beforeend', this.createMarkup());
  }
}
