import { Alert, Box, Divider, FormControlLabel, FormLabel, LinearProgress, Modal, Radio, RadioGroup, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import TypographyHeader from '../../components/utilities/TypographyHeader'
import StyledButton from '../../components/utilities/StyledButton'
import { useTranslation } from 'react-i18next';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoxModal from '../../components/utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../../components/utilities/SecondaryBtn';
import { Controller } from 'react-hook-form';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import { useForm, FormProvider  } from "react-hook-form";
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
export default function EmployeeResume({control}) {
const { t } = useTranslation("modules");
//   const { register, formState: { errors } } = useFormContext();
  const [open, setOpen] =  useState(false);
  const handleToggleModal = () => setOpen(!open);
  console.log("props control",control)
  const [snack, setSnack] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };
const schema = yup.object().shape({
    skill: yup.string().required(t("validation.skill")),

})
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
   const handleSkills = (data) => {
    console.log("SkillsData", data);
    setDisable(true);
    setIsLoading(true);
    methods.reset();
    // axios
    //   .post("https://vsoft.com-eg.net:4041/api/Branches/Add", data)
    //   .then((res) => {
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setSnack(true);
    //   });
  };
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
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSkills)}>
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
                        <Controller
                        name="skills"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup aria-label="skills" {...field}>
                                {skills.map((skill) => (
                                <FormControlLabel key={skill.value} value={skill.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: "16px",},}}/>} label={skill.label} />
                                ))}
                            </RadioGroup>
                        )}
                        />
                        </Box>
                        <Box sx={singleColumn}>
                        <Controller
                        name="skills"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <CustomizedAutoComplete
                                {...field}
                                defaultValue={[]}
                                id="autoSkills"
                                name="skills"
                                label={t("form.skill")}
                                options={skills}
                                multiple
                                // errors={errors}
                            />
                        )}
                        />
                        <Controller
                        name="skillLevel"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <CustomizedAutoComplete
                                {...field}
                                defaultValue={[]}
                                id="autoSkillLevel"
                                name="skillLevel"
                                label={t("form.skill_level")}
                                options={skills}
                                multiple
                                // errors={errors}
                            />
                        )}
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
                            customWidth="120px" 
                            customMinWidth="100px"
                            type='submit'
                        >
                            {t("resume.save_close")}
                        </StyledButton>
                        <StyledButton 
                            disabled={disable} 
                            customWidth="120px" 
                            customMinWidth="100px"
                            onClick={() => {
                                methods.handleSubmit(handleSkills)();
                                methods.reset();
                            }}
                        >
                            {t("resume.save_new")}
                        </StyledButton>
                        <StyledButton 
                            customWidth="120px" 
                            customMinWidth="100px"
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
            onClose={handleClose}
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
