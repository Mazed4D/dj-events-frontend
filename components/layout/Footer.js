import Link from 'next/link';
import { footer } from '@/styles/Footer.module.scss';

const Footer = () => {
	return (
		<div className={footer}>
			<p>Copyright &copy; DJ Events 2021</p>
			<Link href='/abot'>
				<a>About this project</a>
			</Link>
		</div>
	);
};

export default Footer;
