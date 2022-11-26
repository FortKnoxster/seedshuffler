import styled from '@emotion/styled/macro'
import logo from './assets/SeedShufflerLogo.png'
import SeedShuffler from './components/SeedShuffler'
import NavContent from './components/NavContent'

function App() {
  return (
    <AppContainer>
      <AppMenu>
        <AppLogo>
          <Img src={logo} alt="SeedShuffler" />
        </AppLogo>
        <NavContent />
        <AppFooter>
          <a
            href="https://fortknoxster.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with ❤️ by FortKnoxster Ltd.
          </a>
        </AppFooter>
      </AppMenu>
      <AppConent>
        <SeedShuffler />
      </AppConent>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div({
  //height: '100vh',
  //width: '100vw',
  margin: '0 auto',
  display: 'flex',
  overflow: 'hidden',
})

const AppMenu = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  width: 'var(--w-menu)',
  minWidth: 'var(--w-menu)',
  backgroundColor: 'var(--theme-nav-background)',
  minHeight: '100%',
  height: '100%',
  //padding: '1rem',
  position: 'fixed',
  //overflow: 'auto',
})

const AppConent = styled.div({
  height: '100%',
  minHeight: '90vh',
  marginLeft: 'var(--w-menu)',
  //height: '100%',
  //minHeight: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'var(--theme-background)',
  overflow: 'auto',
  padding: '1rem',
})

const AppLogo = styled.div({
  display: 'flex',
  padding: '1rem 1rem 0 1rem',
})

const AppFooter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem 1rem 1rem',
  textAlign: 'center',
  justifyContent: 'center',
  paddingTop: 40,
  borderTop: '2px solid #ccc',
})

const Img = styled.img({
  width: '75%',
  marginTop: 10,
  marginBottom: 20,
})

/*
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://fortknoxster.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by FortKnoxster Ltd.
        </a>
      </footer>
      */
