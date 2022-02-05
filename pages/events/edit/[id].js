import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.scss';
import Layout from '@/components/layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';

export default function EditEventPage({ evt: { data }, token }) {
	const [values, setValues] = useState({
		name: data.attributes.name,
		performers: data.attributes.performers,
		venue: data.attributes.venue,
		address: data.attributes.address,
		date: data.attributes.date.slice(0, 10),
		time: data.attributes.time,
		description: data.attributes.description,
	});
	const [imagePreview, setImagePreview] = useState(
		data.attributes.image.data
			? data.attributes.image.data.attributes.formats.small.url
			: null
	);
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/api/events/${data.id}?populate=*`);
		const resData = await res.json();
		console.log(resData);
		setImagePreview(
			resData.data.attributes.image.data.attributes.formats.thumbnail.url
		);
		setShowModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(values);
		const hasEmptyFields = Object.values(values).some(
			(element) => element === ''
		);
		console.log(hasEmptyFields);
		if (hasEmptyFields) {
			toast.error('Please make sure that no input is empty.');
		} else {
			const jsonBody = {
				data: values,
			};
			const res = await fetch(`${API_URL}/api/events/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jsonBody),
			});
			if (!res.ok) {
				toast.error('Something went wrong!');
				console.log(res.status);
			}
			const evt = await res.json();
			console.log(evt);
			router.push(`/events/${evt.data.attributes.slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues((state) => {
			return { ...state, [name]: value };
		});
	};

	return (
		<Layout title='Add New Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							name='performers'
							id='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							name='venue'
							id='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							value={values.date}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							name='time'
							id='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>

				<input type='submit' value='Update Event' className='btn' />
			</form>

			<h2>Event Image</h2>
			{imagePreview && (
				<Image
					src={imagePreview}
					alt={data.attributes.name}
					height={100}
					width={170}
				/>
			)}
			{!imagePreview && <p>No image uploaded.</p>}
			<div className='btn-secondary' onClick={() => setShowModal(true)}>
				<FontAwesomeIcon icon={faImage} />
				Set Image
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload evtId={data.id} imageUploaded={imageUploaded} />
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id }, req }) {
	const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
	const evt = await res.json();

	console.log(req.headers.cookie);

	return {
		props: {
			evt,
		},
	};
}
