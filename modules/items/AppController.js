
const privateItems = Symbol("items");

export default class AppController{

  /*@ngInject*/
  constructor(ItemDataFactory) {

    var vm = this;

    this.dataFactory = ItemDataFactory;
    this.dataFactory.getAllItems()
      .success(function (param) {
        vm.items = param? param: [];
      })
      .error(function (error) {
        vm.status = 'Unable to load item data: ' + error.message;
      });

  }

  updateItem( item ) {

    var vm = this;

    this.dataFactory.updateItem(item)
      .success(function () {
        vm.status = 'Updated Item! Refreshing Item list.';
      })
      .error(function (error) {
        vm.status = 'Unable to update item: ' + error.message;
      });

  };

  addItem(description) {

    var vm = this;

    //Fake item data
    var item = {
      description: description,
      checked: false
    };

    this.dataFactory.addItem(item)
      .success(function () {
        vm.status = 'Inserted Item! Refreshing Item list.';
        vm.items.push(item);
      }).
      error(function(error) {
        vm.status = 'Unable to insert item: ' + error.message;
      });

  };

  deleteItem( item ) {

    var vm = this;

    this.dataFactory.deleteItem(item.id)
      .success(function () {
        vm.status = 'Deleted Item! Refreshing Item list.';
        for (var i = 0; i < vm.items.length; i++) {
          var selectedItem = vm.items[i];
          if (selectedItem.id === item.id) {
            vm.items.splice(i, 1);
            break;
          }
        }
      })
      .error(function (error) {
        vm.status = 'Unable to delete item: ' + error.message;
      });

  };

}
