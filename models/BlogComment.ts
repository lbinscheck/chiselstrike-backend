import { ChiselEntity } from "@chiselstrike/api";

export class BlogComment extends ChiselEntity {
  content: string = "";
  by: string = "";
}
