import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import logo from './assets/seedshuffler-logo.svg'
import logoDark from './assets/seedshuffler-logo-dark.svg'
import SeedShuffler from './components/SeedShuffler'
import NavContent from './components/NavContent'
import AppFooter from './components/AppFooter'
import {
  MenuToggle,
  Dark,
  Light,
  checkDarkTheme,
  setDarkMode,
  setLightMode,
} from './helpers/ui'
import { useWindowSize } from './hooks/useWindowSize'
import { MENU_HIDE_ON_WIDTH } from './constants/variables'
import useOnClickOutside from './hooks/useOnClickOutside'

function App() {
  const size = useWindowSize()
  const menuRef = useRef(null)
  const [isMenuVisible, setIsMenuVisible] = useState(
    MENU_HIDE_ON_WIDTH < size.width,
  )
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (checkDarkTheme()) setIsDarkMode(true)
  }, [])

  function toggleMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isMenuVisible) {
      setIsMenuVisible(false)
    } else {
      setIsMenuVisible(true)
    }
  }

  function toggleDarkMode() {
    if (isDarkMode) {
      setLightMode()
      setIsDarkMode(false)
    } else {
      setDarkMode()
      setIsDarkMode(true)
    }
  }

  function handleClose(e) {
    e.stopPropagation()
    if (
      e.target.id !== 'close-menu-button' &&
      e.target.parentElement.id !== 'close-menu-button' &&
      e.target.parentElement.parentElement.id !== 'close-menu-button'
    ) {
      setIsMenuVisible(false)
    }
  }

  useOnClickOutside(menuRef, handleClose)

  return (
    <AppContainer>
      <AppMenu ref={menuRef} className={isMenuVisible ? 'open' : ''}>
        <AppLogo>
          <Img src={isDarkMode ? logoDark : logo} alt="SeedShuffler" />
        </AppLogo>
        <NavContent />
      </AppMenu>
      <AppConent className={isMenuVisible ? 'open' : ''}>
        {size.width < MENU_HIDE_ON_WIDTH ? (
          <MobileHeader>
            <Img src={isDarkMode ? logoDark : logo} alt="SeedShuffler" />
            <div className="header-buttons">
              {isDarkMode ? (
                <LightMode className="button-icon" onClick={toggleDarkMode}>
                  <Light size="xl" />
                </LightMode>
              ) : (
                <DarkMode className="button-icon" onClick={toggleDarkMode}>
                  <Dark size="xl" />
                </DarkMode>
              )}
              <button
                id="close-menu-button"
                className="button-icon"
                onClick={toggleMenu}
              >
                <MenuToggle size="lg" />
              </button>
            </div>
          </MobileHeader>
        ) : (
          <Header>
            {isDarkMode ? (
              <LightMode className="button-icon" onClick={toggleDarkMode}>
                <Light size="xl" />
              </LightMode>
            ) : (
              <DarkMode className="button-icon" onClick={toggleDarkMode}>
                <Dark size="xl" />
              </DarkMode>
            )}
          </Header>
        )}
        <SeedShuffler />
        <AppFooter />
      </AppConent>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div({
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
  position: 'fixed',
  '@media (max-width: 768px)': {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    transition: 'transform 100ms ease-in-out',
    transform: 'translateX(-100%)',
    '&.open': {
      transform: 'translateX(0)',
    },
  },
})

const AppConent = styled.div({
  height: '100%',
  minHeight: '98vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'var(--theme-background)',
  overflow: 'hidden auto',
  padding: '0 1rem 1rem 1rem',
  marginLeft: 'var(--w-menu)',
  '@media (max-width: 768px)': {
    marginLeft: 0,
  },
})

const AppLogo = styled.div({
  display: 'flex',
  padding: '0.5rem 1rem 0 1rem',
  justifyContent: 'center',
})

const Img = styled.img({
  width: '100%',
  margin: '20px 5px 20px 0',
})

const MobileHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '10px 7px',
  [Img]: {
    width: '60%',
    margin: 0,
  },
  '.header-buttons': {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
})

const Header = styled(MobileHeader)({
  justifyContent: 'flex-end',
})

const DarkMode = styled.button({
  width: 49,
  height: 49,
  '& svg': {
    color: '#000000',
  },
})

const LightMode = styled(DarkMode)({
  width: 49,
  height: 49,
  '& svg': {
    color: 'var(--theme-brand)',
  },
})
