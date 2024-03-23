"use client";
import client from "@/apolloClient";
import { ORGANIZER_ROUTE_PATTERN } from "@/constants";
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { UserRole } from "@/constants/enum";
import { loginReducer } from "@/redux/slices/auth.slice";
import { addUser } from '@/redux/slices/user.slice';
import { RootState } from "@/redux/store";
import { getCurrentUserApi } from "@/services/user.service";
import { getCookie } from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextTopLoader from 'nextjs-toploader';
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState(getCookie(AUTH_COOKIE_NAME as string) ?? "");
  //selector
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth!);

  const router = useRouter();
  const pathName = usePathname();


  //react query for fetching data
  const { mutate } = useMutation({
    mutationFn: () => {
      return getCurrentUserApi();
    },
    onSuccess: (data) => {
      dispatch(
        loginReducer({
          is_organizer_registered: data.data.data.is_organizer_registered,
          is_verified: data.data.data.is_verified,
          role: data.data.data.role,
          id: data.data.data.id,
          access_token: jwt,
        })
      );
      dispatch(addUser(data.data.data));
    },
  });

  //fetched user data
  const fetchUser = () => {
    const jwt = getCookie(AUTH_COOKIE_NAME as string);
    if (jwt) {
      setJwt(jwt);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      mutate();

      //cheking route
      if (ORGANIZER_ROUTE_PATTERN.test(pathName)) {
        if (auth.role === UserRole.ORGANIZER) {
          if (auth.isRegisterOrganizer) {
            router.push("/organizer/dashboard")
          } else {
            router.push("/organizer/auth/register")
          }
        }
      }
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [auth]);

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
