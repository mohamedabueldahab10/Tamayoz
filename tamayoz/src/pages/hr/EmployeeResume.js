import { Alert, Box, Divider, FormLabel, LinearProgress, Modal, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import TypographyHeader from '../../components/utilities/TypographyHeader'
import StyledButton from '../../components/utilities/StyledButton'
import { useTranslation } from 'react-i18next';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoxModal from '../../components/utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../../components/utilities/SecondaryBtn';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import { useForm, FormProvider } from "react-hook-form";
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomRadioGroup from '../../components/utilities/CustomRadioGroup';
const resumeContainer = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    margin: "20px 0px 10px",
    width: "100%",
    flexWrap:"wrap"
}
const resumeSide ={
    width: "60%",
    minWidth: "300px",
}
const singleRow = {
    display:"flex",
    justifyContent:"start",
    alignItems:"start",
    minWidth:"320px",
    marginBottom:"5px",
    gap: "25px",
}
const singleColumn = {
    display:"flex",
    justifyContent:"start",
    alignItems:"start",
    flexDirection: "column",
    minWidth:"320px",
    marginBottom:"5px",
    gap: "25px",
}
const skillsSide ={
    width: "35%",
    minWidth: "300px",
}
const modalStyle = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    padding: "15px 5px",
    width: "100%",
}
const resumeForm ={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    margin: "10px",
    width: "100%",
    flexWrap:"wrap"
}
const ButtonContainer = {
    display:"flex",
    justifyContent:"start",
    alignItems:"center",
    gap: "10px",
    width: "100%",
    flexWrap:"wrap",
    marginBlock: "10px"
}
const skills = [
    { label: 'IT', id: 1, value: 'it' },
    { label: 'Languages', id: 2, value: 'language' },
    { label: 'Marketing', id: 3, value: 'marketing' },
    { label: 'Programming', id: 4, value: 'programming' },
    { label: 'Soft Skills', id: 5, value: 'softskills' },
];
export default function EmployeeResume() {
const { t } = useTranslation("modules");
  const [open, setOpen] =  useState(false);
  const handleToggleModal = () => setOpen(!open);
  const [snack, setSnack] = useState(false);
  const handleCloseSnack = () => setSnack(false);
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
const resumeSchema = yup.object().shape({
    skill: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.skill")),
            value: yup.string().required(t("validation.coach")),
            id: yup.number().required(t("validation.skill")),
        })
        ).required(t("validation.skill")),
    skillType: yup.string().required(t("validation.coach")),
    skillLevel: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.coach")),
            value: yup.string().required(t("validation.coach")),
            id: yup.number().required(t("validation.coach")),
        })
        ).required(t("validation.coach")),

})
  const resumeMethods  = useForm({
    resolver: yupResolver(resumeSchema),
    mode: "onTouched",
    defaultValues: {
        skillType: [],
        skill: [],
        skillLevel: [],
        
    }
  });
  const { handleSubmit: handleSubmitResume, reset: resetResume, formState : resumeFormState } = resumeMethods;
  const handleSkills = (data) => {
    console.log("SkillsData");
    console.log("SkillsData", data);
    setResult(data)
    setDisable(true);
    setIsLoading(true);
    //reset();
    // axios
    //   .post("https://vsoft.com-eg.net:4041/api/Branches/Add", data)
    //   .then((res) => {
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setSnack(true);
    //   });
  };
  console.log("resumeErr",resumeFormState.errors);
  return (
    <>
    <Box sx={resumeContainer}>
      <Box sx={resumeSide}>
        <TypographyHeader>{t("resume.resume")}</TypographyHeader>
        <Divider />
        <Box sx={{marginBlock:"20px"}}>
            <StyledButton>{t("resume.add_resume")}</StyledButton>
        </Box>
      </Box>
      <Box sx={skillsSide}>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"start",width:"100%"}}>
            <TypographyHeader>{t("resume.skills")}</TypographyHeader>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px",cursor:"pointer"}}>
                <Typography color='var(--dark-color)' fontWeight='bold'>
                    TimeLine
                </Typography>
                <AutoGraphIcon fontSize='medium' sx={{color:'var(--dark-color)'}} />
            </Box>
        </Box>
        <Divider />
        <Box sx={{marginBlock:"20px"}}>
            <Typography sx={{fontSize:"16px",color:'var(--text-secondary-color)'}}>
                {t("resume.skills_captions")}
            </Typography>
        </Box>
        <Box>
            <SecondaryBtn 
                onClick={handleToggleModal}
            >
                {t("resume.pick_skill")}
            </SecondaryBtn>
        </Box>
        </Box>
    </Box>
    <Modal open={open} onClose={handleToggleModal}>
        <FormProvider {...resumeMethods}>
            <form onSubmit={handleSubmitResume(handleSkills)}>
                <BoxModal>
                    <Box sx={modalStyle}>
                        <Typography color='var(--dark-color)' fontWeight='bold'>
                            {t("resume.select_skills")}
                        </Typography>
                        <Box
                        sx={{
                            width:"20px",
                            height:"20px",
                            display:"grid",
                            placeItems:"center",
                            cursor:"pointer"
                        }}
                        >
                            <CloseIcon onClick={handleToggleModal} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={resumeForm}>
                        <Box sx={singleRow}>
                        <FormLabel sx={{mt:"10px"}}>{t("resume.skill_type")}</FormLabel>
                            <CustomRadioGroup name='skillType' options={skills} error={resumeFormState.errors} />
                        </Box>
                        <Box sx={singleColumn}>
                            <CustomizedAutoComplete
                                defaultValue={[]}
                                id="autoSkills"
                                name="skill"
                                label={t("form.skill")}
                                options={skills}
                                multiple
                                errors={resumeFormState.errors}
                            />
                            <CustomizedAutoComplete
                                defaultValue={[]}
                                id="autoSkillLevel"
                                name="skillLevel"
                                label={t("form.skill_level")}
                                options={skills}
                                multiple
                                errors={resumeFormState.errors}
                            />
                            <Box sx={{width:"230px",display:"flex",justifyContent:"start",alignItems:"center", gap:"10px"}}>
                                <LinearProgress 
                                    variant="determinate" 
                                    sx={{width:"200px",height:"15px",color:"var(--primary-color)",borderRadius:"2px"}} 
                                    value={20} 
                                />
                                <Typography> 20%</Typography>
                            </Box>
                        </Box>
                    
                    </Box>
                    <Divider />
                    <Box sx={ButtonContainer}>
                        <StyledButton 
                            disabled={disable} 
                            customwidth="120px" 
                            customminwidth="100px"
                            onClick={() => {
                                console.log("Skills Submitted");
                                handleSubmitResume(handleSkills)();
                                setOpen(false);
                            }}
                        >
                            {t("resume.save_close")}
                        </StyledButton>
                        <StyledButton 
                            disabled={disable} 
                            customwidth="120px" 
                            customminwidth="100px"
                            onClick={() => {
                                console.log("Skills Submitted");
                                handleSubmitResume(handleSkills)();
                                resetResume();
                            }}
                        >
                            {t("resume.save_new")}
                        </StyledButton>
                        <StyledButton 
                            customwidth="120px" 
                            customminwidth="100px"
                        >
                            {t("resume.discard")}
                        </StyledButton>
                    </Box>
                </BoxModal>
            </form>
        </FormProvider>
    </Modal>
    <Box>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snack}
            autoHideDuration={4500}
            onClose={handleCloseSnack}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {t("resume.skills_error")}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </>
  )
}
