"use client";
import {
  GetMyCategoryQuery,
  useGetMyCategoryLazyQuery,
  useGetMyCategoryQuery,
} from "@/__generated__/graphql";
import CategoryCard from "@/components/card/CategoryCard";
import GlobalDialog from "@/components/common/Dialog/GlobalDialog";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import CategoryModal from "@/components/organizer/dashboard/modals/CategoryModal";
import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useCallback, useEffect, useState } from "react";

type CategoryData = GetMyCategoryQuery["getMyCategory"]["data"];
const EventCategory = () => {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<CategoryData>([]);

  const updateCategory = useCallback((data: CategoryData) => {
    setPage(page + 1);
    setCategories((prevCategories) => [...prevCategories, ...data]);
  }, []);

  const [mutate, { loading, data, error, networkStatus, fetchMore }] =
    useGetMyCategoryLazyQuery({
      onCompleted(data) {
        updateCategory(data.getMyCategory.data);
      },
    });

  const lastPageRef = useIntersectionObserver(async () => {
    if (data?.getMyCategory.meta.nextPage && !loading) {
      fetchMore({
        variables: {
          query: {
            page: page,
            pageLimit: 10,
          },
        },
      });
    }
  }, [data?.getMyCategory.meta.nextPage ? true : false, !loading]);

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
        {categories?.map((singleCategory, index, categories) => {
          return (
            <CategoryCard
              ref={index === categories.length - 1 ? lastPageRef : null}
              key={singleCategory.id}
              id={singleCategory.id}
              categoryName={singleCategory.name}
              totalEvent={0}
              description={singleCategory.description}
            />
          );
        })}
      </main>

      <div>Loader..............</div>
    </div>
  );
};

export default EventCategory;
