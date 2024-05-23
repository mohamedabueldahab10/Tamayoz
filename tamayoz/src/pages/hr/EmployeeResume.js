import {
  Alert,
  Box,
  Divider,
  FormLabel,
  LinearProgress,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import StyledButton from '../../components/utilities/StyledButton';
import { useTranslation } from 'react-i18next';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoxModal from '../../components/utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../../components/utilities/SecondaryBtn';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomRadioGroup from '../../components/utilities/CustomRadioGroup';
import StyledInputBase from '../../components/utilities/StyledInputBase';
import ErrorText from '../../components/utilities/ErrorText';
import CustomizedLabel from '../../components/utilities/CustomizedLabel';
import CustomDatePicker from '../../components/utilities/CustomDatePicker';
import styles from '../../assets/css/modules/employee/EmployeeResume.module.css';
const skills = [
  { label: 'IT', id: 1 },
  { label: 'Languages', id: 2 },
  { label: 'Marketing', id: 3 },
  { label: 'Programming', id: 4 },
  { label: 'Soft Skills', id: 5 },
];
export default function EmployeeResume() {
  const { t } = useTranslation('modules');
  const [openSkills, setOpenSkills] = useState(false);
  const handleToggleSkills = () => setOpenSkills(!openSkills);
  const [snackSkills, setSnackSkills] = useState(false);
  const handleCloseSkillsSnack = () => setSnackSkills(false);
  const [disableSkills, setDisableSkills] = useState(false);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillsResult, setSkillsResult] = useState(null);
  const skillsSchema = yup.object().shape({
    skillType: yup.string().required(t('validation.skill_type')),
    skill: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.skill')),
          id: yup.number().required(t('validation.skill')),
        })
      )
      .min(1, t('validation.skill'))
      .required(t('validation.skill')),
    skillLevel: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.skill_level')),
          id: yup.number().required(t('validation.skill_level')),
        })
      )
      .min(1, t('validation.skill_level'))
      .required(t('validation.skill_level')),
  });
  const skillsMethods = useForm({
    resolver: yupResolver(skillsSchema),
    mode: 'onTouched',
    defaultValues: {
      skillType: '',
      skill: [],
      skillLevel: [],
    },
  });
  const {
    handleSubmit: handleSubmitSkills,
    reset: resetSkills,
    formState: { errors: skillsErrors },
  } = skillsMethods;
  const handleSkills = (data) => {
    skillsSchema
      .validate(data, { abortEarly: false })
      .then((data) => {
        console.log('Validation succeeded:', data);
      })
      .catch((err) => {
        console.log('Validation failed:', err.errors);
      });
    console.log('SkillsData');
    console.log('SkillsData', data);
    setSkillsResult(data);
    setDisableSkills(true);
    setSkillsLoading(true);
    //reset();
    // axios
    //   .post("https://vsoft.com-eg.net:4041/api/Branches/Add", data)
    //   .then((res) => {
    //     setSkillsLoading(false);
    //   })
    //   .catch((err) => {
    //     setSnack(true);
    //   });
  };
  console.log('skillsErr', skillsErrors);
  //   =======================================================================================================
  const [openResume, setOpenResume] = useState(false);
  const handleToggleResume = () => setOpenResume(!openResume);
  const [snackResume, setSnackResume] = useState(false);
  const handleCloseResumeSnack = () => setSnackResume(false);
  const [disableResume, setDisableResume] = useState(false);
  const [ResumeLoading, setResumeLoading] = useState(false);
  const [ResumeResult, setResumeResult] = useState(null);
  const resumeSchema = yup.object().shape({
    title: yup.string().required(t('validation.title')),
    employee: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.employee')),
          id: yup.number().required(t('validation.employee')),
        })
      )
      .min(1, t('validation.employee'))
      .required(t('validation.employee')),
    type: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.type')),
          id: yup.number().required(t('validation.type')),
        })
      )
      .min(1, t('validation.type'))
      .required(t('validation.type')),
    displayType: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(t('validation.display_type')),
          id: yup.number().required(t('validation.display_type')),
        })
      )
      .min(1, t('validation.display_type'))
      .required(t('validation.display_type')),
    description: yup.string().required(t('validation.description')),
    duration: yup
      .object({
        start: yup
          .date()
          .nullable()
          .required(t('validation.start_date'))
          .typeError(t('validation.start_date')),
        end: yup
          .date()
          .nullable()
          .required(t('validation.end_date'))
          .typeError(t('validation.end_date')),
      })
      .required(),
  });
  const resumeMethods = useForm({
    resolver: yupResolver(resumeSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      employee: [],
      type: [],
      displayType: [],
      description: '',
      duration: null,
    },
  });
  const {
    handleSubmit: handleSubmitResume,
    reset: resetResume,
    formState: { errors: resumeErrors },
    control: resumeControl,
  } = resumeMethods;
  const handleResume = (data) => {
    resumeSchema
      .validate(data, { abortEarly: false })
      .then((data) => {
        console.log('Validation succeeded:', data);
      })
      .catch((err) => {
        console.log('Validation failed:', err.errors);
      });
    console.log('resume data');
    console.log('resume data', data);
    setResumeResult(data);
    setDisableResume(true);
    setResumeLoading(true);
    //reset();
    // axios
    //   .post("https://vsoft.com-eg.net:4041/api/Branches/Add", data)
    //   .then((res) => {
    //     setSkillsLoading(false);
    //   })
    //   .catch((err) => {
    //     setSnack(true);
    //   });
  };
  console.log('resumeErr', resumeErrors);
  return (
    <>
      <Box className={styles.resumeContainer}>
        <Box className={styles.resumeSide}>
          <TypographyHeader>{t('resume.resume')}</TypographyHeader>
          <Divider />
          <Box sx={{ marginBlock: '20px' }}>
            <StyledButton onClick={handleToggleResume}>
              {t('resume.add_resume')}
            </StyledButton>
          </Box>
          <Modal open={openResume} onClose={handleToggleResume}>
            <FormProvider {...resumeMethods}>
              <form onSubmit={handleSubmitResume(handleResume)}>
                <BoxModal>
                  <Box className={styles.modalStyle}>
                    <Typography color="var(--dark-color)" fontWeight="bold">
                      {t('resume.create_resume')}
                    </Typography>
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <CloseIcon onClick={handleToggleResume} />
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={styles.resumeForm}>
                    <Box sx={{ width: '70%' }}>
                      <StyledInputBase
                        maxwidth="600px"
                        sx={{ width: '100%', display: 'block' }}
                        type="text"
                        placeholder={t('form.title')}
                        {...resumeMethods.register('title')}
                      />
                      <ErrorText>{resumeErrors.title?.message}</ErrorText>
                    </Box>
                  </Box>
                  <Box className={styles.resumeForm}>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autoEmployee"
                        name="employee"
                        label={t('form.employee')}
                        options={skills}
                        multiple
                        errors={resumeErrors}
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
                        <CustomizedLabel>{t('form.duration')}</CustomizedLabel>
                        <CustomDatePicker
                          control={resumeControl}
                          name="duration"
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '90%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {resumeErrors.duration &&
                          resumeErrors.duration.start && (
                            <ErrorText>
                              {resumeErrors.duration?.start.message}
                            </ErrorText>
                          )}
                        {resumeErrors.duration && resumeErrors.duration.end && (
                          <ErrorText>
                            {resumeErrors.duration?.end.message}
                          </ErrorText>
                        )}
                      </Box>
                    </Box>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        name="type"
                        label={t('form.type')}
                        options={skills}
                        getOptionLabel={(option) => option.label}
                        id="autoType"
                        multiple
                        errors={resumeErrors}
                      />
                    </Box>
                    <Box className={styles.singleRow}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        name="displayType"
                        label={t('form.display_type')}
                        options={skills}
                        getOptionLabel={(option) => option.label}
                        id="autodisplayType"
                        multiple
                        errors={resumeErrors}
                      />
                    </Box>
                    {/* <Box className={styles.resumeForm}> */}
                    <Box sx={{ width: '95%' }}>
                      <StyledInputBase
                        // maxwidth="600px"
                        sx={{ width: '100%', display: 'block' }}
                        type="text"
                        fullWidth={true}
                        placeholder={t('form.description')}
                        {...resumeMethods.register('description')}
                      />
                      <ErrorText>{resumeErrors.description?.message}</ErrorText>
                    </Box>
                    {/* </Box> */}
                  </Box>
                  <Divider />
                  <Box className={styles.ButtonContainer}>
                    <StyledButton
                      disabled={disableResume}
                      customwidth="120px"
                      customminwidth="100px"
                      onClick={() => {
                        handleSubmitResume((data) => {
                          handleResume(data);
                          setOpenResume(false);
                          resetResume();
                        })();
                      }}
                    >
                      {t('resume.save_close')}
                    </StyledButton>
                    <StyledButton
                      disabled={disableResume}
                      customwidth="120px"
                      customminwidth="100px"
                      onClick={() => {
                        handleSubmitResume((data) => {
                          handleResume(data);
                          resetResume();
                        })();
                      }}
                    >
                      {t('resume.save_new')}
                    </StyledButton>
                    <SecondaryBtn
                      customwidth="120px"
                      customminwidth="100px"
                      onClick={() => {
                        resetResume();
                        handleToggleResume();
                      }}
                    >
                      {t('resume.discard')}
                    </SecondaryBtn>
                  </Box>
                </BoxModal>
              </form>
            </FormProvider>
          </Modal>
          <Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackResume}
                autoHideDuration={4500}
                onClose={handleCloseResumeSnack}
              >
                <Alert severity="error" sx={{ width: '100%' }}>
                  {t('resume.skills_error')}
                </Alert>
              </Snackbar>
            </Stack>
          </Box>
        </Box>
        {/* ========================================================================================= */}
        <Box className={styles.skillsSide}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              width: '100%',
            }}
          >
            <TypographyHeader>{t('resume.skills')}</TypographyHeader>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography color="var(--dark-color)" fontWeight="bold">
                TimeLine
              </Typography>
              <AutoGraphIcon
                fontSize="medium"
                sx={{ color: 'var(--dark-color)' }}
              />
            </Box>
          </Box>
          <Divider />
          <Box sx={{ marginBlock: '20px' }}>
            <Typography
              sx={{ fontSize: '16px', color: 'var(--text-secondary-color)' }}
            >
              {t('resume.skills_captions')}
            </Typography>
          </Box>
          <Box>
            <SecondaryBtn onClick={handleToggleSkills}>
              {t('resume.pick_skill')}
            </SecondaryBtn>
          </Box>
          <Modal open={openSkills} onClose={handleToggleSkills}>
            <FormProvider {...skillsMethods}>
              <form onSubmit={handleSubmitSkills(handleSkills)}>
                <BoxModal>
                  <Box className={styles.modalStyle}>
                    <Typography color="var(--dark-color)" fontWeight="bold">
                      {t('resume.select_skills')}
                    </Typography>
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <CloseIcon onClick={handleToggleSkills} />
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={styles.resumeForm}>
                    <Box className={styles.singleRow}>
                      <FormLabel sx={{ mt: '10px' }}>
                        {t('resume.skill_type')}
                      </FormLabel>
                      <CustomRadioGroup
                        name="skillType"
                        options={skills}
                        errors={skillsErrors}
                      />
                    </Box>
                    <Box className={styles.singleColumn}>
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        name="skill"
                        label={t('form.skill')}
                        options={skills}
                        getOptionLabel={(option) => option.label}
                        id="autoSkills"
                        multiple
                        errors={skillsErrors}
                      />
                      <CustomizedAutoComplete
                        defaultValue={[]}
                        id="autoSkillLevel"
                        name="skillLevel"
                        label={t('form.skill_level')}
                        options={skills}
                        getOptionLabel={(option) => option.label}
                        multiple
                        errors={skillsErrors}
                      />
                      <Box
                        sx={{
                          width: '230px',
                          display: 'flex',
                          justifyContent: 'start',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          sx={{
                            width: '200px',
                            height: '15px',
                            color: 'var(--primary-color)',
                            borderRadius: '2px',
                          }}
                          value={20}
                        />
                        <Typography> 20%</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={styles.ButtonContainer}>
                    <StyledButton
                      disabled={disableSkills}
                      customwidth="120px"
                      customminwidth="100px"
                      type="submit"
                      onClick={() => {
                        handleSubmitSkills((data) => {
                          handleSkills(data);
                          setOpenSkills(false);
                          resetSkills();
                        })();
                      }}
                    >
                      {t('resume.save_close')}
                    </StyledButton>
                    <StyledButton
                      disabled={disableSkills}
                      customwidth="120px"
                      customminwidth="100px"
                      type="submit"
                      onClick={() => {
                        handleSubmitSkills((data) => {
                          handleSkills(data);
                          resetSkills();
                        })();
                      }}
                    >
                      {t('resume.save_new')}
                    </StyledButton>
                    <SecondaryBtn
                      customwidth="120px"
                      customminwidth="100px"
                      onClick={() => {
                        resetSkills();
                        handleToggleSkills();
                      }}
                    >
                      {t('resume.discard')}
                    </SecondaryBtn>
                  </Box>
                </BoxModal>
              </form>
            </FormProvider>
          </Modal>
          <Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackSkills}
                autoHideDuration={4500}
                onClose={handleCloseSkillsSnack}
              >
                <Alert severity="error" sx={{ width: '100%' }}>
                  {t('resume.skills_error')}
                </Alert>
              </Snackbar>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
