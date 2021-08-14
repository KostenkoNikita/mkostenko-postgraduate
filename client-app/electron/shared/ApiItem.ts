export class ApiItem {
    private readonly _method: string;

    constructor(methodName: string) {
        this._method = methodName;
    }

    get method(): string {
        return this._method;
    }

    get channel(): string {
        return `${this._method}-channel`;
    }

    get channelReply(): string {
        return `${this._method}-channel-reply`;
    }
}