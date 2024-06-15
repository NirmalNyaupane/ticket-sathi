import Link from "next/link";
import fistFooterData from "@/constants/footerdata";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-9">
      <div className="max-width flex justify-between flex-wrap gap-4">
        {/* first */}
        <div className="text-white space-y-3 w-[30%]">
          <h2 className=" text-xl font-bold">Ticket Sathi</h2>
          <p className=" text-blue-100">
            “Ticket Sathi” is a web-based application that makes it easier and
            efficient to manage the events. With the help of this application
            organizers can create, promote, monitor, and sell tickets of an
            event online. The admin of a system can approve organizer’s
            identity, events and charge commission against organizers for an
            event. Users can use the application to view upcoming events, and
            buy tickets for these events.
          </p>
        </div>

        {/* second */}

        <div className="text-white space-y-3">
          <h2 className=" text-xl font-bold">Company</h2>
          <ul className="space-y-3">
            {fistFooterData.map((singleFooterData) => {
              return (
                <li key={singleFooterData.label}>
                  <Link href={singleFooterData.url} className=" text-blue-100">
                    {singleFooterData.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* third */}

        <div className="text-white space-y-3">
          <h2 className=" text-xl font-bold">Company</h2>
          <ul className="space-y-3">
            {fistFooterData.map((singleFooterData) => {
              return (
                <li key={singleFooterData.label}>
                  <Link href={singleFooterData.url} className=" text-blue-100">
                    {singleFooterData.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* forth */}

        <div className="text-white space-y-3">
          <h2 className=" text-xl font-bold">Company</h2>
          <ul className="space-y-3">
            {fistFooterData.map((singleFooterData) => {
              return (
                <li key={singleFooterData.label}>
                  <Link href={singleFooterData.url} className=" text-blue-100">
                    {singleFooterData.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
