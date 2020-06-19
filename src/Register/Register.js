import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RegisterSchema } from './register.schema';
import './Register.scss';

function Register() {

	const submit = async (values) => {
		try {
			await fetch('http://localhost:4000/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
		} catch(error) {
			console.log(error);
		}
	};

	return (
		<div className="Register row d-flex justify-content-center">
			<div className="col-lg-6 order-sm-0 order-lg-1 my-5">
				<h2 className="Register__title">Register</h2>
				<h3 className="Register__subtitle">It's quick and easy</h3>
				<Formik
					initialValues={{username: '', password: '', email: '', agreeTerms: false}}
					validationSchema={RegisterSchema}
					onSubmit={submit}>
					{({ errors, touched }) => (
						<Form className="Register__form mt-5 col-lg-8 px-0" noValidate>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<Field className="form-control" id="username" name="username" placeholder="2-16 characters" />
								{ errors.username && touched.username && <small className="Register__form__error">{errors.username}</small> }
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Field type="password" className="form-control" name="password" id="password" placeholder="6-16 characters" />
								{ errors.password && touched.password && <small className="Register__form__error">{errors.password}</small> }
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<Field type="email" className="form-control" id="email" name="email" placeholder="Email address..." />
								{ errors.email && touched.email && <small className="Register__form__error">{errors.email}</small> }
							</div>
							<div className="form-group form-check">
								<div>
									<Field type="checkbox" id="agreeToTerms" name="agreeTerms" className="form-check-input" />
									<label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
								</div>
								{ errors.agreeTerms && touched.agreeTerms && <small className="text-danger">{errors.agreeTerms}</small> }
							</div>
							<div className="form-group text-right">
								<button type="submit" className="btn btn-dark w-100 mt-3 Register__submit-btn">Submit</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="col-lg-6 order-sm-1 order-lg-0 text-right">
				<img src={require('./intro.png')} className="Register__intro-image my-2 mx-3" alt="Instagram" />
			</div>
		</div>

	);
}

export default Register;
