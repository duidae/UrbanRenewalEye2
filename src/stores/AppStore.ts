import {action, computed, observable, makeObservable, runInAction} from "mobx";

import {TaipeiDistrict} from "models";

export enum DistrictSelectionType {
    None,
    Indeterminate,
    All
}

export class AppStore {
    private static staticInstance: AppStore;

    static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable meetings: any;
    @observable isMeetingChecked: boolean;
    @observable isNewsChecked: boolean;
    @observable selectedDistricts: Map<TaipeiDistrict, boolean>;

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

        this.selectedDistricts = new Map<TaipeiDistrict, boolean>([]);
        Object.values(TaipeiDistrict).forEach(district => this.selectedDistricts.set(district, false));

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

    @computed get districtSelectionType(): DistrictSelectionType {
        // TODO: fill in selection type logic
        return DistrictSelectionType.None;
    }
}
