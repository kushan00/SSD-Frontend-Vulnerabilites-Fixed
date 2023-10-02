import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUsers , verifyOTP , sendOTP  , verifyAuthToken} from "../../services/AuthServices.js";
import Swal from 'sweetalert2';
import "./responsive.css";
import { setCookie } from "../../utils/Cookies.js";
import firebase from '../../utils/FirebaseForAuth.js';
import { getAuth ,signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider , FacebookAuthProvider } from 'firebase/auth';
import {ValidateLogin} from './ValidateLogin.js';

const Login = () => {

	const navigate = useNavigate();
	const auth = getAuth();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

		const onSubmit = async (e) => {

			e.preventDefault();
			let validate = ValidateLogin(formData);
			let msg = validate?.message;
			if(validate.status == false)
			{
				Swal.fire({
					toast: true,
					icon: 'warning',
					html: `<span>${msg}</span>`,
					animation: true,
					position: 'top-right',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: false,
				});
			}
			else
			{
				let data = await sendOTP(formData);
				console.log("data",data)
				if(data?.data?.status == 1)
				{
					Swal.fire(
						'OTP sent.',
						'OTP sent successfull...!',
						'success'
					)
					const { value: otp } = await Swal.fire({
						title: 'Enter your OTP code here',
						input: 'text',
						inputLabel: 'Your OTP code',
						inputValue: "Enter your OTP",
						showCancelButton: true,
						inputValidator: (value) => {
							if (!value) {
								return 'You need to write something!'
							}
						}
					})
			
					if (otp) {
	
						let payload = {
							email:formData.email,
							otp:otp
						}
	
						let data = await verifyOTP(payload);
						if(data?.data?.status == 1)
						{
							Swal.fire(
								'OTP Verified.',
								'OTP verified successfull...!',
								'success'
							)
							let data = await LoginUsers(formData);
							console.log("data",data)
							if(data?.data?.status == 1)
							{
							localStorage.setItem("token",data?.data?.data?.token);
							localStorage.setItem("userRole",data?.data?.data?.userRole);
							localStorage.setItem("user",data?.data?.data?.user);
							localStorage.setItem("userID",data?.data?.data?.userID);
							localStorage.setItem("_id",data?.data?.data?._id);
	
							setCookie("token",data?.data?.data?.token,1);
							setCookie("userRole",data?.data?.data?.userRole,1);
							setCookie("user",data?.data?.data?.user,1);
							setCookie("userID",data?.data?.data?.userID,1);
							setCookie("_id",data?.data?.data?._id,1);
	
							navigate("/");
							window.location.reload();
							}
							else
							{
								Swal.fire({
									icon: 'error',
									title: 'Login Failed..!',
									text: `${data?.data?.message}`,
								})
							}
						}
						else
						{
							Swal.fire(
								'OTPFailed.',
								'OTP send Failed...!',
								'error'
							)
						}
						
					}
				}
				else
				{
					Swal.fire(
						'OTP Not Valid.',
						'OTP verify Failed...!',
						'error'
					)
				}
		}
	
			
	
			
	
		};


	const handleGoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth ,provider)
		  .then(async(result) => {

			console.log(" google result",result);
			const data = await verifyAuthToken(result.user.accessToken);
			console.log('res',data);
				if(data?.data?.status === 1)
				{
				localStorage.setItem("token",data?.data?.data?.token);
				localStorage.setItem("userRole",data?.data?.data?.userRole);
				localStorage.setItem("user",data?.data?.data?.user);
				localStorage.setItem("userID",data?.data?.data?.userID);
				localStorage.setItem("_id",data?.data?.data?._id);

				setCookie("token",data?.data?.data?.token,1);
				setCookie("userRole",data?.data?.data?.userRole,1);
				setCookie("user",data?.data?.data?.user,1);
				setCookie("userID",data?.data?.data?.userID,1);
				setCookie("_id",data?.data?.data?._id,1);

				navigate("/");
				window.location.reload();
				}
				else
				{
					Swal.fire({
						icon: 'error',
						title: 'Login Failed..!',
						text: `${data?.data?.message}`,
					})
				}
		  })
		  .catch((error) => {
			Swal.fire({
				icon: 'error',
				title: 'Login Failed..!',
				text: `${error}`,
			})
		  });
	  };
	
	  const handleFacebookLogin = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth ,provider)
		  .then(async(result) => {

			console.log("fb result",result);
			// const data = await verifyAuthToken(result.user.accessToken);
			// console.log('res',data);
			// 	if(data?.data?.status === 1)
			// 	{
			// 	localStorage.setItem("token",data?.data?.data?.token);
			// 	localStorage.setItem("userRole",data?.data?.data?.userRole);
			// 	localStorage.setItem("user",data?.data?.data?.user);
			// 	localStorage.setItem("userID",data?.data?.data?.userID);
			// 	localStorage.setItem("_id",data?.data?.data?._id);

			// 	setCookie("token",data?.data?.data?.token,1);
			// 	setCookie("userRole",data?.data?.data?.userRole,1);
			// 	setCookie("user",data?.data?.data?.user,1);
			// 	setCookie("userID",data?.data?.data?.userID,1);
			// 	setCookie("_id",data?.data?.data?._id,1);

			// 	navigate("/");
			// 	window.location.reload();
			// 	}
			// 	else
			// 	{
			// 		Swal.fire({
			// 			icon: 'error',
			// 			title: 'Login Failed..!',
			// 			text: `${data?.data?.message}`,
			// 		})
			// 	}
		  })
		  .catch((error) => {
			Swal.fire({
				icon: 'error',
				title: 'Login Failed..!',
				text: `${error}`,
			})
		  });
	  };
	


	return (
		<div style={{ padding: "100px" }}>
			<center>
				<br></br>
				<h1 className="heading" style={{ fontWeight: "bold" }}>Sign In</h1>
				<p className="lead">
					Login To Your Account
				</p>
				<br />
				<form className="form" onSubmit={(e) => onSubmit(e)} >

					<div className="form-group">
						<input
							id='responsive'
							className="form-control"
							type="email"
							placeholder="Email Address"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							id='responsive'
							className="form-control"
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<input
						type="submit"
						className="btn btn-dark"
						id='responsive'
						value="Login"
					/>
				</form>
				<br />
				<p className="lead">
					<button className="btn btn-dark" id='responsive' onClick={handleGoogleLogin}>Login with Google</button>
					<br/><br/>
      				<button className="btn btn-dark" id='responsive' onClick={handleFacebookLogin}>Login with Facebook</button>
				</p>
				<p className="lead">
					Create new account?&nbsp;&nbsp;<Link to="/register" style={{ color: "green", textDecoration: "none" }}>Sign Up</Link>
					<br></br>
				</p>
			</center>
		</div>
	);
};

export default Login;
