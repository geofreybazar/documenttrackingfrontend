import LoadingSpinner from './LoadingSpinner';
import ITCU from '../assets/ITCU.svg'

function LoadingScreen() {
  return (
    <div className='text-3xl w-full h-full flex flex-col justify-center items-center'>
        
        <img className="w-48" src={ITCU} alt="" />
        <span>
            Welcome to Bureau of Fire Protection - National Capital Region
        </span>
        <span>
            Document Tracking System
        </span>
        <span>
            Please wait for your dashboard to load..
        </span>
        <LoadingSpinner/>
    </div>
  )         
}

export default LoadingScreen