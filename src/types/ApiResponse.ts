import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message?: string;
    isAcceeptingMessage?: boolean;
    messages?: Array<Message>;
}