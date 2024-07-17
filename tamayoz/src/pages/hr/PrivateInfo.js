import { Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/css/modules/employee/PrivateInfo.module.css';
import publicStyles from '../../assets/css/modules/employee/NewEmployee.module.css';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import ErrorText from '../../components/utilities/ErrorText';
import { useFormContext } from 'react-hook-form';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
import StyledCheck from '../../components/utilities/StyledCheck';
import CustomSingleDate from '../../components/utilities/CustomSingleDate';
import BankAccountModal from '../../components/bankAcc/BankAccountModal';
import {
  useGetCountry,
  useGetLanguage,
  useGetState,
} from '../../queries/HrQueries';
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
  // =========================================================================
  const [stateQuery, setStateQuery] = useState([]);
  const [currentStatePage, setCurrentStatePage] = useState(1);
  const {
    data: stateData,
    isLoading: isStateLoading,
    isError: isStateError,
    error: stateError,
    fetchNextPage: fetchNextStatePage,
    hasNextPage: hasNextStatePage,
    isFetchingNextPage: isFethcingNextStatePage,
  } = useGetState(currentStatePage);
  useEffect(() => {
    if (stateData) {
      setStateQuery((prevOptions) => {
        const newOptions = stateData.pages
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
  }, [stateData]);
  const handleNextStatePage = () => {
    if (hasNextStatePage) {
      setCurrentStatePage((prevPage) => prevPage + 1);
      fetchNextStatePage();
    }
  };
  // =========================================================================
  const [cityQuery, setCityQuery] = useState([]);
  const [currentCityPage, setCurrentCityPage] = useState(1);
  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
    error: cityError,
    fetchNextPage: fetchNextCityPage,
    hasNextPage: hasNextCityPage,
    isFetchingNextPage: isFethcingNextCityPage,
  } = useGetState(currentCityPage);
  useEffect(() => {
    if (cityData) {
      setCityQuery((prevOptions) => {
        const newOptions = cityData.pages
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
  }, [cityData]);
  const handleNextCityPage = () => {
    if (hasNextCityPage) {
      setCurrentCityPage((prevPage) => prevPage + 1);
      fetchNextCityPage();
    }
  };
  // =========================================================================
  const [langQuery, setLangQuery] = useState([]);
  const [currentLangPage, setCurrentLangPage] = useState(1);
  const {
    data: langData,
    isLoading: isLangLoading,
    isError: isLangError,
    error: langError,
    fetchNextPage: fetchNextLangPage,
    hasNextPage: hasNextLangPage,
    isFetchingNextPage: isFethcingNextLangPage,
  } = useGetLanguage(currentLangPage);
  useEffect(() => {
    if (langData) {
      setLangQuery((prevOptions) => {
        const newOptions = langData.pages
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
  }, [langData]);
  const handleNextLangPage = () => {
    if (hasNextLangPage) {
      setCurrentLangPage((prevPage) => prevPage + 1);
      fetchNextLangPage();
    }
  };
  // =========================================================================
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
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
                {...register('street')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.street2')}
                minWidth="500px"
                {...register('street2')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formContainer}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                minWidth="180px"
                defaultValue={[]}
                id="autostate"
                name="city"
                label={t('form.city')}
                multiple
                options={cityQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                // setOpen={() => setCompanyOpen(true)}
                handleNextPage={handleNextCityPage}
                fetchNextPage={fetchNextCityPage}
                hasNextPage={hasNextCityPage}
                isFetchingNextPage={isFethcingNextCityPage}
                isLoading={isCityLoading}
                isError={isCityError}
                error={cityError}
                //   errors={errors}
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                minWidth="180px"
                defaultValue={[]}
                id="autostate"
                name="state"
                label={t('form.state')}
                multiple
                options={stateQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                // setOpen={() => setCompanyOpen(true)}
                handleNextPage={handleNextStatePage}
                fetchNextPage={fetchNextStatePage}
                hasNextPage={hasNextStatePage}
                isFetchingNextPage={isFethcingNextStatePage}
                isLoading={isStateLoading}
                isError={isStateError}
                error={stateError}
                //   errors={errors}
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.zip')}
                minWidth="100px"
                {...register('zip')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                control={control}
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
                {...register('privatemail')}
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
                {...register('privatephone')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                minWidth="270px"
                type="text"
                placeholder={t('form.private_mobile')}
                {...register('privatemobile')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
          </Box>
          <Box className={publicStyles.formColumn}>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                control={control}
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
                control={control}
                defaultValue={[]}
                id="autolanguage"
                name="language"
                label={t('form.lang')}
                multiple
                options={langQuery}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                // setOpen={() => setCompanyOpen(true)}
                handleNextPage={handleNextLangPage}
                fetchNextPage={fetchNextLangPage}
                hasNextPage={hasNextLangPage}
                isFetchingNextPage={isFethcingNextLangPage}
                isLoading={isLangLoading}
                isError={isLangError}
                error={langError}
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.home_work_distance')}
                {...register('workdistance')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                minWidth="300px"
                type="text"
                placeholder={t('form.private_car_plate')}
                {...register('privatecarplate')}
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
                control={control}
                defaultValue={[]}
                customwidth="100%"
                id="automarital"
                name="maritalStatus"
                label={t('form.marital_status')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="number"
                placeholder={t('form.dependences_no')}
                {...register('dependenciesnumber')}
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
                {...register('contactname')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.contact_no')}
                {...register('contactnumber')}
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
                control={control}
                defaultValue={[]}
                customwidth="100%"
                id="autocertificate"
                name="certificateLevel"
                label={t('form.certificate_level')}
                options={addresses}
                multiple
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.study_field')}
                {...register('stydyfield')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.school')}
                {...register('school')}
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
                {...register('visanumber')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.work_permit_no')}
                {...register('workpermitnumber')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={styles.dateContainer}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginBlock: '10px',
                }}
              >
                <CustomSingleDate
                  name="visaexpirationdate"
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
                  marginBlock: '10px',
                }}
              >
                <CustomSingleDate
                  name="workpermitexpirationdate"
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
                  placeholder="Permit Expiration"
                  {...register('workpermit')}
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
                control={control}
                defaultValue={[]}
                customwidth="100%"
                id="autonationality"
                name="nationality"
                label={t('form.nationality')}
                options={addresses}
                multiple
                //   errors={errors}
                //   errors={errors}
              />
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.id_no')}
                {...register('idnumber')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <StyledInputBase
                type="text"
                placeholder={t('form.ssn_no')}
                {...register('ssnnumber')}
              />
              {/* <ErrorText>{errors.employeeName?.message}</ErrorText> */}
            </Box>
            <Box className={publicStyles.singleRow}>
              <CustomizedAutoComplete
                control={control}
                defaultValue={[]}
                customwidth="100%"
                id="autogender"
                name="gender"
                label={t('form.gender')}
                options={addresses}
                multiple
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
                  marginBlock: '10px',
                }}
              >
                <CustomSingleDate
                  name="birthdate"
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
                {...register('birthplace')}
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
                <StyledCheck id="resident" {...register('nonresident')} />
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
