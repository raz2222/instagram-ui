import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RegisterSchema } from './register.schema';

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
		<div>
			<h2>Register page</h2>
			<Formik
				initialValues={{username: '', password: '', email: '', agreeTerms: false}}
				validationSchema={RegisterSchema}
				onSubmit={submit}>
				{({ errors, touched }) => (
					<Form className="col-lg-4 mt-4" noValidate>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Field className="form-control" id="username" name="username" placeholder="2-16 characters" />
							{ errors.username && touched.username && <small className="text-danger pl-2">{errors.username}</small> }
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Field type="password" className="form-control" name="password" id="password" placeholder="6-16 characters" />
							{ errors.password && touched.password && <small className="text-danger pl-2">{errors.password}</small> }
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<Field type="email" className="form-control" id="email" name="email" placeholder="Email address..." />
							{ errors.email && touched.email && <small className="text-danger pl-2">{errors.email}</small> }
						</div>
						<div className="form-group form-check">
							<div>
								<Field type="checkbox" id="agreeToTerms" name="agreeTerms" className="form-check-input" />
								<label htmlFor="agreeToTerms" className="form-check-label">Agree to terms</label>
							</div>
							{ errors.agreeTerms && touched.agreeTerms && <small className="text-danger pl-2">{errors.agreeTerms}</small> }
						</div>
						<div className="form-group text-right">
							<button type="submit" className="btn btn-dark">Submit</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Register;
