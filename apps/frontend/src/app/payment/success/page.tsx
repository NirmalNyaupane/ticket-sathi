"use client";
import { API_BASE_URL } from "@/constants/config";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const EsewaSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("data");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await axios.get(
        `${API_BASE_URL}/change-order-status?data=${query}`
      );
      setData(data);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError("Error occurs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-width flex my-7 flex-col items-center h-screen">
      <div className="w-[90%] md:w-[50%] lg:w-[30%] flex flex-col gap-10">
        <div className="w-fit">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={100}
              height={50}
              alt="logo"
              className="rounded-md"
            />
          </Link>
        </div>

        <div className="space-y-5 flex flex-col items-center">
          {loading && (
            <>
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <p>Your payment is processing.....</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EsewaSuccess;
