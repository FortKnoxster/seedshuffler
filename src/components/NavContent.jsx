import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { APP_BRAND_NAME } from '../constants/variables'

const NavContent = ({}) => {
  const intl = useIntl()
  return (
    <Wrapper>
      <Container>
        <p>
          <FormattedMessage id="nav.intro.1" />
        </p>
        <p>
          <FormattedMessage
            id="nav.intro.2"
            values={{
              openSourced: (
                <a
                  href="https://github.com/FortKnoxster/seedshuffler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({ id: 'nav.intro.openSourced' })}
                </a>
              ),
              brandName: (
                <a
                  href="https://github.com/FortKnoxster/seedshuffler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {APP_BRAND_NAME}
                </a>
              ),
            }}
          />
        </p>
        <h3>
          <FormattedMessage id="nav.how.title" />
        </h3>
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
          <li>
            <div>
              <Dot />
            </div>
            <span>
              <FormattedMessage id="nav.how.bullet.5" />
            </span>
          </li>
        </Ul>
        <h3>
          <FormattedMessage id="nav.why.title" />
        </h3>
        <p>
          <FormattedMessage id="nav.why.text.1" />
        </p>
        <p>
          <FormattedMessage id="nav.why.text.2" />
        </p>
        <h3>
          <FormattedMessage id="nav.secure.title" />
        </h3>
        <p>
          <FormattedMessage id="nav.secure.text.1" />
        </p>
        <h3>
          <FormattedMessage id="nav.who.title" />
        </h3>
        <p>
          <FormattedMessage id="nav.who.text.1" />
        </p>
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
  height: 16,
  width: 16,
})
