import { Box, Divider, Input, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import StyledInputBase from '../utilities/StyledInputBase';
import BackupIcon from '@mui/icons-material/Backup';
import styled from 'styled-components';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CompanyModal from '../company/CompanyModal';
import CustomizedLabel from '../utilities/CustomizedLabel';
import StyledCheck from '../utilities/StyledCheck';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
const headModalStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  padding: '15px 5px',
  width: '100%',
};
const labelContainerField = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '95%',
  mb: '15px',
  //   mt: '10px',
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '300px',
  maxWidth: '300px',
};
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
export default function RelatedUsersModule() {
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    employeeName: yup.string().required(t('validation.employee_name')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
    },
  });
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
  const [openCompany, setOpenCompany] = useState(false);
  const handleCloseCompany = () => {
    setOpenCompany(false);
  };
  const handleFormSubmit = async (data) => {
    console.log('Employee Data', data);
  };
  return (
    <>
      <Box className={styles.headerInfo}>
        <Tooltip title="Save">
          <BackupIcon
            sx={{
              color: 'var(--primary-color)',
              fontSize: '28px',
              cursor: 'pointer',
            }}
            onClick={() => methods.handleSubmit(handleFormSubmit)()}
          />
        </Tooltip>
      </Box>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Box sx={headModalStyle}>
            <Typography color="var(--dark-color)" fontWeight="bold">
              {t('relatedusers.create_relatedusers')}
            </Typography>
          </Box>
          <Divider sx={{ mb: '5px' }} />
          <Box className={styles.nameInfo}>
            <Box sx={{ width: '70%' }}>
              <Box className={styles.singleRow}>
                <StyledInputBase
                  type="text"
                  sx={{ width: '100%' }}
                  minWidth="300px"
                  maxWidth="500px"
                  placeholder={t('relatedusers.form.name')}
                  //   {...register('companyName')}
                  variant="flex"
                />
              </Box>
              <Box className={styles.singleRow}>
                <StyledInputBase
                  type="text"
                  sx={{ width: '100%' }}
                  placeholder={t('relatedusers.form.email_address')}
                  minWidth="300px"
                  maxWidth="500px"
                  // {...register('employeeName')}
                />
                {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
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
                          sx={{
                            fontSize: '80px',
                            color: 'var(--primary-color)',
                          }}
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
                            sx={{
                              fontSize: '25px',
                              color: 'var(--primary-color)',
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </ImageContainer>
                  </>
                )}
              </div>
            </Box>
          </Box>
          <Divider sx={{ mb: '5px' }} />
          <Box className={styles.formColumn}>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autocompany"
                name="company"
                label={t('relatedusers.form.company')}
                options={addresses}
                multiple
                //   errors={errors}
                setOpen={() => setOpenCompany(true)}
              />
            </Box>
            <Box className={styles.singleRow}>
              <StyledInputBase
                type="text"
                sx={{ width: '100%' }}
                placeholder={t('relatedusers.form.phone')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.singleRow}>
              <StyledInputBase
                type="text"
                sx={{ width: '100%' }}
                placeholder={t('relatedusers.form.mobile')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autowarehouse"
                name="warehouse"
                label={t('relatedusers.form.default_warehouse')}
                options={addresses}
                multiple
                //   errors={errors}
                setOpen={() => setOpenCompany(true)}
              />
            </Box>
            <Box sx={labelContainerField}>
              <Box>
                <CustomizedLabel>
                  {t('relatedusers.form.create_employee')}
                </CustomizedLabel>
              </Box>
              <Box>
                <StyledCheck name="Create Employee" />
              </Box>
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </form>
      </FormProvider>
      <CompanyModal open={openCompany} handleClose={handleCloseCompany} />
    </>
  );
}
