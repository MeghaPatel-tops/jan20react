

export const validateUser = (user)=>{
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(user.name==''){
        alert('Enter Valid UserNAme')
        return false
    }
    if(user.email == "" ||  !regex.test(user.email)){
        alert('Enter valid Email');
         return false
    }
    
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.pwd) ==false && user.pwd=="" ){
        alert('Enter Valid Password')
         return false
    }

    return true;
}