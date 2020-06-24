import React  from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LoginSchema } from './login.schema';
import { Link } from 'react-router-dom';
import intro from './intro.png';
import './Login.scss';

function Login() {

	const submit = async (values) => {
		const res = await fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		});
		if (res.status === 200) {
			console.log('yes')
		} else if (res.status === 401) {
			console.log('no');
		} else {
			console.log('Unknown error');
		}
		return res;
	};

	return (
		<div className="Login d-flex row justify-content-center">
			<div className="col-lg-6 order-sm-0 order-lg-1 my-lg-5">
				<h2 className="Login__title">Login</h2>
				<Formik
					initialValues={{username: '', password: ''}}
					validationSchema={LoginSchema}
					onSubmit={submit}>
					{({ isSubmitting }) => (
						<Form className="Login__form mt-5 col-lg-8 px-0" noValidate>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<Field className="form-control" id="username" name="username" />
								<ErrorMessage component="small" name="username" className="Login__form__error" />
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Field type="password" className="form-control" name="password" id="password" />
								<ErrorMessage component="small" name="password" className="Login__form__error" />
							</div>
							<div className="form-group text-right">
								<button type="submit" className="mt-3 Login__submit-btn" disabled={isSubmitting}>Login</button>
							</div>
							<hr className="mt-4" />
							<div className="text-center">
								Don't have an account? <Link to="/register" className="Login__register-link">Register</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="col-lg-6 order-sm-1 order-lg-0 my-4 my-lg-0 text-right">
				<img src={intro} className="Login__intro-image my-2 mx-3" alt="Instagram" />
			</div>
		</div>
	);
}

export default Login;
