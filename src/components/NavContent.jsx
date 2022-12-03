import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { AngleUp, AngleDown } from '../helpers/ui'
import MenuContent from './MenuContent'
import { Twitter, Telegram, Reddit, Github } from '../helpers/ui'

const NavContent = ({ isVisible }) => {
  const intl = useIntl()
  const [isContentVisible, setIsContentVisible] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ])

  async function onMenuToggle(index) {
    const copyOfIsVisible = [...isContentVisible]
    copyOfIsVisible.forEach((_, i) => (copyOfIsVisible[i] = false))
    copyOfIsVisible[index] = !isContentVisible[index]
    await setIsContentVisible(copyOfIsVisible)
  }

  return (
    <>
      <Wrapper className={isVisible ? 'open' : ''}>
        <Container>
          <MenuItem onClick={() => onMenuToggle(0)}>
            <h3>
              <FormattedMessage id="nav.what.title" />
            </h3>
            {!isContentVisible[0] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[0]}>
            <p>
              <FormattedMessage id="nav.what.text.1" />
            </p>
          </MenuContent>

          <MenuItem onClick={() => onMenuToggle(1)}>
            <h3>
              <FormattedMessage id="nav.why.title" />
            </h3>
            {!isContentVisible[1] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[1]}>
            <p>
              <FormattedMessage id="nav.why.text.1" />
            </p>
            <p>
              <FormattedMessage id="nav.why.text.2" />
            </p>
            <p>
              <FormattedMessage id="nav.why.text.3" />
            </p>
          </MenuContent>
          <MenuItem onClick={() => onMenuToggle(2)}>
            <h3>
              <FormattedMessage id="nav.secure.title" />
            </h3>
            {!isContentVisible[2] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[2]}>
            <p>
              <FormattedMessage
                id="nav.secure.text.1"
                values={{
                  github: (
                    <a
                      href="https://github.com/FortKnoxster/seedshuffler"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  ),
                }}
              />
            </p>
          </MenuContent>

          <MenuItem onClick={() => onMenuToggle(3)}>
            <h3>
              <FormattedMessage id="nav.compl.title" />
            </h3>
            {!isContentVisible[3] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[3]}>
            <p>
              <FormattedMessage id="nav.compl.text.1" />
            </p>
          </MenuContent>

          <MenuItem onClick={() => onMenuToggle(4)}>
            <h3>
              <FormattedMessage id="nav.who.title" />
            </h3>
            {!isContentVisible[4] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[4]}>
            <p>
              <FormattedMessage id="nav.who.text.1" />
            </p>
          </MenuContent>
          <MenuItem onClick={() => onMenuToggle(5)}>
            <h3>
              <FormattedMessage id="nav.ex.title" />
            </h3>
            {!isContentVisible[5] ? <AngleDown /> : <AngleUp />}
          </MenuItem>
          <MenuContent isVisible={isContentVisible[5]}>
            <p>
              <FormattedMessage
                id="nav.ex.text.1"
                values={{
                  here: (
                    <a
                      href="https://fortknoxster.com/seedshuffler-example"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {intl.formatMessage({ id: 'here' })}
                    </a>
                  ),
                }}
              />
            </p>
          </MenuContent>
        </Container>
      </Wrapper>
      <NavFooter>
        <a
          className="button-sm"
          href="https://fortknoxster.com/SeedShuffler"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="footer.joinCommunity" />
        </a>

        <h3>
          <FormattedMessage id="footer.joinCommunity" />
        </h3>
        <SocialIcons>
          <a
            className="social-icon"
            href="https://twitter.com/FortKnoxster"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
          <a
            className="social-icon"
            href="https://t.me/FortKnoxster"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram className="social-icon" />
          </a>
          <a
            className="social-icon"
            href="https://www.reddit.com/r/FortKnoxster/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Reddit className="social-icon" />
          </a>
          <a
            className="social-icon"
            href="https://github.com/FortKnoxster"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="social-icon" />
          </a>
          <a
            href="mailto:contact@fortknoxster.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="contact" />
          </a>
        </SocialIcons>
      </NavFooter>
    </>
  )
}

export default NavContent

const Wrapper = styled.div({
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  display: 'block',
})

const Container = styled.div({
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 1rem 1rem 1rem',
  paddingBottom: 60,
  h3: {
    width: '100%',
  },
})

const MenuItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'var(--theme-brand)',
  paddingRight: 5,
  paddingLeft: 2,
  position: 'relative',
  ':hover': {
    backgroundColor: 'var(--theme-nav-item-background)',
  },
  h3: {
    marginBottom: 10,
  },
})

const Ul = styled.ul({
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,
  marginBottom: 0,
  li: {
    display: 'flex',
    marginBottom: 20,
    span: {
      paddingLeft: 15,
    },
    div: {
      marginTop: 1,
    },
  },
  paddingLeft: 0,
})

const Dot = styled.div({
  backgroundColor: 'var(--theme-brand)',
  borderRadius: '50%',
  height: 12,
  width: 12,
})

const NavFooter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem 1rem 1rem',
  justifyContent: 'center',
  paddingTop: 30,
  gap: 10,
  borderTop: '1px solid #000000',
})

const SocialIcons = styled.div({
  display: 'flex',
  //justifyContent: 'center',
  gap: 20,
})
