import { Box, Input, Tooltip } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import StyledInputBase from '../../components/utilities/StyledInputBase'
import { useForm, FormProvider  } from "react-hook-form";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
import ErrorText from '../../components/utilities/ErrorText';
const nameInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "5px",
    width: "100%",
    flexWrap:"wrap"
}
const headerInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "5px",
    width: "100%",
    flexWrap:"wrap",
    boxShadow: "0px 3px 0px #eee",
    padding:"0px 0px 5px",
}
const singleRow = {
    display:"flex",
    justifyContent:"start",
    alignItems:"start",
    flexDirections: "column !important",
    // width:"50%",
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
export default function NewEmployee() {
    const location = useLocation();
    useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
    localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
    const { t } = useTranslation("modules");
    const schema = yup.object().shape({
        employeeName: yup.string().required(t("validation.employee_name")),
        jobPositionName: yup.string().required(t("validation.job_position_name")),
        tags: yup.array().of(yup.object().shape({
            label: yup.string().required(t("validation.tags")),
            id: yup.number().required(),
        })).required(t("validation.tags")),
        workMobile: yup.string().required(t("validation.work_mobile")),
        department: yup.string().required(t("validation.department")),
        workPhone: yup.string().required(t("validation.work_phone")),
        jobPosition: yup.string().required(t("validation.job_position")),
        workMail: yup.string().required(t("validation.work_mail")),
        manager: yup.string().required(t("validation.manager")),
        company: yup.string().required(t("validation.company")),
        coach: yup.string().required(t("validation.coach")),
        date: yup.string().required(t("validation.date")),
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
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
       defaultValues: {
        employeeName: '',
        workMobile: '',
        workPhone: '',
        jobPositionName: '',
        workMail: '',
        nextAppraisalDate: '',
        tags: [],
        department: [],
        jobPosition: [],
        manager: [],
        company: [],
        coach: [],
    },
  });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
    async function handleFormSubmit(data){
        console.log('Employee Data',data);
    }
    const currencies = [
  { label: 'Sales', id: 1,},
  { label: 'Trainer', id: 2,},
  { label: 'Consultant', id: 3,},
];
console.log("errors",errors)
return (
    <div>
        <Box sx={headerInfo}>
            <Tooltip title="Save">
                <SaveAltIcon 
                sx={{color:"var(--primary-color)", fontSize:"28px",cursor:"pointer"}} 
                onClick={handleSubmit(handleFormSubmit)} />
            </Tooltip>
        </Box>
        <FormProvider {...methods}>
        <form>
            <Box sx={nameInfo}>
                <Box sx={{width:"70%"}}>
                <StyledInputBase
                    maxwidth="600px"
                    sx={{width:"100%",display:"block",mb:"10px"}} 
                    type='text'
                    placeholder={t("form.employee_name")}
                    {...register("employeeName")}
                />
                <ErrorText>{errors.employeeName?.message}</ErrorText>
                <StyledInputBase 
                    maxwidth="600px"
                    sx={{width:"100%",display:"block",mb:"10px"}} 
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
                        label="Tags"
                        options={currencies}
                        multiple
                        error={errors.tags}
                    />
                </Box>
                <Box sx={singleRow}>
                    <Box>
                        <StyledInputBase
                        type='text'
                        placeholder={t("form.work_mobile")}
                        {...register("workMobile")}
                        />
                    </Box>
                    <Box>
                        <ErrorText>{errors.workMobile?.message}</ErrorText>
                    </Box>
                </Box>
                <Box sx={singleRow}>
                    <CustomizedAutoComplete
                        name="department"
                        label={t("form.department")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="autoDepartment"
                        multiple 
                        error={errors.department}
                    />
                </Box>
                <Box sx={singleRow}>
                    <Box>
                        <StyledInputBase
                        type='text'
                        placeholder={t("form.work_phone")}
                        {...register("workPhone")}
                        />
                    </Box>
                    <Box>
                        <ErrorText>{errors.workPhone?.message}</ErrorText>
                    </Box>
                </Box>
                <Box sx={singleRow}>
                    <CustomizedAutoComplete
                        name="jobPosition"
                        label={t("form.job_position")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="autoJobPosition"
                        multiple
                        error={errors.jobPosition} 
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
                        name="manager"
                        label={t("form.manager")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="autoManager"
                        multiple 
                        error={errors.manager}
                    />
                </Box>
                <Box sx={singleRow}>
                    <CustomizedAutoComplete
                        name="company"
                        label={t("form.company")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="autoCompany"
                        multiple 
                        error={errors.company}
                    />
                </Box>
                <Box sx={singleRow}>
                    <CustomizedAutoComplete
                        name="coach"
                        label={t("form.coach")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="autoCoach"
                        multiple
                        error={errors.coach}
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
        </form>
        </FormProvider>
    </div>
  )
}


