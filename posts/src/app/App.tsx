import { ProfilePage } from '@/pages'
import { QueryProvider } from './providers/QueryProvider/QueryProvider'
import { AppLoader } from './providers/AppLoader/AppLoader'
import { ModalProvider } from './providers/ModalProvider/ModalProvider'
import { Header } from '@/widgets/Header/Header'

function App() {
  return (
    <QueryProvider>
      <AppLoader>
        <ModalProvider>
          <Header />
          <ProfilePage />
        </ModalProvider>
      </AppLoader>
    </QueryProvider>
  )
}

export default App
