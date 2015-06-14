/**
 * Idea from http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
 */
export default class ItemDataFactory{

  /*@ngInject*/
  constructor($http) {
    this.urlBase = '/items_rest';
    this.http = $http;
  };

  getAllItems(){
    return this.http.get( this.urlBase );
  };

  getItem(id) {
    return this.http.get(this.urlBase + '/' + id);
  };

  addItem( item ){
    item.checked = false;
    return this.http.post(this.urlBase, item);
  };

  updateItem(item) {
    return this.http.put(this.urlBase + '/' + item.id, item)
  };

  deleteItem(id) {
    return this.http.delete(this.urlBase + '/' + id);
  };

  static createFactory($http){
    return new ItemDataFactory($http);
  };

}