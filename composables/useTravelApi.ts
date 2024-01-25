export const useTravelApi = () => {
  return {
    list: async (options: object = {}) => {
      const data = await $fetch("/api/travels", {
        ...options,
        method: "GET",
      });

      return data;
    },
    get: async (id: number, options: object = {}) => {
      const data = await $fetch(`/api/travels/${id}`, {
        ...options,
        method: "GET",
      });

      return data;
    },
    create: async (body: object, options: object = {}) => {
      const data = await $fetch("/api/travels", {
        ...options,
        method: "POST",
        body,
      });

      return data;
    },

    update: async (id: number, body: object, options: object = {}) => {
      const data = await $fetch(`/api/travels/${id}`, {
        ...options,
        method: "PATCH",
        body,
      });

      return data;
    },

    delete: async (id: number, options: object = {}) => {
      await $fetch(`/api/travels/${id}`, {
        ...options,
        method: "DELETE",
      });
    },
  };
};
