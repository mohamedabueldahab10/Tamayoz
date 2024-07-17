import { useInfiniteQuery, useQuery } from 'react-query';
import AxiosInstance from '../components/helpers/AxiosInstance';
const instance = AxiosInstance();
// export const useGetJobPosition = (currentJobPage) => {
//   return useQuery(
//     ['jobPosition', currentJobPage],
//     async () => {
//       const { data } = await instance.post('/JobPosition/JobDropdown', {
//         pageSize: 10,
//         pageNumber: currentJobPage,
//       });
//       return data;
//     }
//   );
// };
export const useGetJobPosition = () => {
  return useInfiniteQuery(
    'jobPosition',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/JobPosition/JobDropdown', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetCompany = () => {
  return useInfiniteQuery(
    'company',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/company/GetAllData', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetCountry = () => {
  return useInfiniteQuery(
    'country',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/country/DropDownData', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetDepartment = () => {
  return useInfiniteQuery(
    'department',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/department/GetAllData', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetSkill = () => {
  return useInfiniteQuery(
    'skills',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/skills/DropDown', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetSkillLevel = () => {
  return useInfiniteQuery(
    'skillLevel',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/skillLevel/GetAllData', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetState = () => {
  return useInfiniteQuery(
    'state',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/region/GetAllData', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetLanguage = () => {
  return useInfiniteQuery(
    'lang',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/lang/dropdown', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export const useGetResumeType = () => {
  return useInfiniteQuery(
    'resumetype',
    async ({ pageParam = 1 }) => {
      const { data } = await instance.post('/resumeType/Dropdown', {
        pageSize: 10,
        pageNumber: pageParam,
      });
      return {
        data: data.data,
        nextPage: data.nextPage,
        totalCount: data.totalCount,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};
export function useGetSkillType() {
  return useQuery('skillType', async () => {
    const { data } = await instance.post('/skillType/GetAllData', {
      pageSize: 1000,
      pageNumber: 0,
    });
    return data;
  });
}
