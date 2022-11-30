import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { AngleUp, AngleDown } from '../helpers/ui'
import MenuContent from './MenuContent'

const NavContent = ({ isVisible }) => {
  const intl = useIntl()
  const [isContentVisible, setIsContentVisible] = useState([
    true,
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
    <Wrapper className={isVisible ? 'open' : ''}>
      <Container>
        <MenuItem onClick={() => onMenuToggle(0)}>
          <h3>
            <FormattedMessage id="nav.how.title" />
          </h3>
          {!isContentVisible[0] ? <AngleDown /> : <AngleUp />}
        </MenuItem>
        <MenuContent isVisible={isContentVisible[0]}>
          <Ul>
            <li>
              <div>
                <Dot />
              </div>
              <span>
                <FormattedMessage id="nav.how.bullet.1" />
              </span>
            </li>
            <li>
              <div>
                <Dot />
              </div>
              <span>
                <FormattedMessage id="nav.how.bullet.2" />
              </span>
            </li>
            <li>
              <div>
                <Dot />
              </div>
              <span>
                <FormattedMessage id="nav.how.bullet.3" />
              </span>
            </li>
            <li>
              <div>
                <Dot />
              </div>
              <span>
                <FormattedMessage id="nav.how.bullet.4" />
              </span>
            </li>
          </Ul>
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
            <FormattedMessage id="nav.who.title" />
          </h3>
          {!isContentVisible[3] ? <AngleDown /> : <AngleUp />}
        </MenuItem>
        <MenuContent isVisible={isContentVisible[3]}>
          <p>
            <FormattedMessage id="nav.who.text.1" />
          </p>
        </MenuContent>
        <MenuItem onClick={() => onMenuToggle(4)}>
          <h3>
            <FormattedMessage id="nav.ex.title" />
          </h3>
          {!isContentVisible[4] ? <AngleDown /> : <AngleUp />}
        </MenuItem>
        <MenuContent isVisible={isContentVisible[4]}>
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
  paddingRight: 5,
  paddingLeft: 2,
  position: 'relative',
  ':hover': {
    backgroundColor: 'var(--theme-nav-item-background)',
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
