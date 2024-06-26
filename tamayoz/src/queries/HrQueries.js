import { useQuery } from 'react-query';
import axios from 'axios';
import AxiosInstance from '../components/helpers/AxiosInstance';
const instance = AxiosInstance();
export function useGetjobPosition(currentJobPage) {
  return useQuery('branches', async () => {
    const { data } = await instance.post('/JobPosition/JobDropdown', {
      pageSize: 10,
      pageNumber: currentJobPage,
    });
    return data;
  });
}
export function useGetReasons() {
  return useQuery('reasons', async () => {
    const { data } = await axios.post(
      'https://vsoft.com-eg.net:4041/api/Reasons/GetList',
      {
        pageSize: 1000,
        pageNumber: 0,
      }
    );
    return data;
  });
}
export function useGetUsers() {
  return useQuery('users', async () => {
    const { data } = await axios.post(
      'https://vsoft.com-eg.net:4041/api/WebRunnerUsers/GetList',
      {
        pageSize: 0,
        pageNumber: 0,
      }
    );
    return data;
  });
}

export function useGetRunners() {
  return useQuery('runnerData', async () => {
    const { data } = await axios.post(
      `https://vsoft.com-eg.net:4041/api/Runners/GetList`,
      {
        pageSize: 1000,
        pageNumber: 0,
      }
    );
    return data;
  });
}
export function useGetRecipient() {
  return useQuery('recipient', async () => {
    const { data } = await axios.post(
      'https://vsoft.com-eg.net:4041/api/Receipts/GetList',
      {
        pageSize: 1000,
        pageNumber: 0,
      }
    );
    return data;
  });
}

export function useGetClients() {
  return useQuery(
    'clients',
    async () => {
      const { data } = await axios.post(
        'https://vsoft.com-eg.net:4041/api/Clients/GetList',
        {
          pageSize: 0,
          pageNumber: 0,
        }
      );

      return data;
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}
export function useGetProduct() {
  return useQuery(
    'products',
    async () => {
      const { data } = await axios.post(
        'https://vsoft.com-eg.net:4041/api/bncProducts/GetPage',
        {
          fromDate: '2022-04-10T09:14:16.215Z',
          toDate: '2023-04-10T09:14:16.215Z',
          serial: 0,
          pageParam: {
            pageSize: 1000,
            pageNumber: 0,
          },
          language: 'string',
        }
      );

      return data;
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}
export function useGetCity() {
  return useQuery(
    'city',
    async () => {
      const { data } = await axios.post(
        'https://vsoft.com-eg.net:4041/api/bncGeoCity/GetList',
        {
          pageSize: 0,
          pageNumber: 0,
        }
      );

      return data;
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}
export function useGetStatus() {
  return useQuery(
    'status',
    async () => {
      const { data } = await axios.post(
        'https://vsoft.com-eg.net:4041/api/Status/GetList',
        {
          pageSize: 0,
          pageNumber: 0,
        }
      );

      return data;
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}
export function useGetCells() {
  return useQuery(
    'cell',
    async () => {
      const { data } = await axios.post(
        'https://vsoft.com-eg.net:4041/api/Cells/GetList',
        {
          pageSize: 0,
          pageNumber: 0,
        }
      );

      return data;
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}

export function useGetDRSTable() {
  return useQuery(
    'drsTable',
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('Table'), 10000);
      });
    },
    {
      staleTime: Infinity,
      cacheTime: 3000,
    }
  );
}

export function useGetSubAccount() {
  return useQuery('subAccount', async () => {
    const { data } = await axios.post(
      `https://vsoft.com-eg.net:4041/api/ConsignmentTypes/GetByCustID/${26}`,
      {
        fromDate: '2022-04-10T11:18:04.943Z',
        toDate: '2023-04-10T11:18:04.943Z',
        serial: 0,
        pageParam: {
          pageSize: 1000,
          pageNumber: 0,
        },
        language: 'string',
      }
    );

    return data;
  });
}
