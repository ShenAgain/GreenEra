export interface Notification {
  message: string;
  eventType: string;
  date: Date;
  communityName?: string;
  createdBy?: string;
}