import { loggedInUser, responseFromJson } from "@chiselstrike/api";

import { EventRequest } from "../models/models";

async function createEventRequest(req) {
  try {
    const authUser = await loggedInUser();
    const payload: EventRequest = await req.json();

    const user = authUser;
    const events = payload["events"];
    const email = payload["email"];
    const groupSize = payload["groupSize"];
    const startDate = payload["startDate"];

    const eventRequest = EventRequest.build({ user, events, email, groupSize, startDate });
    await eventRequest.save();
    return responseFromJson(eventRequest.id);
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}

async function getEventsByUser() {
  try {
    const user = await loggedInUser();
    const eventRequestsByUser = await EventRequest.cursor()
      .filter((eventRequest: EventRequest) => eventRequest.user.id === user.id)
      .toArray();
    return responseFromJson(eventRequestsByUser);
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}

export default async function chisel(req) {
  if (req.method === "POST") {
    return await createEventRequest(req);
  } else if (req.method === "GET") {
    return await getEventsByUser();
  } else {
    return new Response("Wrong method", { status: 405 });
  }
}
