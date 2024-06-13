import {
  Box,
  Divider,
  Input,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../assets/css/modules/employee/NewEmployee.module.css';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../utilities/CustomizedAutoComplete';
import StyledInputBase from '../utilities/StyledInputBase';
import PrivateStyles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import ColorPickerInput from '../utilities/ColorPickerInput';
import CustomizedLabel from '../utilities/CustomizedLabel';
import styled from 'styled-components';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
const tabStyle = {
  color: 'var(--dark-color)',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
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
const labelContainerField = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  flexDirection: 'column',
  width: '95%',
  mb: '15px',
  mt: '10px',
  padding: '0px 5px',
  borderBottom: '1px solid var(--secondary-color)',
  minWidth: '320px',
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function CompanyModule() {
  const { t } = useTranslation('modules');
  const schema = yup.object().shape({
    companyName: yup.string().required(t('validation.employee_name')),
  });
  const methods = useForm({
    shouldUnregister: true,
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: '',
    },
  });
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
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
          <Box className={styles.nameInfo}>
            <Box sx={{ width: '70%' }}>
              <Box>
                <Typography
                  variant="body"
                  sx={{ fontSize: '24px' }}
                  color="var(--dark-color)"
                  fontWeight="bold"
                >
                  {t('company.form.company_header')}
                </Typography>
              </Box>
              <Box className={styles.singleRow}>
                <StyledInputBase
                  type="text"
                  sx={{ width: '100%' }}
                  minWidth="300px"
                  maxWidth="500px"
                  placeholder={t('company.form.company_name')}
                  //   {...register('companyName')}
                  variant="flex"
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
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  mt: '20px',
                  width: 'fit-content',
                  '& .Mui-selected': {
                    border: '1px solid var(--primary-color)',
                  },
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                <Tab
                  sx={tabStyle}
                  label={t('company.general_info')}
                  {...a11yProps(0)}
                />
                {/* <Tab
                      sx={tabStyle}
                      label={t('company.branches')}
                      {...a11yProps(1)}
                    /> */}
              </Tabs>
            </Box>
            {/* ===================General info================= */}
            <CustomTabPanel value={tabValue} index={0}>
              <Box className={PrivateStyles.privateInfoContainer}>
                <Box className={PrivateStyles.infoSection}>
                  {/* -------------------------streets------------- */}
                  <Box className={styles.formColumn}>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.street')}
                        // minWidth="300px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.street2')}
                        // minWidth="500px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  {/* -------------------------city state zip country------------- */}
                  <Box className={styles.formContainer}>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.city')}
                        minWidth="100px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        minWidth="180px"
                        defaultValue={[]}
                        id="autostate"
                        name="state"
                        label={t('form.state')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                      />
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.zip')}
                        minWidth="100px"
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  <Box className={styles.formColumn}>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autocountry"
                        name="country"
                        label={t('form.country')}
                        options={addresses}
                        multiple
                        //   errors={errors}
                      />
                    </Box>
                    {/* -------------------------tax and others------------- */}

                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.tax_id')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.lei')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.company_id')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={styles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.currency')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                </Box>
                <Box className={PrivateStyles.infoSection}>
                  <Box className={styles.formContainer}>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        minWidth="50px"
                        maxWidth="150px"
                        type="text"
                        placeholder={t('form.private_phone')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        minWidth="50px"
                        maxWidth="150px"
                        type="text"
                        placeholder={t('form.private_mobile')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                  <Box className={PrivateStyles.formColumn}>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('form.private_mail')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.website')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box className={PrivateStyles.singleRow}>
                      <StyledInputBase
                        type="text"
                        placeholder={t('company.form.email_domain')}
                        // {...register('employeeName')}
                      />
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                    <Box sx={labelContainerField}>
                      <Box sx={{ mb: '-5px' }}>
                        <CustomizedLabel>
                          {t('company.form.color')}
                        </CustomizedLabel>
                      </Box>
                      <Box>
                        <ColorPickerInput name="color" />
                      </Box>
                      {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* ===================Branches================= */}
            </CustomTabPanel>
            {/* <CustomTabPanel value={tabValue} index={1}>
                </CustomTabPanel> */}
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
