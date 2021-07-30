import {Icon} from "react-native-elements";
import React from "react";

interface Props {
    name: string;
}

export const HeaderButton = (props: Props) => (
    <Icon
        name={props.name}
        color="white"
    />
)
