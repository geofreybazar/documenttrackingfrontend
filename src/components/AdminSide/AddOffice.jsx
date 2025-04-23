import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import officeService from '../../services/officeService';
import variable from '../../utils/variable';
import {TextField, Button} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function AddOffice({listOfffices,setListOfffices,handleClose}) {
    const schema = variable.officeSchema;
    const {register, control, handleSubmit, setError, formState:{errors, isSubmitting,}} = useForm({ resolver: yupResolver(schema)});
    const onSubmit = async (data) => {
        try {
          const res = await officeService.addOffice(data);
          setListOfffices(listOfffices.concat(res));
          handleClose();
        } catch (error) {
            setError('root', {
                message: error.response.data.error
            });
        };
      };

  return (
    <div className='w-full flex justify-center'>
        <div className='w-full shadow-lg'>
            <div className='p-2 flex justify-center text-2xl font-semibold bg-bluelight text-offwhite'>
                ADD OFFICE FORM
            </div>
            {
                errors.root && (<div className='text-red-600 font-semibold w-full uppercase text-xl text-center'>{errors.root.message}</div>)
            }
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-cemter gap-2 p-4'>

                <TextField {...register('name')} 
                label="Name of Office" 
                variant="outlined"  
                error={!!errors.name} 
                helperText={errors.name?.message}/>

                <TextField {...register('email')} 
                label="Email address" 
                variant="outlined"  
                error={!!errors.email} 
                helperText={errors.email?.message}/>
                
                {isSubmitting === true ?
                    <LoadingButton  loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type="submit">
                    Adding
                    </LoadingButton>  
                    : <Button variant="contained" type="submit" >
                    Add
                </Button>}
            </form>
        </div>   
    </div>
  )
}

export default AddOffice