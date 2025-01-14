"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface CarouselItem {
  order: number | 0;
  imageSrc: string | "";
  path: string | "";
}

export const useGetCarouselList = () => {
  return useQuery({
    queryKey: ["GET_CAROUSEL_LIST"],
    queryFn: async () => {
      const res = await axios.get<CarouselItem[]>(
        `https://degenpad.deepblocklabs.com/api/v2/tip-tracking/carousel/all`
      );

      return res.data ?? [];
    },
  });
};
