import { calculateRemainingDates } from "@/utils/helper";
import React, { useEffect, useState } from "react";

interface Props {
  upcomingTime: Date;
}
const CalculateUpcomingTime = ({ upcomingTime }: Props) => {
  const [date, setDate] = useState(calculateRemainingDates(upcomingTime));

  useEffect(() => {
    const remainingDateInterval = setInterval(() => {
      setDate(() => calculateRemainingDates(upcomingTime));
    }, 1000);

    if (date.seconds === 0) {
      clearInterval(remainingDateInterval);
    }

    return () => {
      clearInterval(remainingDateInterval);
    };
  }, [upcomingTime,date]);
  console.log(date.days)
  return (
    <>
      {" "}
      {/* day counter */}
      <div className="flex gap-2 justify-between">
        <div className="bg-red-500 text-md font-bold text-white text-center rounded-lg py-3 px-7">
          <span className="block">{date.days}</span>
          <span className="block">Days</span>
        </div>
        <div className="bg-red-500 text-md font-bold text-white text-center rounded-lg py-3 px-7">
          <span className="block">{date.hours}</span>
          <span className="block">Hours</span>
        </div>
        <div className="bg-red-500 text-md font-bold text-white text-center rounded-lg py-3 px-7">
          <span className="block">{date.minutes}</span>
          <span className="block">Minutes</span>
        </div>
        <div className="bg-red-500 text-md font-bold text-white text-center rounded-lg py-3 px-7">
          <span className="block">{date.seconds}</span>
          <span className="block">Seconds</span>
        </div>
      </div>
    </>
  );
};

export default CalculateUpcomingTime;
