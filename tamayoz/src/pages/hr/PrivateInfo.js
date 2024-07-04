import { Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import ErrorText from '../../components/utilities/ErrorText';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
import StyledCheck from '../../components/utilities/StyledCheck';
import CustomSingleDate from '../../components/utilities/CustomSingleDate';
import BankAccountModal from '../../components/bankAcc/BankAccountModal';
import { useGetCountry } from '../../queries/HrQueries';
const addresses = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function PrivateInfo() {
  const [bankAccOpen, setBankAccOpen] = useState(false);
  const handleCloseBankAcc = () => setBankAccOpen(false);

  const { t } = useTranslation('modules');
  const [countryQuery, setCountryQuery] = useState([]);
  const [currentCountryPage, setCurrentCountryPage] = useState(1);
  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
    error: countryError,
    fetchNextPage: fetchNextCountryPage,
    hasNextPage: hasNextCountryPage,
    isFetchingNextPage: isFethcingNextCountryPage,
  } = useGetCountry(currentCountryPage);
  console.log('CountryData', countryData);
  useEffect(() => {
    if (countryData) {
      setCountryQuery((prevOptions) => {
        const newOptions = countryData.pages
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
  }, [countryData]);
  const handleNextCountryPage = () => {
    if (hasNextCountryPage) {
      setCurrentCountryPage((prevPage) => prevPage + 1);
      fetchNextCountryPage();
    }
  };
  console.log('countryQuery', countryQuery);
  return (
    <Box className={styles.privateInfoContainer}>
      {/* =======================Private content======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.contact')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.street')}
                minWidth="500px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.street2')}
                minWidth="500px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formContainer}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.city')}
                minWidth="100px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
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
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.zip')}
                minWidth="100px"
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autocountry"
                name="country"
                label={t('form.country')}
                multiple
                options={countryQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                // setOpen={() => setCompanyOpen(true)}
                handleNextPage={handleNextCountryPage}
                fetchNextPage={fetchNextCountryPage}
                hasNextPage={hasNextCountryPage}
                isFetchingNextPage={isFethcingNextCountryPage}
                isLoading={isCountryLoading}
                isError={isCountryError}
                error={countryError}
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.private_mail')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formContainer}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                minWidth="270px"
                type="text"
                placeholder={t('form.private_phone')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                minWidth="270px"
                type="text"
                placeholder={t('form.private_mobile')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autobankaccount"
                name="bankaccount"
                label={t('form.bank_account')}
                options={addresses}
                multiple
                //   errors={errors}
                setOpen={() => setBankAccOpen(true)}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                id="autolanguage"
                name="language"
                label={t('form.lang')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.home_work_distance')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                minWidth="300px"
                type="text"
                placeholder={t('form.private_car_plate')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Family Status======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.family_status')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="automarital"
                name="maritalStatus"
                label={t('form.marital_status')}
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.dependences_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Emergency======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.emergency')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.contact_name')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.contact_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Education======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.education')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autocertificate"
                name="certificateLevel"
                label={t('form.certificate_level')}
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.study_field')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.school')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* =======================Work Permit======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.work_permit')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.visa_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.work_permit_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
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
                  label={t('form.visa_expiration_date')}
                  width="300px"
                  height="40px"
                />
              </Box>
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
                  label={t('form.work_permit_expiration_date')}
                  width="300px"
                  height="40px"
                />
              </Box>
            </Box>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                marginBlock: '10px',
              }}
            >
              <Box sx={{ marginBottom: '-5px !important' }}>
                <CustomizedLabel>{t('form.work_permit')}</CustomizedLabel>
              </Box>
              <Box>
                <StyledInputBase
                  type="file"
                  placeholder="Work Permit Expiration Date"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
      {/* =======================Citizenship======================= */}
      <Box className={styles.infoSection}>
        <Box sx={{ width: '100%' }}>
          <TypographyHeader>{t('private_info.citizenship')}</TypographyHeader>
          <Divider sx={{ marginBottom: '10px' }} />
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autonationality"
                name="nationality"
                label={t('form.nationality')}
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.id_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.ssn_no')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                defaultValue={[]}
                customwidth="100%"
                id="autogender"
                name="gender"
                label={t('form.gender')}
                options={addresses}
                // multiple
                //   errors={errors}
              />
            </Box>
            <Box className={styles.dateContainer}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '10px',
                  mb: '5px',
                }}
              >
                <CustomSingleDate
                  name="date"
                  defaultValue={null}
                  label={t('form.birth_date')}
                  width="300px"
                  height="40px"
                />
              </Box>
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.birth_place')}
                // {...register('employeeName')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
                width: '90%',
              }}
            >
              <Box>
                <CustomizedLabel>{t('form.non_resident')}</CustomizedLabel>
              </Box>
              <Box>
                <StyledCheck
                  id="resident"
                  //   {...register('nextAppraisalDate')}
                />
                <Box>
                  {/* <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <BankAccountModal open={bankAccOpen} handleClose={handleCloseBankAcc} />
    </Box>
  );
}
