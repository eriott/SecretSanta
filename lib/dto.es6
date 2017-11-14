export default class Profile {
    constructor(data = {}) {
        this.fullName = data.fullName;
        this.address = data.address;
        this.about = data.about;
    }
}