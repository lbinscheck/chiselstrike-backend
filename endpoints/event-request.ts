import { loggedInUser, responseFromJson } from "@chiselstrike/api";

import { EventRequest } from "../models/models";

async function createEventRequest(req) {
  try {
    const authUser = await loggedInUser();
    const payload: EventRequest = await req.json();

    const userId = authUser.id;
    const events = payload["events"];
    const email = payload["email"];
    const groupSize = payload["groupSize"];
    const startDate = payload["startDate"];

    const eventRequest = EventRequest.build({ userId, events, email, groupSize, startDate });
    await eventRequest.save();
    return responseFromJson(eventRequest.id);
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}

async function getEventsByUserId() {
  try {
    const authUser = await loggedInUser();
    const events = await EventRequest.findMany({ userId: authUser.id });
    return responseFromJson(events);
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}

export default async function chisel(req) {
  if (req.method === "POST") {
    return await createEventRequest(req);
  } else if (req.method === "GET") {
    return await getEventsByUserId();
  } else {
    return new Response("Wrong method", { status: 405 });
  }
}
