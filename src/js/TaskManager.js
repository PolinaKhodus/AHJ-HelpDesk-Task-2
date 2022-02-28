/* eslint-disable linebreak-style */
import Listener from './Listener';
import AddModal from './modals/AddModal';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import MsgModal from './modals/MsgModal';

export default class TasckManager {
  constructor() {
    this.widget = document.querySelector('.manager-box');
    this.addBtnEl = document.querySelector('.add-btn');
    this.ticketsBox = document.querySelector('.tickets-box');
    this.selectedTicket = null;
  }

  init() {
    this.initModals();
    this.registerListeners();
  }

  registerListeners() {
    document.addEventListener('DOMContentLoaded', () => Listener.onPageLoad.call(this));
    this.addBtnEl.addEventListener('click', () => Listener.onAddClick.call(this));
    this.ticketsBox.addEventListener('click', (event) => Listener.onControlClick.call(this, event));

    Object.keys(this.modals).forEach((key) => {
      if (key !== 'msgModal') {
        this.modals[key].form.addEventListener('click', (event) => {
          Listener.onBtnClick.call(this, event);
        });
      }
    });

    this.ticketsBox.addEventListener('click', (event) => Listener.onNameClick.call(this, event));
  }

  initModals() {
    this.modals = {
      newModal: new AddModal(this.ticketsBox),
      editModal: new EditModal(this.ticketsBox),
      deleteModal: new DeleteModal(this.ticketsBox),
      msgModal: new MsgModal(this.ticketsBox),
    };
  }

  ticketUpdate({ name, description }) {
    const nameEl = this.selectedTicket.querySelector('.name-box');
    const descriptionEl = this.selectedTicket.querySelector('.description-box');

    nameEl.textContent = name;
    descriptionEl.textContent = description.trim() ? description : 'No description';
  }
}
