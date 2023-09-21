import Button from '@mui/material/Button';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { oAuthWithGoogle } from '../repository/oauth';
import { useNavigate } from 'react-router-dom';
export const OAuth = () => {
  const navigate = useNavigate();
  const googleOAuth = async () =>{
    try{
    const user = await oAuthWithGoogle();
    if(user){
      navigate('/dashboard',{state:{'username':user.displayName}})
      console.log(user);
    }
    else{
      console.log("Some problem in fetch");
    }
  }
  catch(e){
    console.log("Error in fetch",e);
  }
  }
  return (
    <Button onClick={googleOAuth} variant="contained"><VpnKeyIcon/>&nbsp;Login With Google</Button>
  )
}