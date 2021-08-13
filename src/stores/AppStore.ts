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

        this.fetchMeetings().then(response =>
            runInAction(() => {
                this.meetings = response;
            })
        );
    }
}
