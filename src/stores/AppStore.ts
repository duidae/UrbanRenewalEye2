import {action, computed, observable, ObservableMap, makeObservable, runInAction} from "mobx";

import {TaipeiDistrict, TAIPEI_DISTRICTS, TAIPEI_DISTRICTS_NUM} from "models";

export class AppStore {
    private static staticInstance: AppStore;

    public static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable meetings: any;
    @observable isMeetingChecked: boolean;
    @observable isNewsChecked: boolean;
    @observable selectedDistricts: ObservableMap<TaipeiDistrict, boolean>;

    private fetchMeetings = async () => {
        try {
            const response = await fetch("/fetchMeetings");
            const text = await response.text();
            return JSON.parse(text);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    };

    private constructor() {
        makeObservable(this);

        this.meetings = undefined;
        this.isMeetingChecked = false;
        this.isNewsChecked = false;

        this.selectedDistricts = new ObservableMap<TaipeiDistrict, boolean>([]);
        TAIPEI_DISTRICTS.forEach(district => this.selectedDistricts.set(district, false));

        this.fetchMeetings().then(response =>
            runInAction(() => {
                this.meetings = response;
            })
        );
    }

    @action setMeetingChecked = () => {
        this.isMeetingChecked = true;
    };

    @action setNewsChecked = () => {
        this.isNewsChecked = true;
    };

    @action selectDistrict = (district: TaipeiDistrict) => {
        this.selectedDistricts.set(district, !this.selectedDistricts.get(district));
    };

    @action selectAllDistricts = () => {
        const isSelectingNone = this.districtSelectionNum === 0;
        this.selectedDistricts.forEach((selected, district) => {
            this.selectedDistricts.set(district, isSelectingNone ? true : false);
        });
    };

    @computed private get districtSelectionNum(): number {
        let selectionNum = 0;
        this.selectedDistricts?.forEach(isSelected => {
            if (isSelected) {
                selectionNum++;
            }
        });
        return selectionNum;
    };

    @computed get isSelectingAllDistricts(): boolean {
        return this.districtSelectionNum === TAIPEI_DISTRICTS_NUM;
    }

    @computed get isSelectingIndeterminateDistricts(): boolean {
        return this.districtSelectionNum > 0 && this.districtSelectionNum < TAIPEI_DISTRICTS_NUM;
    }
}
