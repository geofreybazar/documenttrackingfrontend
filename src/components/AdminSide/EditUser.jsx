import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userService from '../../services/userService';
import variable from '../../utils/variable';
import {TextField, Select, Button, InputLabel, MenuItem, FormControl, FormHelperText} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function EditUser({userInfo,setUsers,listOfffices,handleClose,users}) {

    const schema = variable.schema;
    const {register, control, handleSubmit, setError, formState:{errors, isSubmitting,}} = useForm({ 
        resolver: yupResolver(schema),
        defaultValues: {
            name: userInfo.name,
            rank: userInfo.rank,
            email: userInfo.email,
            office: userInfo.office,
            role: userInfo.role,
            accountNumber: userInfo.accountNumber,    
          },
    });

    const onSubmit = async (data) => {
        try {
            const res = await userService.editUser(userInfo.id,data);
            setUsers(users.map((user) => (user.id !== userInfo.id ? user : res)))
            console.log(res)
            handleClose();
        } catch (error) {
            setError('root', {
                message: error.response.data.error
            })
        }
      };

  return (
    <div className='w-full flex justify-center'>
        <div className='w-full shadow-lg'>
            <div className='p-2 flex justify-center text-2xl font-semibold bg-bluelight text-offwhite'>
                EDIT USER FORM
            </div>
            {
                errors.root && (<div className='text-red-600 font-semibold w-full uppercase text-xl text-center'>{errors.root.message}</div>)
            }
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-cemter gap-2 p-4'>

                <TextField {...register('accountNumber')} 
                label="Account Number" 
                variant="outlined"  
                error={!!errors.accountNumber} 
                helperText={errors.accountNumber?.message}/>

                <TextField {...register('rank')} 
                label="Rank"
                variant="outlined" 
                error={!!errors.rank} 
                helperText={errors.rank?.message}/>

                <TextField {...register('name')} 
                label="Complete Name" 
                variant="outlined"  
                error={!!errors.name} 
                helperText={errors.name?.message}/>

                <TextField {...register('email')} 
                label="Email address" 
                variant="outlined" 
                error={!!errors.email} 
                helperText={errors.email?.message}/>

                <FormControl fullWidth>
                    <InputLabel error={!!errors.role} id="role-type-label">
                     Role
                    </InputLabel>
                        <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            labelId="role-type-label"
                            id="role-type-select"
                            label="Role"
                            value={field.value || ''}
                            >
                            <MenuItem value="">
                                <em>Select Role</em>
                            </MenuItem>
                            <MenuItem value="user">user</MenuItem>
                            <MenuItem value="admin">admin</MenuItem>
                            </Select>
                        )}
                        />
                    <FormHelperText error>{errors.role?.message}</FormHelperText>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel error={!!errors.office} id="office-type-label">
                        Office
                    </InputLabel>
                        <Controller
                        name="office"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            labelId="office-type-label"
                            id="office-type-select"
                            label="Office"
                            value={field.value || ''}
                            >
                            <MenuItem value="">
                                <em>Select Office</em>
                            </MenuItem>
                            {listOfffices?.map((office,index) => (
                                <MenuItem key={index} value={office.name}>{office.name}</MenuItem>
                              ))}
                            </Select>
                        )}
                        />
                    <FormHelperText error>{errors.office?.message}</FormHelperText>
                </FormControl>

                {isSubmitting === true ?
                    <LoadingButton  loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type="submit">
                    Submitting
                    </LoadingButton>  
                    : <Button variant="contained" type="submit" >
                    Submit
                </Button>}
            </form>
        </div>   
    </div>
  )
}

export default EditUser