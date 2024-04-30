"use client";
import {
  GetMyCategoryQuery,
  useGetMyCategoryQuery,
} from "@/__generated__/graphql";
import CategoryCard from "@/components/card/CategoryCard";
import GlobalDialog from "@/components/common/Dialog/GlobalDialog";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import CategoryModal from "@/components/organizer/dashboard/modals/CategoryModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { InView } from "react-intersection-observer";

type CategoryData = GetMyCategoryQuery["getMyCategory"]["data"];
const EventCategory = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuItemClick = () => {
    setOpenDialog(true);
  };
  const { loading, data, networkStatus, fetchMore, updateQuery } =
    useGetMyCategoryQuery({
      variables: {
        query: {
          page: 1,
          pageLimit: 10,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  const lastPageRef = useIntersectionObserver(async () => {
    if (data?.getMyCategory.meta.nextPage) {
      fetchMore({
        variables: {
          query: {
            page: data.getMyCategory.meta.nextPage,
            pageLimit: 10,
          },
        },
        updateQuery(previousQueryResult, { variables, fetchMoreResult }) {
          if (!fetchMoreResult) {
            return previousQueryResult;
          }

          return {
            ...previousQueryResult,
            getMyCategory: {
              ...previousQueryResult.getMyCategory,
              data: fetchMoreResult.getMyCategory.data,
            },
          };
        },
      });
    }
  }, [data?.getMyCategory.meta.nextPage ? true : false, !loading]);

  console.log(data);
  if (loading) {
    return <p>Loading............</p>;
  }

  return (
    <div>
      <DashboardTopContent
        text={"Event Category"}
        section3={
          <GlobalDialog
            dialogTitle="Add Event Category"
            dialogButton={<Button>Add Category</Button>}
          >
            <CategoryModal action="create" />
          </GlobalDialog>
        }
      />
      <main
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {data?.getMyCategory?.data?.map((singleCategory, index, categories) => {
          return (
            <CategoryCard
              // ref={index === categories.length - 1 ? lastPageRef : null}
              key={singleCategory.id}
              id={singleCategory.id}
              categoryName={singleCategory.name}
              totalEvent={0}
              description={singleCategory.description}
            />
          );
        })}
        {/* 
        <InView
          as="div"
          onChange={(inView, entry) => {
            if (inView) {
              fetchMore({
                variables: {
                  query: {
                    page: data?.getMyCategory.meta.nextPage,
                    pageLimit: 10,
                  },
                },

                // updateQuery(prev, { fetchMoreResult }) {
                //   if (!prev) {
                //     return prev;
                //   }
                //   return {
                //     ...prev,
                //     getMyCategory: {
                //       data: {
                //         ...prev.getMyCategory.data,
                //         ...fetchMoreResult.getMyCategory.data,
                //       },
                //       meta: {
                //         ...prev.getMyCategory.meta,
                //         ...fetchMoreResult.getMyCategory.meta,
                //       },
                //     },
                //   };
                // },
              });
            }
          }}
        >
          Loading.........
        </InView> */}
      </main>
    </div>
  );
};

export default EventCategory;
