import React from "react";
import {RectButton} from 'react-native-gesture-handler';
import {Container, Title} from './style'

interface Props extends RectButton{
    title: string;
    onPress:()=> void;
}

export function Button({ title,onPress,...rest}: Props){
    return(
        <Container onPress={onPress} {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    )
}