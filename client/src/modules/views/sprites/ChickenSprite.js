var ChickenSprite = AnimalSprite.extend({
	ctor: function() {
		this._super(resAniId.Chicken_Fix);
	}
});

ChickenSprite.Idle1 = 'Chicken_Idle1';
ChickenSprite.Idle2 = 'Chicken_Idle2';
ChickenSprite.Idle3 = 'Chicken_Idle3';
ChickenSprite.Idle4 = 'Chicken_Idle4';
// ChickenSprite.Transition = 'Chicken_Transition';
ChickenSprite.Hungry = 'Chicken_Hungry';
ChickenSprite.Harvest = 'Chicken_Harvest';
ChickenSprite.Walk = 'Chicken_walk';
