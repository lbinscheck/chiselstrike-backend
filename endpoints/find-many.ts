import { responseFromJson } from "@chiselstrike/api";

import { EventRequest } from "../models/models";

export default async function (req) {
  const payload = await req.json();
  const events = await EventRequest.findMany(payload);
  return responseFromJson(events.map((event) => event));
}
