export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any
}

export type DOMMessage = {
  type: 'GET_DOM'
}

export type DOMMessageResponse = {
  title: string;
  headlines: string[];
}