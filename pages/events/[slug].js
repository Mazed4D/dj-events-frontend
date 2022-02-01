import { API_URL } from '@/config/index';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/Event.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const EventPage = ({ evt }) => {
	const router = useRouter();
	const deleteEvent = async () => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
				method: 'DELETE',
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);
			} else {
				router.push('/events');
			}
		}
	};

	return (
		<Layout>
			<ToastContainer />
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`}>
						<a>
							<FontAwesomeIcon icon={faPencilAlt} />
							Edit
						</a>
					</Link>
					<a className={styles.delete}>
						<FontAwesomeIcon icon={faTimes} onClick={deleteEvent} />
						Delete
					</a>
				</div>
				<span>
					{new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
					{evt.attributes.time}
				</span>

				<h1>{evt.attributes.name}</h1>
				{evt.attributes.image.data && (
					<div className={styles.image}>
						<Image
							src={evt.attributes.image.data.attributes.formats.large.url}
							alt={evt.attributes.name}
							width={960}
							height={600}
						/>
					</div>
				)}
				{!evt.attributes.image.data && (
					<div className={styles.image}>
						<Image src='/images/event-default.png' width={960} height={600} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{evt.attributes.performers}</p>
				<h3>Description:</h3>
				<p>{evt.attributes.description}</p>
				<h3>Venue: {evt.attributes.venue}</h3>
				<p>{evt.attributes.address}</p>

				<Link href='/events'>
					<a className={styles.back}>{'<'} Go back</a>
				</Link>
			</div>
		</Layout>
	);
};

export default EventPage;

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	const paths = events.data.map((evt) => ({
		params: { slug: evt.attributes.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(
		`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
	);
	const events = await res.json();

	return {
		props: {
			evt: events.data[0],
		},
	};
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);
// 	const events = await res.json();

// 	return {
// 		props: {
// 			evt: events,
// 		},
// 	};
// }
