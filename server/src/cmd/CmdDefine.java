package cmd;

import cmd.send.demo.ResponseErrorCode;


public class CmdDefine {
    public static final short CUSTOM_LOGIN = 1;
    public static final short MANUAL_DISCONNECT = 2500;

    public static final short ERROR_CMD_ID = 999;

    public static final short USER_MULTI_IDS = 1000;
    public static final short AUTHEN_MULTI_IDS = 2000;
    public static final short FRIEND_MULTI_IDS = 3000;
    public static final short ADMIN_MULTI_IDS = 9000;


    public static final short GET_USER_INFO = 1001;
   
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

}
