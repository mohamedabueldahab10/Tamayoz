/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Input, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorText from '../../components/utilities/ErrorText';
import styled from 'styled-components';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import DepartmentModal from '../../components/department/DepartmentModal';
import CustomSingleDate from '../../components/utilities/CustomSingleDate';
import CompanyModal from '../../components/company/CompanyModal';
import JobPositionModal from '../../components/jobPosition/JobPositionModal';
import DegreeModal from '../../components/degree/DegreeModal';
import {
  useGetCompany,
  useGetDepartment,
  useGetJobPosition,
} from '../../queries/HrQueries';
const ImageContainer = styled(Box)`
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  over-flow: hidden;
`;
// const dateRow = {
//     display:"flex",
//     justifyContent:"start",
//     alignItems:"start",
//     minWidth:"320px",
//     marginBottom:"5px",
//     marginTop:"10px"
// }
const deleteImage = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  backgroundImage: 'url(selectedImage)',
  transform: 'translate(-50%,50%)',
  width: '30px',
  height: '30px',
  zIndex: '999',
  display: 'grid',
  placeItems: 'center',
  border: '1px solid var(--primary-color)',
  borderRadius: '50%',
};
const currencies = [
  { label: 'Sales', id: 1 },
  { label: 'Trainer', id: 2 },
  { label: 'Consultant', id: 3 },
];
export default function EmployeeInfo({ onFileChange }) {
  const [jobPositionQuery, setJobPositionQuery] = useState([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const {
    data: jobPositionData,
    isLoading: isJobPositionLoading,
    isError: isJobPositionError,
    error: jobPostionError,
    fetchNextPage: fetchNextJobPage,
    hasNextPage: hasNextJobPage,
    isFetchingNextPage: isFethcingNextJobPage,
  } = useGetJobPosition(currentJobPage);
  useEffect(() => {
    if (jobPositionData) {
      setJobPositionQuery((prevOptions) => {
        const newOptions = jobPositionData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [jobPositionData]);
  const handleNextJobPage = () => {
    if (hasNextJobPage) {
      setCurrentJobPage((prevPage) => prevPage + 1);
      fetchNextJobPage();
    }
  };
  // ===============================================================================
  const [companyQuery, setcompanyQuery] = useState([]);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1);
  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
    fetchNextPage: fetchNextCompanyPage,
    hasNextPage: hasNextCompanyPage,
    isFetchingNextPage: isFethcingNextCompanyPage,
  } = useGetCompany(currentCompanyPage);
  useEffect(() => {
    if (companyData) {
      setcompanyQuery((prevOptions) => {
        const newOptions = companyData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [companyData]);
  const handleNextCompanyPage = () => {
    if (hasNextCompanyPage) {
      setCurrentCompanyPage((prevPage) => prevPage + 1);
      fetchNextCompanyPage();
    }
  };
  // ===============================================================================
  const [departmentQuery, setDepartmentQuery] = useState([]);
  const [currentDepartmentPage, setCurrentDepartmentPage] = useState(1);
  const {
    data: DepartmentData,
    isLoading: isDepartmentLoading,
    isError: isDepartmentError,
    error: departmentError,
    fetchNextPage: fetchNextDepartmentPage,
    hasNextPage: hasNextDepartmentPage,
    isFetchingNextPage: isFethcingNextDepartmentPage,
  } = useGetDepartment(currentDepartmentPage);
  useEffect(() => {
    if (DepartmentData) {
      setDepartmentQuery((prevOptions) => {
        const newOptions = DepartmentData.pages
          .flatMap((page) => page.data)
          .filter((option) => option !== null);
        const optionsSet = new Set([
          ...prevOptions.map((option) => option.id),
          ...newOptions.map((option) => option.id),
        ]);
        return [...optionsSet].map(
          (id) =>
            newOptions.find((option) => option.id === id) ||
            prevOptions.find((option) => option.id === id)
        );
      });
    }
  }, [DepartmentData]);
  const handleNextDepartmentPage = () => {
    if (hasNextDepartmentPage) {
      setCurrentDepartmentPage((prevPage) => prevPage + 1);
      fetchNextDepartmentPage();
    }
  };
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const handleCloseDepartment = () => {
    setDepartmentOpen(false);
  };
  const [degreeOpen, setDegreeOpen] = useState(false);
  const handleCloseDegree = () => {
    setDegreeOpen(false);
  };
  const [companyOpen, setCompanyOpen] = useState(false);
  const handleCloseCompany = () => {
    setCompanyOpen(false);
  };
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const handleCloseJobPosition = () => {
    setOpenJobPosition(false);
  };
  const { t } = useTranslation('modules');
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setSelectedImage(file);
    onFileChange(file);
  };

  const handleDelete = () => {
    if (selectedImage) {
      setSelectedImage(null);
      setImageUrl(null);
    }
  };
  return (
    <>
      <Box className={styles.nameInfo}>
        <Box sx={{ width: '70%' }}>
          <StyledInputBase
            maxwidth="600px"
            sx={{ width: '100%', display: 'block' }}
            type="text"
            placeholder={t('form.employee_name')}
            {...register('employeeName')}
          />
          <ErrorText>{errors.employeeName?.message}</ErrorText>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              defaultValue={[]}
              id="autoTags"
              name="tags"
              label={t('form.tags')}
              options={currencies}
              multiple={true}
              errors={errors}
            />
          </Box>
        </Box>
        <Box sx={{ width: 'fit-content' }}>
          <div>
            {!selectedImage ? (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload-input"
                  // {...register('employeeImage')}
                />
                <label htmlFor="image-upload-input">
                  <ImageContainer>
                    <AddAPhotoIcon
                      sx={{ fontSize: '80px', color: 'var(--primary-color)' }}
                    />
                  </ImageContainer>
                </label>
              </>
            ) : (
              <>
                <ImageContainer>
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '95px',
                    }}
                  />
                  <Box onClick={handleDelete} sx={deleteImage}>
                    <Tooltip title="Delete">
                      <DeleteForeverIcon
                        sx={{ fontSize: '25px', color: 'var(--primary-color)' }}
                      />
                    </Tooltip>
                  </Box>
                </ImageContainer>
              </>
            )}
          </div>
        </Box>
      </Box>
      <Box className={styles.formContainer}>
        <Box className={styles.formColumn}>
          <Box className={styles.singleRow}>
            <Box>
              <StyledInputBase
                type="text"
                placeholder={t('form.work_mobile')}
                {...register('workMobile')}
                variant="flex"
              />
            </Box>
            <Box>
              <ErrorText>{errors.workMobile?.message}</ErrorText>
            </Box>
          </Box>
          <Box className={styles.singleRow}>
            <Box>
              <StyledInputBase
                type="text"
                placeholder={t('form.work_phone')}
                {...register('workPhone')}
                variant="flex"
              />
            </Box>
            <Box>
              <ErrorText>{errors.workPhone?.message}</ErrorText>
            </Box>
          </Box>
          <Box className={styles.singleRow}>
            <Box>
              <StyledInputBase
                type="text"
                placeholder={t('form.work_mail')}
                {...register('workMail')}
              />
            </Box>
            <Box>
              <ErrorText>{errors.workMail?.message}</ErrorText>
            </Box>
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={[]}
              name="company"
              label={t('form.company')}
              options={companyQuery}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              id="autoCompany"
              multiple={false}
              errors={errors}
              setOpen={() => setCompanyOpen(true)}
              handleNextPage={handleNextCompanyPage}
              fetchNextPage={fetchNextCompanyPage}
              hasNextPage={hasNextCompanyPage}
              isFetchingNextPage={isFethcingNextCompanyPage}
              isLoading={isCompanyLoading}
              isError={isCompanyError}
              error={companyError}
            />
          </Box>
        </Box>
        <Box className={styles.formColumn}>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={[]}
              name="department"
              label={t('form.department')}
              id="autoDepartment"
              multiple={false}
              errors={errors}
              setOpen={() => setDepartmentOpen(true)}
              options={departmentQuery}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              handleNextPage={handleNextDepartmentPage}
              fetchNextPage={fetchNextDepartmentPage}
              hasNextPage={hasNextDepartmentPage}
              isFetchingNextPage={isFethcingNextDepartmentPage}
              isLoading={isDepartmentLoading}
              isError={isDepartmentError}
              error={departmentError}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={[]}
              name="manager"
              label={t('form.manager')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoManager"
              multiple={false}
              errors={errors}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={[]}
              name="jobPosition"
              label={t('form.job_position')}
              options={jobPositionQuery}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              id="autoJobPosition"
              multiple={false}
              errors={errors}
              setOpen={() => setOpenJobPosition(true)}
              handleNextPage={handleNextJobPage}
              fetchNextPage={fetchNextJobPage}
              hasNextPage={hasNextJobPage}
              isFetchingNextPage={isFethcingNextJobPage}
              isLoading={isJobPositionLoading}
              isError={isJobPositionError}
              error={jobPostionError}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={[]}
              name="degree"
              label={t('form.degree')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoDegree"
              multiple={false}
              errors={errors}
              setOpen={() => setDegreeOpen(true)}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              control={control}
              // defaultValue={}
              name="coach"
              label={t('form.coach')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoCoach"
              multiple={false}
              errors={errors}
            />
          </Box>
          {/* <Box className={styles.dateContainer}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                marginBlock: '10px',
              }}
            >
              <CustomSingleDate
                name="nextAppraisalDate"
                // defaultValue={Date()}
                label={t('form.next_appraisal_date')}
                width="300px"
                height="40px"
              />
            </Box>
          </Box> */}
        </Box>
      </Box>
      <CompanyModal open={companyOpen} handleClose={handleCloseCompany} />
      <DepartmentModal
        open={departmentOpen}
        handleClose={handleCloseDepartment}
      />
      <JobPositionModal
        open={openJobPosition}
        handleClose={handleCloseJobPosition}
      />
      <DegreeModal open={degreeOpen} handleClose={handleCloseDegree} />
    </>
  );
}
