import type { Travel } from "~/schemas";

interface TravelFilters {
  name?: string;
  rating?: number;
}

function filterByName(data: Travel[], value: string) {
  return data.filter(({ name }) => name.includes(value));
}

function filterByRating(data: Travel[], value: number) {
  return data.filter((travel) => {
    return value === Math.floor(travel.average_user_rating);
  });
}

export const useTravelFilters = (
  data: Ref<Travel[] | null>,
  filters: Ref<TravelFilters>
) => {
  const options = {
    rating: [
      { label: "⭐", value: 1 },
      { label: "⭐⭐", value: 2 },
      { label: "⭐⭐⭐", value: 3 },
      { label: "⭐⭐⭐⭐", value: 4 },
      { label: "⭐⭐⭐⭐⭐", value: 5 },
    ],
  };

  const filteredData = computed(() => {
    let _data = [...(data?.value || [])];

    if (filters.value.name !== undefined) {
      _data = filterByName(_data, filters.value.name!);
    }

    if (filters.value.rating) {
      _data = filterByRating(_data, filters.value.rating);
    }

    return _data;
  });

  return { filteredData, options };
};
