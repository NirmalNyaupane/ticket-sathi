"use client";
import { useGetBookedTicketQuery } from "@/__generated__/graphql";
import { changePasswordValidation } from "@/lib/formvalidation/user/changePasswordFormValidation";
import { z } from "zod";

type formData = z.infer<typeof changePasswordValidation>;
const BookedTicket = () => {
  const { data, loading } = useGetBookedTicketQuery();
  if (loading) {
    return <p>Loading..</p>;
  }
  return (
    <div className="rounded-lg p-4 md:w-[60%] lg:w-[40%] flex flex-col gap-6 bg-white">
      <div>
        <h2 className="font-semibold">Booked Ticket</h2>
        {/* <p className="text-gray-600">Change your password</p> */}
      </div>

      <div className="ticket p-2 border-2 border-gray-300 rounded-md flex flex-col gap-3">
        {/* ticket heading section  */}
        <div className="ticket-heading-section flex items-center gap-2 w-full">
          {data?.getBookedTicket &&
            data.getBookedTicket.length > 0 &&
            data?.getBookedTicket.map((data) => {
              return (
                <div key={data.id} className="flex flex-col gap-2">
                  <p className="font-bold">Ticket Id</p>
                  <p>{data.ticket?.id}</p>

                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">Ticket Name</p>
                      <p>{data.ticket?.name}</p>
                    </div>

                    <div>
                      <p className="font-bold">Ticket Quantity</p>
                      <p>{data.quantity}</p>
                    </div>
                  </div>

                  <p>
                    <span className="font-bold">Event: </span>
                    {data.ticket?.event?.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BookedTicket;
