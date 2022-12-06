import React from 'react'
import { animated, config, useTransition } from 'react-spring'
import styled from '@emotion/styled/macro'

const Modal = ({ children, isVisible, hasAppMenu, ...rest }) => {
  const transitions = useTransition(isVisible, {
    config: isVisible ? config.stiff : { delay: 150 },
    from: { transform: 'translateY(100%)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateY(100%)', opacity: 0 },
  })

  return transitions(
    (styles, show) =>
      show && (
        <Overlay
          style={{ opacity: styles.opacity }}
          className={hasAppMenu && 'has-appmenu'}
        >
          <ModalWrapper style={styles} {...rest}>
            {children}
          </ModalWrapper>
        </Overlay>
      ),
  )
}

export default Modal

const Overlay = styled({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'var(--theme-overlay)',
  '&.has-appmenu': {
    paddingLeft: 'var(--w-menu)',
  },
  '@media (max-width: 768px)': {
    '&.has-appmenu': {
      paddingLeft: 0,
    },
  },
}).withComponent(animated.div)

const ModalWrapper = styled(animated.div)({
  border: '2px solid var(--theme-brand)',
  borderRadius: 8,
  backgroundColor: 'var(--theme-main)',
  boxShadow: '0px 5px 16px rgba(35, 131, 197, 0.1)',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    width: '90%',
  },
})
