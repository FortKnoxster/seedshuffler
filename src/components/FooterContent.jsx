import styled from '@emotion/styled/macro'
import { FormattedMessage } from 'react-intl'
import { Twitter, Telegram, Reddit, Github } from '../helpers/ui'

// eslint-disable-next-line no-empty-pattern
const FooterContent = ({}) => {
  return (
    <>
      <a
        className="button-sm"
        href="https://fortknoxster.com/SeedShuffler"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="footer.learnMore" />
      </a>

      <h3>Join our community</h3>
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
      </SocialIcons>
    </>
  )
}

export default FooterContent

const SocialIcons = styled.div({
  display: 'flex',
  //justifyContent: 'center',
  gap: 20,
})
