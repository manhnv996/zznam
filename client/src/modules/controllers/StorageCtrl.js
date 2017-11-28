/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageCtrl = cc.Class.extend({

     getTotalItems: function (listItems) {
          var number = 0;
          for(var i = 0; i < listItems.length; i++) {
               number += listItems[i].getQuantityItem();
          }
          return number;
     }
});