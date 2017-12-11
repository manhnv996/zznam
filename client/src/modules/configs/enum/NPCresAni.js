
var NPCresAni = [
    resAniId.Bagia,
    resAniId.Cogai1,
    resAniId.Onggia1,
    resAniId.Thanhnien,
    resAniId.Trungnien,
];



var NPCbackground = {};

NPCbackground[resAniId.Bagia] = res.npcOldWoman;
NPCbackground[resAniId.Cogai1] = res.npcGirl;
NPCbackground[resAniId.Onggia1] = res.npcOldMan;
NPCbackground[resAniId.Thanhnien] = res.npcYouth;
NPCbackground[resAniId.Trungnien] = res.npcMiddleAge;

function getNPCbackgroundByResAni(resAni) {
    return NPCbackground[resAni];
}