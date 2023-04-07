import styled from "styled-components";
import { circleBtnProps } from "../core/interfaces/componentsProps";
const colors = require('../core/constants/colorPalette')


export const AddMoreBtn = styled.button(() => ({
    width:'100%',
    color:colors.secondary,
    backgroundColor:colors.primary,
}))

export const CircleBtn = styled.button((props:circleBtnProps) => {
    const {backgroundColor, isSelectingColor} = props
    return ({
        borderRadius:'50%',
        color:'white',
        backgroundColor
    })
})