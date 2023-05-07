import React from "react"

// viewBox="0 96 960 960"

const DeleteIcon = ({ size, style, onClick }) => (<svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} style={style} viewBox="0 96 960 960" height={size} width={size}><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>)

export default DeleteIcon
