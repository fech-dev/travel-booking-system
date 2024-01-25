import type { Travel } from "~/schemas";

interface TravelFilters {
  name: string;
}

export const useTravelFilters = (
  data: Ref<Travel[] | null>,
  filters: Ref<TravelFilters>
) => {
  const filteredData = computed(() => {
    let _data = [...(data?.value || [])];

    if (filters.value.name) {
      _data = _data.filter(({ name }) => name.includes(filters.value.name));
    }

    return _data;
  });

  return { filteredData };
};
