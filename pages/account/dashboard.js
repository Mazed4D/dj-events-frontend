import Layout from '@/components/layout/Layout';
import { parseCookies } from '@/helpers/index';

const DashboardPage = () => {
	return (
		<Layout title='Dashboard | DJ EVENTS'>
			<h1>Dashboard</h1>
		</Layout>
	);
};

export default DashboardPage;

export async function getServersideProps({ req }) {
	const { token } = parseCookies(req);

	console.log(token);

	return {
		props: {},
	};
}
