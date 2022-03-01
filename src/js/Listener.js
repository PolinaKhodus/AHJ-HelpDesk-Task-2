/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
import Ticket from './Ticket';

export default class Listener {
  static onPageLoad() {
    const xhr = new XMLHttpRequest();

    // const URL = 'http://localhost:7070';
    const URL = 'https://polina-khodus-heroku.herokuapp.com';

    xhr.open('GET', `${URL}?method=allTicket`, true);

    xhr.addEventListener('load', () => {
      const tickets = JSON.parse(xhr.response);

      if (!tickets.length) {
        return;
      }

      this.ticketsBox.textContent = '';
      tickets.forEach((ticket) => (new Ticket(ticket)).bindToDom(this.ticketsBox));
    });

    xhr.send();
  }

  static onAddClick() {
    this.modals.newModal.show();
    this.widget.classList.add('blocked');
  }

  static onControlClick(event) {
    const { target } = event;
    const ticket = target.closest('.ticket-box');
    this.selectedTicket = ticket || null;

    if (target.classList.contains('status-box')) {
      const { id } = this.selectedTicket.dataset;
      const params = new URLSearchParams();
      const status = JSON.parse(this.selectedTicket.dataset.status);

      this.selectedTicket.dataset.status = status ? 'false' : 'true';
      const newStatus = JSON.parse(this.selectedTicket.dataset.status);

      params.append('method', 'checkTicket');
      params.append('id', id);
      params.append('status', String(newStatus));

      // const URL = 'http://localhost:7070';
      const URL = 'https://polina-khodus-heroku.herokuapp.com';

      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', URL, true);
      xhr.send(params);

      target.classList.toggle('checked');
      return;
    }

    if (target.classList.contains('edit-box')) {
      const modal = this.modals.editModal;
      const name = this.selectedTicket.querySelector('.name-box').innerText;
      const descript = this.selectedTicket.querySelector('.description-box').innerText;

      modal.form.querySelector('#edit-description').value = name;
      modal.form.querySelector('#edit-full-description').value = descript;

      modal.show();
      this.widget.classList.add('blocked');
      return;
    }

    if (target.classList.contains('delete-box')) {
      this.modals.deleteModal.show();
      this.widget.classList.add('blocked');
    }
  }

  static onBtnClick(event) {
    const { target } = event;
    const form = event.currentTarget;
    const { type } = form.dataset;
    const params = new URLSearchParams();

    if (target.classList.contains('add-save-btn')) {
      const data = {};
      const formData = new FormData();

      [...form.elements].filter(({ name }) => name)
        .forEach(({ name, value }) => {
          data[name.split('-')[1]] = value.trim() ? value : 'No description';
        });

      const ticket = new Ticket(data);
      ticket.bindToDom(this.ticketsBox);

      Object.keys(ticket).forEach((key) => formData.append(key, ticket[key]));
      this.modals[type].hide();
      this.widget.classList.remove('blocked');

      // const URL = 'http://localhost:7070';
      const URL = 'https://polina-khodus-heroku.herokuapp.com';

      const xhr = new XMLHttpRequest();

      xhr.open('POST', URL, true);
      xhr.addEventListener('load', () => {
        this.modals.msgModal.form.querySelector('p').textContent = xhr.response;
        this.modals.msgModal.show();
        setTimeout(() => this.modals.msgModal.hide(), 1000);
      });
      xhr.send(formData);
      return;
    }

    if (target.classList.contains('delete-save-btn')) {
      const { id } = this.selectedTicket.dataset;
      params.append('method', 'deleteTicket');
      params.append('id', id);
      
      // const URL = 'http://localhost:7070';
      const URL = 'https://polina-khodus-heroku.herokuapp.com';

      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', URL, true);

      xhr.addEventListener('load', () => {
        this.modals.msgModal.form.querySelector('p').textContent = xhr.response;
        this.modals.msgModal.show();
        setTimeout(() => this.modals.msgModal.hide(), 1000);

        this.selectedTicket.remove();
        this.modals.deleteModal.hide();
        this.widget.classList.remove('blocked');
      });

      xhr.send(params);
      return;
    }

    if (target.classList.contains('edit-save-btn')) {
      const { id } = this.selectedTicket.dataset;
      params.append('method', 'editTicket');
      params.append('id', id);

      [...form.elements].filter(({ name }) => name)
        .forEach(({ name, value }) => {
          params.append(name.split('-')[1], value.trim() ? value : 'No description');
        });

      // const URL = 'http://localhost:7070';
      const URL = 'https://polina-khodus-heroku.herokuapp.com';

      const xhr = new XMLHttpRequest();
      xhr.open('POST', URL, true);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);

        this.modals.msgModal.form.querySelector('p').textContent = response.text;
        this.modals.msgModal.show();
        setTimeout(() => {
          this.modals.msgModal.hide();
          this.ticketUpdate(response.data);
        }, 1000);

        this.modals.editModal.hide();
        this.widget.classList.remove('blocked');
      });

      xhr.send(params);

      return;
    }

    if (target.classList.contains('reset-btn')) {
      this.modals[type].hide();
      this.widget.classList.remove('blocked');
    }
  }

  static onNameClick(event) {
    const { target } = event;
    const ticket = target.closest('.ticket-box');
    this.selectedTicket = ticket || null;

    if (!target.classList.contains('name-box')) {
      return;
    }

    const descriptEl = this.selectedTicket.querySelector('.description-box');

    descriptEl.classList.toggle('hidden');
  }
}
