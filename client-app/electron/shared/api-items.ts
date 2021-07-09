import { IApiItem } from "./types";

function getReplyChannelName(channelName: string): string {
   return `${channelName}-reply`;
}

function getApiItemUnifiedName(name: string): IApiItem {
   return {
      method: name,
      channel: name,
      channelReply: getReplyChannelName(name),
   };
}

export const FACTORIAL_API_ITEM: IApiItem = getApiItemUnifiedName("factorial");
