import { useGetAllOpenEventsQuery } from "@/__generated__/graphql";
import HomeCart from "../card/HomeCard";
import { Button } from "../ui/button";
import { format } from "date-fns";
import ConditionallyRender from "../common/ConditionallyRender";
import EventCartSkeleton from "../skeleton/EventCartSkeleton";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
const UpcomingEvent = () => {
  const { data, loading } = useGetAllOpenEventsQuery({
    variables: {
      data: {
        page: 1,
        pageLimit: 10,
      },
    },
  });

  return (
    <div className="bg-secondary">
      <div className="section max-width">
        <div className="flex flex-col md:flex-row gap-7 md:border-b mb-4 section">
          <h2 className="secondary-heading">Upcoming Events</h2>
          <div className="flex gap-3 overflow-auto sm:justify-center">
            <Button className="filter-active-btn">ALL</Button>
            <Button className="filter-btn">CONCERT</Button>
            <Button className="filter-btn">THEATER</Button>
          </div>
        </div>

        <div
          className={`flex flex-col items-center md:grid md:grid-rows-[max-content] justify-center`}
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "3rem",
          }}
        >
          <ConditionallyRender
            condition={loading}
            show={
              <>
                {Array(8)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <>
                        {/* <Skeleton className="h-4 w-[250px] z-50" /> */}
                        <EventCartSkeleton
                          key={`home-page-cart-skeleton-${index + 58}`}
                        />
                      </>
                    );
                  })}
              </>
            }
            elseShow={
              <>
                {data?.getAllOpenEvents?.data?.map((singleData, ind) => {
                  return (
                    <HomeCart
                      key={ind + 1 * 98}
                      id={singleData.id}
                      name={singleData.name}
                      image={singleData.cover.name}
                      type={singleData.type}
                      venue={singleData.venue}
                      startDate={format(
                        new Date(singleData.eventStartDate),
                        "dd, MMM"
                      )}
                    />
                  );
                })}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
