import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { PostCreateSchema } from './post-create.schema';
import './PostCreate.scss';

function PostCreate() {

	const submit = async (values) => {
		const res = await fetch('http://localhost:4000/posts', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: "include",
			body: JSON.stringify(values)
		});
	};

	return (
	<div className=" d-flex row">
		<div className="col-lg-6 order-sm-0 order-lg-1 my-lg-5">
			<h2 className="PostCreate__title">Create Post</h2>
			<Formik
				initialValues={{image: '', description: ''}}
				validationSchema={PostCreateSchema}
				onSubmit={submit}>
				{({ isSubmitting }) => (
					<Form className="PostCreate__form mt-5 col-lg-8 px-0" noValidate>
						<div className="form-group">
							<label htmlFor="image">Image</label>
							<Field type="file" id="image" name="image" />
							<ErrorMessage component="small" name="image" className="PostCreate__form__error" />
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<Field as="textarea" className="form-control" name="description" id="description" />
							<ErrorMessage component="small" name="description" className="PostCreate__form__error" />
						</div>
						<div className="form-group text-right">
							<button type="submit" className="mt-3 PostCreate__submit-btn" disabled={isSubmitting}>Post</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	</div>
	);
}

export default PostCreate;
