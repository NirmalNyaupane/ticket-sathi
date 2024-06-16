"use client";
import { useGetCurrentUserLazyQuery, UserRole } from "@/__generated__/graphql";
import { Toaster } from "@/components/ui/toaster";
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { loginReducer } from "@/redux/slices/auth.slice";
import { addUser } from "@/redux/slices/user.slice";
import { RootState } from "@/redux/store";
import { getCookie } from "@/utils/cookie";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState(getCookie(AUTH_COOKIE_NAME as string) ?? "");

  //selector
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth!);

  const router = useRouter();
  const pathName = usePathname();

  const [getUser, { loading }] = useGetCurrentUserLazyQuery({
    onCompleted(data) {
      dispatch(addUser(data.getCurrentUser));
      dispatch(
        loginReducer({
          accessToken: jwt,
          role: data?.getCurrentUser.role,
          isVerified: data?.getCurrentUser.isVerified as boolean,
          id: data?.getCurrentUser?.id,
          isUserLogin: true,
        })
      );
    },
  });

  //fetched user data
  const fetchUser = async () => {
    const jwt = getCookie(AUTH_COOKIE_NAME as string);
    if (jwt) {
      setJwt(jwt);
      await getUser();
      if (auth.role === UserRole.Organizer) {
        router.push("/organizer/dashboard");
      } else if (auth.role === UserRole.Admin) {
        router.push("/admin/dashboard");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [auth]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <main>
      <NextTopLoader color="rgba(241,0,0,0.5)" />
      <Toaster />
      {children}
    </main>
  );
};

export default DefaultLayout;
