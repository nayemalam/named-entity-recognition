import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from 'src/components/Layout'
import store from 'src/redux/store'
import '../styles/globals.scss'

type Props = {
  Component: any
  pageProps: React.ReactNode | React.ReactChildren
}

const App = ({ Component, pageProps }: Props) => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider enableSystem attribute="class">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={4}
          closeButton={false}
          transition={Slide}
        />
        <Layout title="Named Entity Recognition">
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
