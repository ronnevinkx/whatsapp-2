import Image from 'next/image';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
	return (
		<div className="container">
			<div className="inner">
				<Image
					src="/whatsapp.svg"
					width={80}
					height={80}
					alt="WhatsApp 2.0"
				/>
				<Loader
					type="ThreeDots"
					color="#00E676"
					height={70}
					width={70}
				/>
			</div>
			<style jsx>{`
				.container {
					display: grid;
					height: 100vh;
					place-items: center;
				}

				.inner {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			`}</style>
		</div>
	);
};
