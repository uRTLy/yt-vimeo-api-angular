

export default class Pagination {
  setConfig (items, itemsPerPage) {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.pages = this.getPages();
    return this;
  }
  splitToPages () {
    const { pages, items, itemsPerPage } = this;
    let splittedToPages = [];

    const stopSplitting = itemsPerPage * pages.length;

    for (let i = 0; i < stopSplitting ; i += itemsPerPage) {
      splittedToPages.push(items.slice(i, itemsPerPage + i));
    }

    return {
      pages,
      splittedToPages
    };
  }
  getPages () {
    const { items, itemsPerPage } = this;
    const quantityOfPages = Math.ceil(items.length / itemsPerPage);

    return Object.keys(items).map(value => parseInt(value, 10)).filter(value => {
      return value < quantityOfPages;
    });
  }
}
