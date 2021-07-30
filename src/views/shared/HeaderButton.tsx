import {Icon} from "react-native-elements";
import React from "react";
import {GestureResponderEvent} from "react-native";

interface Props {
    name: string;
    onPress?: (event: GestureResponderEvent) => void;
}

export const HeaderButton = (props: Props) => (
    <Icon
        name={props.name}
        color="white"
        onPress={props.onPress}
    />
)
