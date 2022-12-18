import { useState } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { Close } from '../helpers/ui'
import { isEmail } from '../helpers/utils'
import { getDieFi } from '../helpers/api'
import Modal from './Modal'
import Spinner from './Spinner'

const DownloadModal = ({ isVisible, onDownload, onClose, ...rest }) => {
  const intl = useIntl()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  function handleClose(e) {
    onClose()
  }

  function handleChange(e) {
    const { value } = e.target
    setEmail(value)
    setIsValid(isEmail(value))
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true)
      const response = await getDieFi(email)
      const json = await response.json()
      const { success } = json
      if (success) {
        setHasSubmitted(true)
      }
    } catch (err) {
      console.error(err)
      setHasSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleDownload() {
    onDownload()
    if (email && isValid) {
      handleSubmit()
    }
  }

  return (
    <ModalWrapper isVisible={isVisible} {...rest}>
      <CloseButton className="button-close-icon" onClick={handleClose}>
        <Close size="2x" />
      </CloseButton>
      <Body>
        <Wrapper>
          <div>
            <h2>
              <FormattedMessage id="modal.download.title" />
            </h2>

            <Ol>
              <li>
                <p>
                  <FormattedMessage id="modal.download.bullet.1" />
                </p>
              </li>
              <li>
                <p>
                  <FormattedMessage id="modal.download.bullet.2" />
                </p>
              </li>
            </Ol>

            <p>
              <FormattedMessage id="modal.download.text.1" />
            </p>
            <p>
              <FormattedMessage id="modal.download.text.2" />
            </p>
          </div>
          <EmailInput>
            {hasSubmitted && (
              <p className="success">
                <FormattedMessage id="email.success.1" />
                <br />
                <FormattedMessage id="email.success.2" />
              </p>
            )}
            {!hasSubmitted && !isSubmitting && (
              <>
                <label>
                  <FormattedMessage id="input.email.label" />
                </label>
                <input
                  type="email"
                  name="email"
                  autoFocus
                  value={email}
                  onChange={handleChange}
                  placeholder={intl.formatMessage({
                    id: 'input.email.placeholder',
                  })}
                />
              </>
            )}
            {isSubmitting && <Spinner isVisible={isSubmitting} />}
          </EmailInput>
        </Wrapper>
        <Footer>
          <button className="button" onClick={() => handleDownload()}>
            <FormattedMessage id="seed.button.download" />
          </button>
        </Footer>
      </Body>
    </ModalWrapper>
  )
}

export default DownloadModal

const ModalWrapper = styled(Modal)({
  maxWidth: 550,
  padding: 10,
  position: 'relative',
})

const CloseButton = styled.button({
  position: 'absolute',
  right: 15,
  top: 10,
})

const Body = styled.div({
  textAlign: 'left',
  margin: '25px 25px 20px 25px',
})

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  h2: {
    marginTop: 0,
    marginBottom: 10,
  },
  p: {
    marginTop: 15,
    marginBottom: 10,
    minWidth: '100%',
    maxWidth: '100%',
  },
})

const Ol = styled.ol({
  margin: '20px 0',
  paddingLeft: 25,
  '@media (max-width: 768px)': {
    maxWidth: '100%',
    marginLeft: 0,
    paddingLeft: 15,
  },
  li: {
    marginBottom: 10,
    paddingLeft: 10,
  },
})

const EmailInput = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  //alignItems: 'center',
  //alignContent: 'center',
  width: '100%',
  marginTop: 10,
  input: {
    marginTop: 10,
    padding: 10,
    border: '2px solid var(--theme-brand)',
    borderRadius: 5,
    //width: '70%',
    //width: '100%',
    color: 'var(--theme-font)',
    backgroundColor: 'var(--theme-dropdown-background)',
  },
  label: { marginBottom: 5 },
})

const Footer = styled.div({
  textAlign: 'center',
  margin: '40px auto 10px auto',
  button: {
    width: '100%',
  },
})
