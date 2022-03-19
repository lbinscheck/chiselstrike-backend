import { ChiselEntity, labels, OAuthUser } from "@chiselstrike/api";

export class EventRequest extends ChiselEntity {
  @labels("protect") user: OAuthUser;
  @labels("pii") email: string;
  events: string;
  groupSize: number;
  startDate: number;
  accepted: boolean = false;
}
