import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store'
import 'animate.css';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
