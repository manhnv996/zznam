/**
 * Created by CPU60075_LOCAL on 12/17/2017.
 */

var _ = (function() {
    function r(_res) {
        return "Art/Friend/" + _res;
    }

    var FriendResource = {
        friend_arrowLeft: r("arrowLeft.png"),
        friend_arrowRight: r("arrowRight.png"),
        friend_bg: r("friend2.png"),
        friend_avatar: r("friend3.png"),
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