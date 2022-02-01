import { OAuthUser, responseFromJson } from "@chiselstrike/api";

export default async function (req) {
  const payload = await req.json();
  const users = await OAuthUser.cursor().filter(payload).take(1).toArray();
  return responseFromJson(users);
}
