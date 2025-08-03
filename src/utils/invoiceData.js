// src/utils/invoiceData.js
export const invoiceStore = {
  currentInvoice: null,
  
  setInvoiceData(data) {
    this.currentInvoice = data;
    // You can also save to localStorage for persistence
    localStorage.setItem('currentInvoice', JSON.stringify(data));
  },
  
  getInvoiceData() {
    if (!this.currentInvoice) {
      const saved = localStorage.getItem('currentInvoice');
      this.currentInvoice = saved ? JSON.parse(saved) : null;
    }
    return this.currentInvoice;
  },
  
  clearInvoiceData() {
    this.currentInvoice = null;
    localStorage.removeItem('currentInvoice');
  }
};