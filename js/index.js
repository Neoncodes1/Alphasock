/**
 * AlphaSock
 * A foundational WebSocket abstraction with future WhatsApp Web support.
 * Inspired by Baileys but forged from scratch.
 * Author: neoncodes1
 */

class AlphaSock {
  constructor(url = "wss://example.com", protocols = []) {
    this.url = url;
    this.protocols = protocols;
    this.socket = null;
  }

  connect() {
    if (this.socket) this.close();

    this.socket = new WebSocket(this.url, this.protocols);

    this.socket.onopen = () => console.log(`[AlphaSock] Connected to ${this.url}`);
    this.socket.onmessage = (event) => console.log(`[AlphaSock] Message:`, event.data);
    this.socket.onerror = (error) => console.error(`[AlphaSock] Error:`, error);
    this.socket.onclose = () => console.warn(`[AlphaSock] Connection closed`);
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
      console.log(`[AlphaSock] Sent:`, data);
    } else {
      console.error(`[AlphaSock] Cannot send, socket not open.`);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

module.exports = AlphaSock;
