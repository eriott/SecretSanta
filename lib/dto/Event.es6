export default class Event {
    constructor(data) {
        this.name = data.name;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.addressee = data.addressee;
        this.isPackageSent = data.isPackageSent;
    }
}