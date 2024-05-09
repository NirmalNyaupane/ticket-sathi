import { Pagination, PaginationInput } from "../schemas/common/common.schema";

class PaginationUtil {
  paginatedResponse = (
    count: number,
    PaginatedInput: PaginationInput
  ): Pagination => {
    const lastPage: number = Math.ceil(count / PaginatedInput.pageLimit);
    const prevPage =
      PaginatedInput.page - 1 > 0 ? PaginatedInput.page - 1 : null;
    const nextPage =
      PaginatedInput.page + 1 <= lastPage ? PaginatedInput.page + 1 : null;
    const currentPage = PaginatedInput.page ?? 1;
    const totalCount = count;
    return { prevPage, nextPage, currentPage, lastPage, totalCount };
  };

  skipTakeMaker(paginationInput: PaginationInput) {
    const skip = (paginationInput.page - 1) * paginationInput.pageLimit;
    return { skip, take: paginationInput.pageLimit };
  }
}

export default new PaginationUtil();
