const Catdtl = (props) => {

  if (props.id === undefined) {
    return (
      <>
        <h3>details</h3>
        <p>nothing to show</p>
      </>
    )
  }
  else {
    return (
      <>
        <h3>details</h3>
        <p>id: {props.id}, name: {props.name}</p>
      </>
    )
  }
}

export default Catdtl
