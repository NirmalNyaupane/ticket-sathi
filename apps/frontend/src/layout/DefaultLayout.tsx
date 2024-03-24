"use client";
import { useGetCurrentUserLazyQuery } from "@/__generated__/graphql";
import { ORGANIZER_ROUTE_PATTERN } from "@/constants";
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { UserRole } from "@/constants/enum";
import { authLoginReducer } from "@/redux/reducers/authReducer";
import { loginReducer } from "@/redux/slices/auth.slice";
import { addUser } from "@/redux/slices/user.slice";
import { RootState } from "@/redux/store";
import { getCookie } from "@/utils/cookie";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState(getCookie(AUTH_COOKIE_NAME as string) ?? "");
  //selector
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth!);

  const router = useRouter();
  const pathName = usePathname();

  const [getUser, { loading, error, data }] = useGetCurrentUserLazyQuery({
    onCompleted(data) {
      //@ts-ignore
      dispatch(addUser(data.getCurrentUser));
    }
  }
  )

  //fetched user data
  const fetchUser = () => {
    const jwt = getCookie(AUTH_COOKIE_NAME as string);
    if (jwt) {
      setJwt(jwt);
      dispatch(loginReducer({
        accessToken: jwt,
        role: data?.getCurrentUser.role,
        isVerified: data?.getCurrentUser.isVerified as boolean,
        id: "1234",
      }));
      getUser();
      //cheking route
      if (!ORGANIZER_ROUTE_PATTERN.test(pathName)) {
        if (auth.role === UserRole.ORGANIZER) {
          router.push("/organizer/das")
        }
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [auth]);

  if (loading) {
    return <p>Loading....</p>
  }


  return (
    <main>
      <NextTopLoader
        color="rgba(241,0,0,0.5)"
      />
      {children}
    </main >
  );
};

export default DefaultLayout;
