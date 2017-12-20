/**
 * Created by CPU60075_LOCAL on 12/15/2017.
 */
var _ = (function() {
    function r(_res) {
        return "Sound_Music/Sound/mp3/" + _res;
    }

    var SoundResource = {
        ani_cow_idle_mp3: r("ani_cow_idle.mp3"),
        ani_cow_select_mp3: r("ani_cow_select.mp3"),

        ani_chicken_idle01_mp3: r("ani_hen_idle_01.mp3"),
        ani_chicken_idle02_mp3: r("ani_hen_idle_02.mp3"),
        ani_chicken_select_mp3: r("ani_hen_select.mp3"),

        ani_feed_mp3: r("ani_feed.mp3"),
        ani_harvest_product_mp3: r("ani_harvest_animal_produce.mp3"),

        farm_click_dirt: r("farm_click_dirt.mp3"),
        farm_harvest_01_mp3: r("farm_anicultural_01.mp3"),
        farm_plant_01_mp3: r("farm_plan_tree_01.mp3"),
        farm_harvest_tool_select_mp3: r("farm_harvest_tool_select.mp3"),

        func_click_button_mp3: r("func_click_button.mp3"),
        func_click_icon_mp3: r("func_click_icon.mp3"),
        func_click_shop_icon_mp3: r("func_click_shop_icon.mp3"),
        func_add_exp_mp3: r("func_exp.mp3"),
        func_gold_mp3: r("func_gold.mp3"),
        func_level_up_mp3: r("func_level_up.mp3"),
        func_products_01_mp3: r("func_products_01.mp3"),
        func_products_02_mp3: r("func_products_02.mp3"),
        func_products_03_mp3: r("func_products_03.mp3"),
        func_upgrade_storage_mp3: r("func_upgrade_silo_and_barn.mp3"),

        obj_big_rock_explosion01_mp3: r("obj_big_rock_explosion.mp3"),
        obj_big_rock_explosion02_mp3: r("obj_bigrock_explosion.mp3"),
        obj_small_rock_explosion_mp3: r("obj_small_rock_explosion.mp3"),
        obj_big_tree_saw_mp3: r("obj_big_tree_saw.mp3"),
        obj_small_tree_crack_mp3: r("obj_small_tree_crack.mp3"),
        obj_clear_pool_mp3: r("obj_clear_pool.mp3"),

        touch_big_rock_mp3: r("obj_touch_big_rock.mp3"),
        touch_big_tree_mp3: r("obj_touch_big_tree.mp3"),
        touch_small_rock_mp3: r("obj_touch_small_rock.mp3"),
        touch_small_tree_mp3: r("obj_touch_small_tree.mp3"),
        touch_water_pool_mp3: r("obj_touch_water_pool.mp3"),

        order_car_run_mp3: r("order_car_engine_run.mp3"),
        order_car_horn_mp3: r("order_car_horn.mp3"),
        order_collect_money_from_car_mp3: r("order_collect_money_from_car.mp3"),

        tools_barn_mp3: r("tools_barn.mp3"),
        tools_silo_mp3: r("tools_silo.mp3"),
        tools_bread_oven_mp3: r("tools_bread_oven.mp3"),
        tools_corn_machine_mp3: r("tools_corn_machine.mp3"),
        tools_fairy_mp3: r("tools_fairy.mp3"),
        tools_food_produce: r("tools_food_produce.mp3"),
        tools_sugarcane_mp3: r("tools_surgacan.mp3")
    };

    var g_SoundResource = [];


    for (var k in SoundResource) {
        g_SoundResource.push(SoundResource[k]);
    }
    return {
        SoundResource: SoundResource,
        g_SoundResource: g_SoundResource
    }
})();

var SoundResource = _.SoundResource;
var g_SoundResource = _.g_SoundResource;