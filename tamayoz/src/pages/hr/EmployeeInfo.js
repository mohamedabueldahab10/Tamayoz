import { Box, Input, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import StyledInputBase from '../../components/utilities/StyledInputBase'
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorText from '../../components/utilities/ErrorText';
import styled from 'styled-components';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';

const nameInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "5px",
    width: "100%",
    flexWrap:"wrap"
}
const ImageContainer = styled(Box)`
    display: grid;
    place-items: center ;
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
`
const singleRow = {
    display:"flex",
    justifyContent:"start",
    alignItems:"start",
    flexDirection: "column",
    minWidth:"320px",
    marginBottom:"5px",
}
const deleteImage = { 
    position: 'absolute',
    bottom: "0",
    left: "0",
    backgroundImage:"url(selectedImage)",
    transform: "translate(-50%,50%)",
    width: "30px",
    height: "30px",
    zIndex: "999",
    display: "grid",
    placeItems: "center",
    border:"1px solid var(--primary-color)",
    borderRadius: "50%",
}
    const currencies = [
  { label: 'Sales', id: 1,},
  { label: 'Trainer', id: 2,},
  { label: 'Consultant', id: 3,},
];
export default function EmployeeInfo() {
    const { t } = useTranslation("modules");
    const { register, formState: { errors } } = useFormContext();
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
        <Box sx={nameInfo}>
                    <Box sx={{width:"70%"}}>
                    <StyledInputBase
                        maxwidth="600px"
                        sx={{width:"100%",display:"block"}} 
                        type='text'
                        placeholder={t("form.employee_name")}
                        {...register("employeeName")}
                    />
                    <ErrorText>{errors.employeeName?.message}</ErrorText>
                    <StyledInputBase 
                        maxwidth="600px"
                        sx={{width:"100%",display:"block"}} 
                        type='text'
                        placeholder={t("form.job_position")}
                        {...register("jobPositionName")}
                        />
                    <ErrorText>{errors.jobPositionName?.message}</ErrorText>
                    </Box>
                    <Box>
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
                                <AddAPhotoIcon sx={{fontSize:"80px",color:"var(--primary-color)"}} />
                            </ImageContainer>
                        </label>
                        </> )
                        :
                        (<>
                        <ImageContainer>
                            <img
                            src={imageUrl}
                            alt="Selected"
                            style={{ maxWidth: '100%', maxHeight: '100px' }}
                            />
                            <Box
                                onClick={handleDelete}
                                sx={deleteImage}
                            >
                                <Tooltip title="Delete">
                                    <DeleteForeverIcon sx={{fontSize:"25px",color:"var(--primary-color)"}} />
                                </Tooltip>
                            </Box>
                        </ImageContainer>
                        </>)
                    }
                    </div>
                    </Box>
        </Box>
        <Box sx={nameInfo}>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    id="autoTags"
                    name="tags"
                    label={t("form.tags")}
                    options={currencies}
                    multiple
                    errors={errors}
                />
                    <Box>
                        <ErrorText>{errors.tags?.message}</ErrorText>
                    </Box>
            </Box>
            <Box sx={singleRow}>
                <Box>
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_mobile")}
                    {...register("workMobile")}
                    variant="flex"
                    />
                </Box>
                <Box>
                    <ErrorText>{errors.workMobile?.message}</ErrorText>
                </Box>
            </Box>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    name="department"
                    label={t("form.department")}
                    options={currencies} 
                    getOptionLabel={(option) => option.label} 
                    id="autoDepartment"
                    multiple 
                    errors={errors.department}
                />
            </Box>
            <Box sx={singleRow}>
                <Box>
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_phone")}
                    {...register("workPhone")}
                    variant="flex"
                    />
                </Box>
                <Box>
                    <ErrorText>{errors.workPhone?.message}</ErrorText>
                </Box>
            </Box>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    name="jobPosition"
                    label={t("form.job_position")}
                    options={currencies} 
                    getOptionLabel={(option) => option.label} 
                    id="autoJobPosition"
                    multiple
                    errors={errors.jobPosition} 
                />
            </Box>
            <Box sx={singleRow}>
                <Box>
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_mail")}
                    {...register("workMail")}
                    />
                </Box>
                <Box>
                    <ErrorText>{errors.workMail?.message}</ErrorText>
                </Box>
            </Box>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    name="manager"
                    label={t("form.manager")}
                    options={currencies} 
                    getOptionLabel={(option) => option.label} 
                    id="autoManager"
                    multiple 
                    errors={errors.manager}
                />
            </Box>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    name="company"
                    label={t("form.company")}
                    options={currencies} 
                    getOptionLabel={(option) => option.label} 
                    id="autoCompany"
                    multiple 
                    errors={errors.company}
                />
            </Box>
            <Box sx={singleRow}>
                <CustomizedAutoComplete
                    defaultValue={[]}
                    name="coach"
                    label={t("form.coach")}
                    options={currencies} 
                    getOptionLabel={(option) => option.label} 
                    id="autoCoach"
                    multiple
                    errors={errors.coach}
                />
            </Box>
            <Box sx={singleRow}>
                <Box>
                    <StyledInputBase
                    type='date'
                    placeholder={t("form.next_appraisal_date")}
                    {...register("nextAppraisalDate")}
                    />
                </Box>
                <Box>
                    <ErrorText>{errors.nextAppraisalDate?.message}</ErrorText>
                </Box>
            </Box>
        </Box>
    </>
  )
}


