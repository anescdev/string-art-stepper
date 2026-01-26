import './App.css'
import DataProvider from './components/data-provider'
import Toolbar from './components/toolbar/toolbar'
import MainPage from './pages/main-page/main-page'
import { Trans, useTranslation } from 'react-i18next'

function App() {
  const [t] = useTranslation()

  return (
    <>
      <header>
        <h1>{t("title")}</h1>
        <h3>{t("description")}</h3>
      </header>
      <DataProvider>
        <Toolbar />
        <main>
          <MainPage></MainPage>
        </main>
      </DataProvider>
      <footer>
        <p>
          <Trans
            i18nKey="help"
            components={{ website: <a target="_blank" href="https://www.stringartgenerator.app/" /> }}
            values={{ websiteName: "String Art Generator" }}
          />
        </p>
        <p>
          <Trans 
            i18nKey="developer"
            components={{ developerWebsite: <a target="_blank" href="https://www.github.com/anescdev" /> }}
            values={{developer: "AnesCDev"}}/>
        </p>
      </footer>
    </>
  )
}

export default App
