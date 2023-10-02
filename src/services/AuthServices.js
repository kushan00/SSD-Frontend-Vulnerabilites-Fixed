import axios from "axios";
// import bcrypt from "bcrypt";
import StartUrl from "../configs/Url.json";
import firebase from "../utils/FirebaseForAuth.js";

const LoginURL = StartUrl?.StartUrl + "/gym/signin";
const RegisterURL = StartUrl?.StartUrl + "/gym/signup";
const AuthURL = StartUrl?.StartUrl + "/gym/auth";
const UpdateAdminURL = StartUrl?.StartUrl + "/gym/update-admin/";
const SENDOTPURL = StartUrl?.StartUrl + "/gym/send-otp";
const VERIFYOTPURL = StartUrl?.StartUrl + "/gym/verify-otp";
const VerifyOAuthURL = StartUrl?.StartUrl + "/gym/verify-OAuth-Token";

export async function LoginUsers(data){
    // let hashedPassword = bcrypt.hashSync(data?.password,10).toString();
    const alldata = {
        email:data?.email,
        password:data?.password,
    };
    
    let result;
    await  axios.post(LoginURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function RegisterUsers(data){
    // let hashedPassword = bcrypt.hashSync(data?.password,10).toString();

    const alldata = {
        fullName:data?.fullName,
        mobileno:data?.mobileno,
        email:data?.email,
        password:data?.password,
        weight:data?.weight,
        dateOfBirth:data?.dateOfBirth,
        height:data?.height
    
    }

    let result;
    await  axios.post(RegisterURL,alldata)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function Auth(token){
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    let result;
    await  axios.get(AuthURL,config)
     .then(function(data) {
         //console.log("success data",data)
         result = data;
     })
     .catch(function (error) {
         if (error.response) {
           //console.log(error.response.data);
           result = error.response;
           
         } else if (error.request) {
           //console.log(error.request);
           result = error.request;
         } 
     
       });
  return result;
}

export async function updateAdmin(id,data) {
  const alldata = {
      fullName: data?.fullName,
      mobileno: data?.mobileno,
      email: data?.email,
  };

  return await axios.put(UpdateAdminURL + id, alldata);

}

export async function sendOTP(data) {
  const alldata = {
      password: data?.password,
      email: data?.email,
  };

  return await axios.post(SENDOTPURL, alldata);

}


export async function verifyOTP(data) {
  const alldata = {
      otp: data?.otp,
      email: data?.email,
  };

  return await axios.post(VERIFYOTPURL, alldata);

}

export async function verifyAuthToken(data) {
  const alldata = {
    idToken: data,
  };

  return await axios.post(VerifyOAuthURL, alldata);

}

export async function socialMediaAuth (provider) {
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((res) => {
    return res.user;
  })
  .catch((err) => {
    return err;
  });

}