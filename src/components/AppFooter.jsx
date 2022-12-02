import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { APP_BRAND } from '../constants/variables'
import {
  Twitter,
  Telegram,
  Reddit,
  Facebook,
  WhatsApp,
  Linkedin,
  Envelope,
} from '../helpers/ui'

// eslint-disable-next-line no-empty-pattern
const AppFooter = ({}) => {
  const intl = useIntl()

  const url = 'https://seedshuffler.com'
  const shareMessage = encodeURIComponent(
    intl.formatMessage({ id: 'social.shareText' }),
  )

  const telegramString = `https://t.me/share/url?url=${url}&text=${shareMessage}`

  const facebookString = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareMessage}`

  const twitterString = `https://twitter.com/intent/tweet?text=${shareMessage}%20${url}`

  const whatsAppString = `https://wa.me/?text=${shareMessage}%5Cn%20${url}`

  const redditString = `https://www.reddit.com/submit?url=${url}&title=${shareMessage}`

  //const instagramString = `https://www.instagram.com?url=${url}`

  const linkedinString = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`

  const mailToString = `mailto:?subject=${shareMessage}&body=%0D%0A${url}%0D%0A`

  return (
    <Container>
      <p className="intro-text">
        <FormattedMessage id="social.intro" />
      </p>
      <SocialIcons>
        <ButtonIcon
          className="button-icon"
          href={twitterString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Twitter' },
          )}
        >
          <Twitter size="lg" />
        </ButtonIcon>
        <ButtonIcon
          className="button-icon"
          href={telegramString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Telegram' },
          )}
        >
          <Telegram size="lg" />
        </ButtonIcon>
        <ButtonIcon
          className="button-icon"
          href={whatsAppString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'WhatsApp' },
          )}
        >
          <WhatsApp size="lg" />
        </ButtonIcon>

        <ButtonIcon
          className="button-icon"
          href={facebookString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Facebook' },
          )}
        >
          <Facebook size="lg" />
        </ButtonIcon>
        <ButtonIcon
          className="button-icon"
          href={redditString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Reddit' },
          )}
        >
          <Reddit size="lg" />
        </ButtonIcon>
        <ButtonIcon
          className="button-icon"
          href={linkedinString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Linkedin' },
          )}
        >
          <Linkedin size="lg" />
        </ButtonIcon>
        <ButtonIcon
          className="button-icon"
          href={mailToString}
          target="_blank"
          rel="noopener noreferrer"
          title={intl.formatMessage(
            { id: 'social.spreadTheWord' },
            { social: 'Email' },
          )}
        >
          <Envelope size="lg" />
        </ButtonIcon>
      </SocialIcons>
      <p className="disclaimer">
        <FormattedMessage
          id="copyright"
          values={{
            year: new Date().getFullYear(),
            brand: (
              <a
                href="https://fortknoxster.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {APP_BRAND}
              </a>
            ),
          }}
        />{' '}
        <FormattedMessage id="disclaimer" />
      </p>
    </Container>
  )
}

export default AppFooter

const Container = styled.footer({
  paddingTop: 20,
  marginBottom: 0,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 0,
  p: {
    margin: 0,
  },
})

const SocialIcons = styled.div({
  display: 'flex',
  gap: 10,
  paddingTop: 20,
  paddingBottom: 40,
})

const ButtonIcon = styled.a({
  padding: '0.6rem',
  '& svg': {
    color: '#000000',
  },
  '&:hover, &:active, &:visited': {
    padding: '0.6rem',
  },
})
