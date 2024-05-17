// in whcih we define the structure of the response we get from the API
import { Message } from "@/model/User";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  // optional becsue we are not sure that we will get this data or not
  messages?: Array<Message>;
}
