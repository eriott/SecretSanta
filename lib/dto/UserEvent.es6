export default class UserEvent {
  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.name = data.name;
    this.alias = data.alias;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.addressee = data.addressee;
    this.isGiftSent = data.isGiftSent;
    this.isGiftReceived = data.isGiftReceived;
    this.membersCount = data.membersCount;
    this.completion = data.completion;
    this.showGiftSentMessage = data.showGiftSentMessage;
    this.showGiftReceivedMessage = data.showGiftReceivedMessage;
  }
}