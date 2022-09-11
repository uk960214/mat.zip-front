import { ENDPOINTS } from "constants/api";

import axiosInstance from "api/axiosInstance";

interface Params {
  pageParam?: number;
  queryKey: any;
}

interface StoreRequestGetResponse {
  items: {
    id: number;
    categoryId: StoreRequest["categoryId"];
    name: string;
    author: string;
    updatable: boolean;
    registered: boolean;
  }[];
  hasNext: boolean;
}

const fetchStoreRequests = async ({ pageParam = 0, queryKey }: Params) => {
  const [, { size, campusId }] = queryKey;
  const { data } = await axiosInstance.get<StoreRequestGetResponse>(
    ENDPOINTS.STORE_REQUESTS(campusId),
    {
      params: { page: pageParam, size },
    }
  );

  const parsedData = {
    items: data.items.map(({ id, updatable, registered, ...rest }) => ({
      id: String(id),
      isAuthor: updatable,
      isRegistered: registered,
      ...rest,
    })),
    hasNext: data.hasNext,
  };

  return { ...parsedData, nextPageParam: pageParam + 1 };
};

export default fetchStoreRequests;
