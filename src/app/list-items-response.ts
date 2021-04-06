import { Item } from "./item";

export interface ListItemsResponse {
    messages: Array<string>,
    result: Array<Item>
}
