import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { API_URL } from '@/config/index';
import Item from '@/components/events/Item';

export default function Home({ events }) {
	return (
		<Layout>
			{events.data.length === 0 && <h3>No events to show!</h3>}
			{events.data.map((evt) => {
				console.log(evt);
				const { id } = evt;
				const { name, date, time, address, description, slug } = evt.attributes;
				let image = '/images/event-default.png';
				if (evt.attributes.image.data) {
					image = evt.attributes.image.data.attributes.formats.small.url;
				}

				return (
					<Item
						key={id}
						name={name}
						slug={slug}
						image={image}
						date={date}
						time={time}
						address={address}
						description={description}
					/>
				);
			})}

			{events.data.length !== 0 && (
				<Link href='/events'>
					<a className='btn-secondary'>View All Events</a>
				</Link>
			)}
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(
		`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`
	);
	const events = await res.json();

	return {
		props: { events },
		// revalidate: 1,
	};
}
