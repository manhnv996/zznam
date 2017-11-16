var StorageItem = cc.Class.extend({
	type: 0, // ProductTypes
	quantity: 0,

	ctor: function(type, quantity) {
		this.type = type;
		this.quantity = quantity;
	}
});
