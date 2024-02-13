import HomeCart from "../card/HomeCard";
import { Button } from "../ui/button";
const data = [
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },

  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/event.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
  {
    name: "Golden Night",
    image: "/background.png",
    type: "CONCERT",
    venue: "Nepal hall",
    startDate: "Dec 18, 2023",
  },
];

const UpcomingEvent = () => {
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
          {data.map((singleData, ind) => {
            return (
              <HomeCart
                key={ind + 1 * 98}
                name={singleData.name}
                image={singleData.image}
                type={singleData.type}
                venue={singleData.venue}
                startDate={singleData.startDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
