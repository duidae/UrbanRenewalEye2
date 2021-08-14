import {action, observable, makeObservable, runInAction} from "mobx";

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
}
