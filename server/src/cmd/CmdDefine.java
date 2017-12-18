package cmd;


public class CmdDefine {
    public static final short CUSTOM_LOGIN = 1;
    public static final short MANUAL_DISCONNECT = 2500;

    public static final short ERROR_CMD_ID = 999;

    public static final short USER_MULTI_IDS = 1000;
    public static final short AUTHEN_MULTI_IDS = 2000;
    public static final short FRIEND_MULTI_IDS = 3000;
    public static final short ADMIN_MULTI_IDS = 9000;


    public static final short GET_USER_INFO = 1001;
    public static final short GET_USER = 1002; // New get user
    public static final short ADD_MONEY = 1101;
   
    //Log cmd
    public static final short MOVE = 2001;
    
    //
    public static final short GAME_INFO = 5099;    
    public static final short RESPONSE_ERROR_CODE = 5098;
    
    public static final short PLANT = 5001;
    public static final short CROP = 5002;
    public static final short PLANT_BOOST = 5003;
    public static final short BUY_ITEM_BY_RUBI = 5004;
    
//    public static final short RESPONSE_FIELD_STATUS = 5011;

    public static final short RESPONSE_SYNC_USER_INFO = 5081;
    public static final short RESPONSE_SYNC_FIELD_STATUS = 5082;
    public static final short RESPONSE_SYNC_STORAGE = 5083;
    public static final short RESPONSE_SYNC_FOOD_STORAGE_ITEM = 5084;
    
    //    
    public static final short MAKE_ORDER = 10001;
    public static final short CANCEL_ORDER = 10002;
    public static final short CREATE_NEW_ORDER = 10003;
    public static final short BOOST_WAIT_ORDER = 10004;
    public static final short RECEIVE_DELIVERY_CAR = 10009;
    
    public static final short MAKE_ORDER_NPC = 10011;
    public static final short CANCEL_ORDER_NPC = 10012;
    public static final short CREATE_NEW_ORDER_NPC = 10013;
    
    public static final short RESPONSE_SYNC_ORDER = 10081;    
    public static final short RESPONSE_SYNC_CAR = 10089;
    public static final short RESPONSE_SYNC_ORDER_NPC = 10091;
    
    //
    public static final short SELL_PRODUCT = 13001;
    public static final short BUY_PRODUCT = 13002;
    public static final short RECEIVE_MONEY_FROM_SOLD_PRODUCT = 13003;
    public static final short CANCEL_SELL_PRODUCT = 13004;
    public static final short UNLOCK_SLOT_MY_SHOP = 13005;
    
    public static final short RESPONSE_SYNC_PRODUCT_SALE = 13081;
    //
    
    
    public static final short MOVE_FIELD = 6001;
    public static final short MOVE_STORAGE = 6002;
    public static final short MOVE_MAP_BLOCK = 6003;
    public static final short RESPONSE_MOVE = 6100;
    
    
    public static final short BUY_MAP_OBJECT_REQUEST = 7001;
    public static final short BUY_MAP_OBJECT_BY_RUBY = 7002;
    public static final short BUY_ANIMAL = 7003;
    public static final short BUY_ANIMAL_BY_RUBY = 7004;
    public static final short RESPONSE_BUY_OBJECT = 7100;
    
    public static final short BUY_TOOL_REQUEST = 8001;
    public static final short UPGRADE_STORAGE_REQUEST = 8002;
    public static final short RESPONSE_UPGRADE_STORAGE = 8100;
    public static final short RESPONSE_BUY_TOOL_UPGRADE = 8101;
    
    public static final short BUILD_COMPLETED_REQUEST = 9001;
    public static final short BOOST_BUILD_REQUEST = 9002;
    
    public static final short GET_FRIENDS = 3001;
    public static final short FRIEND_SEND_MESSAGE = 3002;
    public static final short MESSAGE_GET_BOX = 3003;
    public static final short MESSAGE_DELETE = 3004;
    public static final short MESSAGE_MARK_AS_READ = 3005;
    public static final short FRIEND_GET_PLAYING = 3006;
    public static final short FRIEND_GET_FROM_SOCIAL_NETWORK = 3007;
    public static final short FRIEND_ADD = 3008;
    public static final short FRIEND_REMOVE = 3009;
    public static final short FRIEND_GET_ONLINE = 3010;
    public static final short FRIEND_GET_FROM_DB = 3011;
    public static final short FRIEND_GET_SUGGESTIONS = 3012;
    public static final short FRIEND_ACCEPT_INVITATION = 3013;
    public static final short FRIEND_GET_PORTAL = 3014;
    public static final short FRIEND_ON_OFF = 3015;

    public static final short RELOAD_CONFIG = 9101;
    public static final short FRIEND_SEARCH_BY_NAME = 3016;
    public static final short FRIEND_SEND_INVITATION = 3017;
    public static final short FRIEND_GET_INVITATIONS = 3018;
    public static final short FRIEND_RESPONSE_INVITATION = 3019;
    public static final short FRIEND_SET_STAR = 3020;

    // Animal
    public static final short ANIMAL_HARVEST = 12001;
    public static final short ANIMAL_FEED = 12002;
    public static final short ANIMAL_BOOST = 12003;

    // Nature
    public static final short NATURE_COLLECT = 13001;
    
    // Friend
    public static final short FRIEND_GET_LIST = 14001;
    public static final short FRIEND_GET_INFO = 14002;
}
