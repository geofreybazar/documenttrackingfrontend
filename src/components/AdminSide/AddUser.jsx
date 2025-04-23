import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import userService from '../../services/userService';
import variable from '../../utils/variable';
import {TextField, Select, Button, InputLabel, MenuItem, FormControl, FormHelperText, Autocomplete} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


function AddUser({users,setUsers,handleClose,listOfffices}) {
    
    const ranks = variable.ranks;
    const schema = variable.schema;
    const listOffficesNames = listOfffices?.map((office) => office.name) || [];
    const {register, control, handleSubmit, setError, formState:{errors, isSubmitting,}} = useForm({ resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
          const res = await userService.addUser(data);
          setUsers(users.concat(res));
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
                ADD USER FORM
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

                <FormControl fullWidth>
                    <InputLabel error={!!errors.rank} id="rank-type-label">
                     Rank
                    </InputLabel>
                        <Controller
                        name="rank"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            labelId="rank-type-label"
                            id="rank-type-select"
                            label="rank"
                            value={field.value || ''}
                            >
                            <MenuItem value="">
                                <em>Select rank</em>
                            </MenuItem>
                            {ranks.map((rank,index) => (
                                 <MenuItem key={index} value={rank}>{rank}</MenuItem>
                            ))}
                            </Select>
                        )}
                        />
                    <FormHelperText error>{errors.rank?.message}</FormHelperText>
                </FormControl>

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

                <Autocomplete
                      disablePortal
                      options={listOffficesNames}
                      renderInput={(params) => <TextField 
                        {...params} 
                        {...register('office')} 
                        error={!!errors.office} 
                        helperText={errors.office?.message}
                        label="Select Office" />}
                />

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

export default AddUser