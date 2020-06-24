import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RegisterSchema } from './register.schema';
import { useHistory } from 'react-router-dom';
import config from '../config/index';
import './Register.scss';

function Register() {
	const history = useHistory();
	const [showSuccess, setSuccess] = useState(false);

	const submit = async (values) => {
		const res = await fetch(config.apiUrl + '/users', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		});
		if (res.status === 201) {
			setSuccess(true);
			setTimeout(() => history.push('/login'), 2000);
		} else {
			console.log('Unknown error');
		}
		return res;
	};

	return (
		<div className="Register d-flex justify-content-center">
			<div className="col-lg-4 my-5">
				<div className="text-center">
					<h2 className="Register__title">Register</h2>
					<h3 className="Register__subtitle">It's quick and easy</h3>
				</div>
				<Formik
					initialValues={{username: '', password: '', email: '', agreeTerms: false}}
					validationSchema={RegisterSchema}
					validateOnChange={true}
					onSubmit={submit}>
					{({ isSubmitting }) => (
						<Form className="Register__form mt-5 px-0" noValidate>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<Field type="username" className="form-control" id="username" name="username" placeholder="2-16 characters" />
								<ErrorMessage component="small" name="username" className="Register__form__error" />
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<Field type="email" className="form-control" id="email" name="email" placeholder="Email address..." />
								<ErrorMessage component="small" name="email" className="Register__form__error" />
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Field type="password" className="form-control" name="password" id="password" placeholder="6-16 characters" />
								<ErrorMessage component="small" name="password" className="Register__form__error" />
							</div>
							<div className="form-group form-check">
								<div>
									<Field type="checkbox" id="agreeToTerms" name="agreeTerms" className="form-check-input" />
									<label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
								</div>
								<ErrorMessage component="small" name="agreeTerms" className="text-danger" />
							</div>
							<div className="form-group">
								{ showSuccess
									? <div className="alert alert-success Register__success"><b>Success!</b> Wait for transfer...</div>
									: <button type="submit" className="mt-3 Register__submit-btn" disabled={isSubmitting}>Submit</button>
								}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Register;
