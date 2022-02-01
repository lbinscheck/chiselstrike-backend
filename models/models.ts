import { ChiselEntity, labels } from "@chiselstrike/api";

export class EventRequest extends ChiselEntity {
  userId: string;
  events: string;
  @labels("pii") email: string;
  groupSize: number;
  startDate: number;
  accepted: boolean = false;
}
