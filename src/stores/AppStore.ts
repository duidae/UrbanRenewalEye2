import {computed, observable, makeObservable, runInAction} from "mobx";

export class AppStore {
    private static staticInstance: AppStore;

    static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable meetings: any;

    private constructor() {
        makeObservable(this);
        this.meetings = fetch("meetings_sample.json").then(response => response.json()).then(data => runInAction(() => {this.meetings = data;}));
    }

    @computed get meetingNum(): number {
        return this.meetings?.length;
    }
}
