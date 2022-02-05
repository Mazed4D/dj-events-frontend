import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import styles from '@/styles/AuthForm.module.scss';
import AuthContext from '@/context/AuthContext';

const RegisterPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const { register, error } = useContext(AuthContext);

	useEffect(() => error && toast.error(error));

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);

		if (password !== confirm) {
			toast.error('Passwords do not match!');
			return;
		}

		register({ username, email, password });
	};

	return (
		<Layout title='User Register'>
			<div className={styles.auth}>
				<h1>
					<FontAwesomeIcon icon={faUser} /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							type='email'
							name='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='email'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='confirm'>Confirm Password</label>
						<input
							type='password'
							name='confirm'
							id='confirm'
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
						/>
					</div>
					<input type='submit' value='Register' className='btn' />
				</form>

				<p>
					Have an account? <Link href='/account/login'>Login</Link>
				</p>
			</div>
		</Layout>
	);
};

export default RegisterPage;
