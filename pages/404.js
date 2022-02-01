import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { error } from '@/styles/404.module.scss';

const NotFound = () => {
	return (
		<Layout>
			<div className={error}>
				<h1>
					<FontAwesomeIcon icon={faExclamationTriangle} />
					404
				</h1>
				<h4>Sorry there is nothing here</h4>
				<Link href='/'>
					<a>Go back home</a>
				</Link>
			</div>
		</Layout>
	);
};

export default NotFound;
