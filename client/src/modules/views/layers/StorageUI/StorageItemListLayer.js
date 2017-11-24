/**
 * Created by CPU60075_LOCAL on 24/11/2017.
 */

var StorageItemListLayer = cc.Layer.extend({
    _listItems: null,

    ctor: function (listItems) {
        this._super();

        this._listItems = listItems;
    }

});