import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import errorAnimation from '../../assets/29894-error-404-page.json'

const Error = () => {
    const navigate = useNavigate();
    return (
        <div style={{width:'50%',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}} className='w-1/2 flex-col flex justify-center items-center mx-auto relative'>
        <Lottie className='w-full' animationData={errorAnimation} loop={true} />
        <button onClick={()=>navigate('/')} style={{position:'absolute',bottom:0,padding:'10px 10px',background:'gray',border:'1px solid',borderRadius: '5px', color:'white',fontSize:'12px'}}>Back To Home</button>
    </div>
    );
};

export default Error;