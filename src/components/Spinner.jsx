const Spinner = ({ isVisible }) => {
  return (
    isVisible && (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  )
}

export default Spinner
