import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const provider =new  GoogleAuthProvider()

const loginWithGoogle = async()=>{
    
    alert('here')
    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then((result)=>{
        const caredtial = GoogleAuthProvider.credentialFromResult(result);
        const token = caredtial.accessToken;
        const user = result.user;

        console.log(user);
        if(user){
            let res = {name:user.displayName,email:user.email}
            return res;
        }
        
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        
         const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
    })
}

export default loginWithGoogle