import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AxiosInstance from '../../components/helpers/AxiosInstance';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import UpdateEmployee from './EditEmployee/UpdateEmployee';
export default function EmployeeDetails() {
  const instance = AxiosInstance();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { isLoading, data, error } = useQuery('EmployeeByID', async () => {
    const res = await instance.get(`Employee/GetById?id=${id}`);
    return res.data.data;
  });
  useEffect(() => {
    setInitialData(data);
  }, [data]);

  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <NotFound />
      ) : (
        <UpdateEmployee empId={id} initialData={initialData} />
      )}
    </>
  );
}
