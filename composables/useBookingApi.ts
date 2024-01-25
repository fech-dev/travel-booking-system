export const useBookingApi = () => {
  return {
    list: async (options: object = {}) => {
      const data = await $fetch("/api/bookings", {
        ...options,
        method: "GET",
      });

      return data;
    },

    create: async (body: object, options: object = {}) => {
      const data = await $fetch("/api/bookings", {
        ...options,
        method: "POST",
        body,
      });

      return data;
    },
  };
};
