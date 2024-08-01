// Interface
export interface INotification {
  id?: string;
  title: string;
  body: string;
  url: string;
  read: boolean;
  type: string;
}
