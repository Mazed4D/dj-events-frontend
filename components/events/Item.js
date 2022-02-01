import Link from 'next/link';
import Image from 'next/image';
import { event, img, info, link } from '@/styles/Item.module.scss';

const Item = ({ image, name, date, time, slug, address, description }) => {
	return (
		<div className={event}>
			<div className={img}>
				<Image
					src={image ? image : '/images/event-default.png'}
					alt={name}
					width={170}
					height={100}
				/>
			</div>

			<div className={info}>
				<span>
					{new Date(date).toLocaleDateString('en-US')} at {time}
				</span>
				<h3>{name}</h3>
			</div>

			<div className={link}>
				<Link href={`/events/${slug}`}>
					<a className='btn'>Details</a>
				</Link>
			</div>
		</div>
	);
};

export default Item;
