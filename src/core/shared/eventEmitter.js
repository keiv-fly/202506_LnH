export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, payload) {
    const listeners = this.events[event];
    if (listeners) {
      for (const fn of listeners) {
        fn(payload);
      }
    }
  }
}
