import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import Item from '@/components/events/Item';
import Pagination from '@/components/Pagination';

export default function EventsPage({ events }) {
	const { page, pageCount } = events.meta.pagination;
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
			<Pagination page={page} pageCount={pageCount} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const res = await fetch(
		`${API_URL}/api/events?_sort=date:ASC&populate=*&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`
	);
	const events = await res.json();

	return {
		props: { events },
	};
}
