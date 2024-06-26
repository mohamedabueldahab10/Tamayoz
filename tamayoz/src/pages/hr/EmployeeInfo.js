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
import { useGetjobPosition } from '../../queries/HrQueries';
const ImageContainer = styled(Box)`
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
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
export default function EmployeeInfo() {
  const [jobPosition, setJobPosition] = useState([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const handleNextPage = () => {
    console.log('clicked load more');
    setCurrentJobPage((prevPage) => prevPage + 1);
  };
  const { data: jobPositionData } = useGetjobPosition(currentJobPage);
  useEffect(() => {
    useGetjobPosition(currentJobPage);
  }, [currentJobPage]);
  useEffect(() => {
    if (jobPositionData) {
      setJobPosition(
        jobPositionData.data.map((job) => ({
          label: job.name,
          id: job.id,
        }))
      );
    }
  }, [jobPositionData]);
  console.log('jobPositionData', jobPositionData);
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
  } = useFormContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setSelectedImage(file);
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
              defaultValue={[]}
              id="autoTags"
              name="tags"
              label={t('form.tags')}
              options={currencies}
              multiple
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
                  // {...register("employeeImage")}
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
                    style={{ maxWidth: '100%', maxHeight: '100px' }}
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
              defaultValue={[]}
              name="company"
              label={t('form.company')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoCompany"
              multiple
              errors={errors}
              setOpen={() => setCompanyOpen(true)}
            />
          </Box>
        </Box>
        <Box className={styles.formColumn}>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              defaultValue={[]}
              name="department"
              label={t('form.department')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoDepartment"
              multiple
              errors={errors}
              setOpen={() => setDepartmentOpen(true)}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              defaultValue={[]}
              name="manager"
              label={t('form.manager')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoManager"
              multiple
              errors={errors}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              defaultValue={[]}
              name="jobPosition"
              label={t('form.job_position')}
              options={jobPosition}
              getOptionLabel={(option) => option.label}
              id="autoJobPosition"
              multiple
              errors={errors}
              setOpen={() => setOpenJobPosition(true)}
              handleNextPage={handleNextPage}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              defaultValue={[]}
              name="degree"
              label={t('form.degree')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoDegree"
              multiple
              errors={errors}
              setOpen={() => setDegreeOpen(true)}
            />
          </Box>
          <Box className={styles.singleRow}>
            <CustomizedAutoComplete
              defaultValue={[]}
              name="coach"
              label={t('form.coach')}
              options={currencies}
              getOptionLabel={(option) => option.label}
              id="autoCoach"
              multiple
              errors={errors}
            />
          </Box>
          <Box className={styles.dateContainer}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <CustomSingleDate
                name="date"
                defaultValue={null}
                label={t('form.next_appraisal_date')}
                width="300px"
                height="40px"
              />
            </Box>
          </Box>
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
