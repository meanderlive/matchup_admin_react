import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import { createSubscription, getallSubscription } from '../../../redux/Slice/SubscriptionPlans_Slice';
import { createblogSlice, getallblogSlice, updateblogSlice } from '../../../redux/Slice/BlogArticlesPublishingSlice';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { fetchUser } from '../../../redux/Slice/UserManagement_slice';
import Select from '../../../components/bootstrap/forms/Select';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	editId: any;
	editData: any;
	setIsOpen(...args: unknown[]): unknown;
}

const AddBlogArticlesPublishing: FC<ICustomerEditModalProps> = ({ id, isOpen, editId, editData, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const modeid = localStorage.getItem('modeid');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const dispatch = useDispatch();
	const userValidation = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		description: Yup.string().required('Description is required'),
		user: Yup.string().required('User is required'),




	});
	useEffect(() => {
console.log("running")

		dispatch(fetchUser({ modeid, currentPage }) as any)
	}, [dispatch, modeid, currentPage])


	const stateUser: any = useSelector((state: any) => state.user)
	const currentDate = new Date();
	const isoDateString = currentDate.toISOString();
	const reversedDataa = stateUser?.users?.data;


	const listuser = reversedDataa && Array.isArray(reversedDataa) ? reversedDataa.map((i: any, index: number) => ({
		text: i.name,
		value: i._id
	})) : [];



	const newArray = [{
		text: 'Select User',
		value: ''
	}, ...listuser]

	const formik = useFormik({
		initialValues: {
			Image: editData.Image || '',
			title: editData.title || "",
			description: editData.description || "",
			publishedDate: editData.publishedDate || isoDateString,
			modifiedDate: editData.modifiedDate || isoDateString,
			status: true,
			user: editData?.user?._id || '',
			mode: modeid,
		},
		enableReinitialize: true,

		validationSchema: userValidation,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			try {



				{
					editId.length !== 0 ?
					dispatch(updateblogSlice({ editId, values }) as any)

					:


					dispatch(createblogSlice(values) as any);
				}


				setTimeout(() => {

					dispatch(getallblogSlice(modeid) as any)
				}, 500);
				// dispatch(createblogSlice(values) as any);
			} catch (error) {
			}
			setIsOpen(false);
			resetForm()
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Added Successfully</span>
				</span>,
				'BlogArticlesPublishing has been Added successfully',
			);
		},
	});

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>


						{editId.length !== 0 ?
							'Edit Blog Articles Publishing' : 'New Blog Articles Publishing'
						}	                 </ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className=' g-4'>
						<FormGroup id='Image' label='Image' className='col-12'>
							<Input
								type='file'
								onChange={formik.handleChange}
								value={formik.values.Image}



							/>
						</FormGroup>
						<FormGroup id='title' label='Title' className='col-12'>
							<Input
								name='title'
								onChange={formik.handleChange}
								value={formik.values.title}
							/>
						</FormGroup>
						<FormGroup id='user' label='User' className='col-12'>
							<Select
								onChange={formik.handleChange}
								isTouched={formik.touched.user as any}
								invalidFeedback={formik.errors.user as any}
								onBlur={formik.handleBlur}
								onFocus={() => { formik.setErrors({}); }}
								isValid={formik.isValid}
								value={formik.values.user}
								id="user"
								list={newArray}
								ariaLabel=''

							/>

						</FormGroup>

						<FormGroup
							id='description'
							label='Description'
						
							className='my-5'
							isColForLabel
							labelClassName='col-sm-2  text-capitalize'
							childWrapperClassName='col-sm-10'>
							<Textarea 
							name="description"
							value={formik.values.description}
								isTouched={formik.touched.description as any}
								invalidFeedback={formik.errors.description as any}
								onBlur={formik.handleBlur}
								onFocus={() => { formik.setErrors({}); }}
								isValid={formik.isValid} onChange={formik.handleChange} />
						</FormGroup>


					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						{editId.length !== 0 ? "Update" : 'Save'
						}					</Button>

				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
AddBlogArticlesPublishing.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default AddBlogArticlesPublishing;
