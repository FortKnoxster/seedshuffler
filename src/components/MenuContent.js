import styled from '@emotion/styled/macro'

const MenuContent = ({ children, isVisible }) => {
  return <Container className={isVisible ? 'open' : ''}>{children}</Container>
}

export default MenuContent

const Container = styled.div({
  display: 'none',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  '&.open': {
    display: 'block',
    //transition: 'all 12.5s ease-in-out',
    //height: '100%',
  },
})
