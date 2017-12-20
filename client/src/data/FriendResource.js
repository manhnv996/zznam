/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var _ = (function() {
    function r(_res) {
        return "Art/Friend/" + _res;
    }

    var FriendResource = {
        friend_bg: r("BG.png"),
        friend_avatar: r("slot11.png"),
        button_friend: r("Button-banbe.png"),
        btn_addFriend: r("addFriend2.png"),

        henry: r("Henry.png"),

        userShop_cart: r("userShop.png")
    };

    var g_FriendResource = [];


    for (var k in FriendResource) {
        g_SoundResource.push(FriendResource[k]);
    }
    return {
        FriendResource: FriendResource,
        g_FriendResource: g_FriendResource
    }
})();

var FriendResource = _.FriendResource;
var g_FriendResource = _.g_FriendResource;