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

    private fetchMeetings = async () => {
        const response = await fetch("/fetchMeetings");
        const text = await response.text();
        return text;
    };

    private constructor() {
        makeObservable(this);

        this.fetchMeetings().then(response => runInAction(() => {
            // TODO: handle text to json
            this.meetings = response;
        }));
    }
}
