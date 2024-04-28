import { Autocomplete, Box, Input, TextField, Tooltip } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StyledInputBase from '../../components/utilities/StyledInputBase'
import { useForm, Controller, FormProvider  } from "react-hook-form";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import StyledButton from '../../components/utilities/StyledButton';
import CustomizedAutoComplete from '../../components/utilities/CustomizedAutoComplete';
const nameInfo = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    marginBottom: "10px",
    width: "100%",
    flexWrap:"wrap"
}
const singleRow = {
    display:"flex",
    justifyContent:"start",
    alignItems:"center",
    gap:"20px",
    width:"50%",
    minWidth:"320px",
    marginBottom:"10px",
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
const CustomLabel = styled.label`
  fontSize: "21px",
  fontWeight: "600"
`;
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
        jobPositionName: yup.string().required(t("validation.job_position")),
        // fNameA: yup.string().required(t("validation.fNameA_msg_required")),
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
        watch,
        control,
        formState: { errors },
    } = methods;
    const EmployeeName = watch('employeeName');
    async function handleFormSubmit(data){
        console.log('Employee Data',data);
    }
  const handleDepartmentChange = (e, newValue) => {
    // Handle department change here
    console.log("Department value changed:", newValue);
  };
    const currencies = [
  { label: 'Sales', id: 1,},
  { label: 'Trainer', id: 2,},
  { label: 'Consultant', id: 3,},
];
return (
    <div>
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={nameInfo}>
                <Box>
                    <Box sx={{display:"flex",justifyContent:"start",alignitems:"center",gap:"10px"}}> 
                        <StyledInputBase
                            sx={{mb:"10px"}} 
                            type='text'
                            placeholder={t("form.employee_name")}
                            {...register("employeeName")}
                        />
                        <StyledInputBase 
                            sx={{mb:"10px"}} 
                            type='text'
                            placeholder={t("form.job_position")}
                            {...register("jobPositionName")}
                        />
                    </Box>
                     <Controller
                        name="tags"
                        control={control}
                        sx={{
                            border: "none !importants ",
                            width: "300px",
                        }}
                        render={({ field }) => (
                            <CustomizedAutoComplete
                                {...field}
                                defaultValue={[]}
                                id="autocomplete"
                                label="Tags"
                                options={currencies}
                                getOptionLabel={(option) => option.label}
                                multiple // Enable multiple selection
                                onChange={handleDepartmentChange}
                            />
                            )
                        }
                />
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
                    <Box sx={{width:"100px"}}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.work_mobile")}</CustomLabel> 
                    </Box> 
                    </Box>
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_mobile")}
                    {...register("workMobile")}
                    />
                </Box>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.department")}</CustomLabel> 
                    </Box>
                    <CustomizedAutoComplete
                        name="department"
                        label={t("form.department")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="customized-auto-complete"
                        multiple 
                    />
                </Box>
            </Box>
            <Box sx={nameInfo}>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.work_phone")}</CustomLabel> 
                    </Box> 
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_phone")}
                    {...register("workPhone")}
                    />
                    </Box>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.job_position")}</CustomLabel> 
                    </Box>
                    <CustomizedAutoComplete
                        name="jobPosition"
                        label={t("form.job_position")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="customized-auto-complete"
                        multiple 
                    />
                </Box>
            </Box>
            <Box sx={nameInfo}>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.work_mail")}</CustomLabel> 
                    </Box> 
                    <StyledInputBase
                    type='text'
                    placeholder={t("form.work_mail")}
                    {...register("workMail")}
                    />
                    </Box>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.manager")}</CustomLabel> 
                    </Box>
                    <CustomizedAutoComplete
                        name="manager"
                        label={t("form.manager")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="customized-auto-complete"
                        multiple 
                    />
                    </Box>
            </Box>
            <Box sx={nameInfo}>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.company")}</CustomLabel> 
                    </Box>
                    <CustomizedAutoComplete
                        name="company"
                        label={t("form.company")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="customized-auto-complete"
                        multiple 
                    />
                    </Box>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.coach")}</CustomLabel> 
                    </Box>
                    <CustomizedAutoComplete
                        name="coach"
                        label={t("form.coach")}
                        options={currencies} 
                        getOptionLabel={(option) => option.label} 
                        id="customized-auto-complete"
                        multiple 
                    />
                </Box>
            </Box>
            <Box sx={nameInfo}>
                <Box sx={singleRow}>
                    <Box sx={{width:"100px"}}>
                    <CustomLabel>{t("form.next_appraisal_date")}</CustomLabel> 
                    </Box> 
                    <StyledInputBase
                    type='date'
                    placeholder={t("form.next_appraisal_date")}
                    {...register("nextAppraisalDate")}
                    />
                    </Box>
                <Box sx={singleRow}>
                    <StyledButton small type='submit'>Save</StyledButton>
                </Box>
            </Box>
        </form>
        </FormProvider>
    </div>
  )
}


