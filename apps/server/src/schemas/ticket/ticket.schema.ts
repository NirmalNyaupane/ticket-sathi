import { ObjectType } from "type-graphql";
import { Ticket } from "../../entities/ticket/ticket.entity";

@ObjectType()
export class PaginatedTicketResponse extends Ticket {}
