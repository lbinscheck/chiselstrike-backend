import { OAuthUser, responseFromJson } from "@chiselstrike/api";

export default async function (req) {
  const payload = await req.json();
  const user = await OAuthUser.findOne(payload);
  return responseFromJson(user);
}
