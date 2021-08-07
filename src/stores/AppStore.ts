import {observable, makeObservable, runInAction} from "mobx";

export class AppStore {
    private static staticInstance: AppStore;

    static get Instance() {
        if (!AppStore.staticInstance) {
            AppStore.staticInstance = new AppStore();
        }
        return AppStore.staticInstance;
    }

    @observable meetings: any;
    @observable isSideBySideMode: boolean;

    private constructor() {
        makeObservable(this);
        fetch("meetings_sample.json")
            .then(response => response.json())
            .then(data =>
                runInAction(() => {
                    this.meetings = data;
                })
            );
        this.isSideBySideMode = false;
    }
}
