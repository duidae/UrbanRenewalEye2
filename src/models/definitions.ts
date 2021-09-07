export enum TaipeiDistrict {
    Shilin = "士林區",
    Datong = "大同區",
    Daan = "大安區",
    Zhongshan = "中山區",
    Zhongzheng = "中正區",
    Neihu = "內湖區",
    Wenshan = "文山區",
    Beitou = "北投區",
    Songshan = "松山區",
    Xinyi = "信義區",
    Nangang = "南港區",
    Wanhua = "萬華區"
}
export const TAIPEI_DISTRICTS = Object.values(TaipeiDistrict);
export const TAIPEI_DISTRICTS_NUM = TAIPEI_DISTRICTS.length;
export const TAIPEI_DISTRICTS_GEOJSON = "geojson/Taipei_districts.geojson";

// TODO: temporary solution for encoding problem of map.data.loadGeoJson(),
// is it possible to load filename with chinese character directly?
export const DISTRICT_NAME_EN_MAP = new Map<TaipeiDistrict, string>([
    [TaipeiDistrict.Shilin, "Shilin"],
    [TaipeiDistrict.Datong, "Datong"],
    [TaipeiDistrict.Daan, "Daan"],
    [TaipeiDistrict.Zhongshan, "Zhongshan"],
    [TaipeiDistrict.Zhongzheng, "Zhongzheng"],
    [TaipeiDistrict.Neihu, "Neihu"],
    [TaipeiDistrict.Wenshan, "Wenshan"],
    [TaipeiDistrict.Beitou, "Beitou"],
    [TaipeiDistrict.Songshan, "Songshan"],
    [TaipeiDistrict.Xinyi, "Xinyi"],
    [TaipeiDistrict.Nangang, "Nangang"],
    [TaipeiDistrict.Wanhua, "Wanhua"]
]);

export const DEFAULT_ZOOM = 14;
// GPS related
export const TAIPEI_CENTER = {lat: 25.038357847174, lng: 121.54770626982};
// TODO: find centers of 12 admin districts
export const TAIPEI_DISTRICT_CENTER = new Map<TaipeiDistrict, any>([
    [TaipeiDistrict.Shilin, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Datong, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Daan, {lat: 25.026054, lng: 121.543439}],
    [TaipeiDistrict.Zhongshan, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Zhongzheng, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Neihu, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Wenshan, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Beitou, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Songshan, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Xinyi, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Nangang, {lat: 25.038357847174, lng: 121.54770626982}],
    [TaipeiDistrict.Wanhua, {lat: 25.038357847174, lng: 121.54770626982}]
]);
