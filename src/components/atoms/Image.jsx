import React from 'react'

export default Image = ({ src, alt, width, height, className, style, onClick }) => {
  return <img src={src} alt={alt} width={width} height={height} className={className} style={style} onClick={onClick} />
}
