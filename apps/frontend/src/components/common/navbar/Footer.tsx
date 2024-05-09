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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ut
            aperiam numquam mollitia quod in beatae unde non ab ipsam aliquam
            repudiandae ea eum, ipsum nulla iste, esse magni officiis?
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
