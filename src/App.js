import { useState, useRef } from 'react'
import styled from '@emotion/styled/macro'
import logo from './assets/seedshuffler-logo.svg'
import SeedShuffler from './components/SeedShuffler'
import NavContent from './components/NavContent'
import FootterContent from './components/FooterContent'
import { MenuToggle } from './helpers/ui'
import { useWindowSize } from './hooks/useWindowSize'
import { MENU_HIDE_ON_WIDTH } from './constants/variables'
import useOnClickOutside from './hooks/useOnClickOutside'

function App() {
  const size = useWindowSize()
  const menuRef = useRef(null)
  const [isMenuVisible, setIsMenuVisible] = useState(
    MENU_HIDE_ON_WIDTH < size.width,
  )

  function toggleMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isMenuVisible) {
      setIsMenuVisible(false)
    } else {
      setIsMenuVisible(true)
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
          <Img src={logo} alt="SeedShuffler" />
        </AppLogo>
        <NavContent />
        <AppFooter>
          <FootterContent />
        </AppFooter>
      </AppMenu>
      <AppConent className={isMenuVisible ? 'open' : ''}>
        {size.width < MENU_HIDE_ON_WIDTH && (
          <MobileHeader>
            <Img src={logo} alt="SeedShuffler" />
            <button
              id="close-menu-button"
              className="button-icon"
              onClick={toggleMenu}
            >
              <MenuToggle size="lg" />
            </button>
          </MobileHeader>
        )}
        <SeedShuffler />
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
  overflow: 'auto',
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

const AppFooter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem 1rem 1rem',
  justifyContent: 'center',
  paddingTop: 30,
  gap: 10,
  borderTop: '2px solid #ccc',
})

const Img = styled.img({
  width: '70%',
  marginBottom: 20,
  marginRight: 5,
  '@media (max-width: 768px)': {
    width: '50%',
  },
})

const MobileHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '7px 5px',
  [Img]: {
    width: 120,
    marginBottom: 0,
    marginRight: 0,
  },
})
