const Square = ({ children, isSelected, updateBoard, index }) => {
  const squareSelected = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={squareSelected}>
      {children}
    </div>
  )
}

export { Square }
