import qs from 'qs';
import Layout from '@/components/layout/Layout';
import { API_URL } from '@/config/index';
import Item from '@/components/events/Item';
import { useRouter } from 'next/router';

export default function SearchPage({ events }) {
	const router = useRouter();

	return (
		<Layout title='Search Results'>
			<h1>Search Results for {router.query.term}</h1>
			{events.data.length === 0 && <h3>No events to show!</h3>}
			{events.data.map((evt) => {
				console.log(evt);
				const { id } = evt;
				const { name, date, time, address, description, slug } = evt.attributes;
				const image = evt.attributes.image.data.attributes.formats.small.url;
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
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		filters: {
			$or: [
				{
					name: {
						$contains: term,
					},
				},
				{
					venue: {
						$contains: term,
					},
				},
				{
					address: {
						$contains: term,
					},
				},
				{
					performers: {
						$contains: term,
					},
				},
				{
					description: {
						$contains: term,
					},
				},
				{
					venue: {
						$contains: term,
					},
				},
			],
		},
		encodeValuesOnly: true,
	});

	// const res = await fetch(
	// 	`${API_URL}/api/events?filters[name][$contains]=${term}&populate=*`
	// );
	const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
	const events = await res.json();

	return {
		props: { events },
	};
}
