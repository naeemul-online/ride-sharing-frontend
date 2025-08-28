import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ searchTerm, role, page = 1, limit = 10 }) => {
        // eslint-disable-next-line prefer-const
        let params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (role) params.append("role", role);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/user/all-users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),

    allStats: builder.query({
      query: () => ({
        url: "/user/stats",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    allDrivers: builder.query({
      query: () => ({
        url: "user/drivers",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    allRides: builder.query({
      query: () => ({
        url: "/user/rides",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["USER"],
    }),

    updateDriverApprovalStatus: builder.mutation({
      query: ({ id, approvalStatus }) => ({
        url: `/user/${id}/approve`,
        method: "PATCH",
        data: { approvalStatus },
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `user/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllStatsQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useAllDriversQuery,
  useUpdateDriverApprovalStatusMutation,
} = adminApi;
