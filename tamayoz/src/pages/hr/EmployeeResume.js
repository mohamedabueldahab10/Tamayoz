import { Box, Divider, FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import TypographyHeader from '../../components/utilities/TypographyHeader'
import StyledButton from '../../components/utilities/StyledButton'
import { useTranslation } from 'react-i18next';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BoxModal from '../../components/utilities/BoxModal';
import CloseIcon from '@mui/icons-material/Close';
import SecondaryBtn from '../../components/utilities/SecondaryBtn';
import { useLocation } from 'react-router-dom';

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
const skills = [
    { label: 'IT', value: 'it' },
    { label: 'Languages', value: 'language' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Programming', value: 'programming' },
    { label: 'Soft Skills', value: 'softskills' },
];
const EmployeeResume = React.memo(() => {
    const location = useLocation();
    console.log(location)
const { t } = useTranslation("modules");
  const { register, formState: { errors } } = useFormContext();
  const [open, setOpen] =  useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
                onClick={() => setOpen(true)}
            >
                {t("resume.pick_skill")}
            </SecondaryBtn>
        </Box>
        </Box>
    </Box>
    {open &&
    <Modal open={true} onClose={handleClose}>
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
                <CloseIcon onClick={handleClose} />
            </Box>
        </Box>
        <Divider />
        <Box sx={resumeForm}>
         <RadioGroup aria-label="skills" name="skills" {...register("skills")}>
        {skills.map((skill) => (
          <FormControlLabel key={skill.value} value={skill.value} control={<Radio />} label={skill.label} />
        ))}
      </RadioGroup>
        </Box>
    </BoxModal>
    </Modal>
    }
    </>
  )
});
export default EmployeeResume;
