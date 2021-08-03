import {RootStackParamList} from "../../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback} from "react";
import {RouteProp} from "@react-navigation/native";
import {TouchableOpacity, StyleSheet, View, Text} from "react-native";
import {Icon} from "react-native-elements";

interface Props {
    route: RouteProp<RootStackParamList, "Budget Details">;
    navigation: StackNavigationProp<RootStackParamList>;
    title?: string;
}

export const HeaderDropdown = (props: Props) => {
    const toggleDropdownVisibility = useCallback(() => {
        const isDropdownVisible = props.route.params?.isHeaderDropdownVisible
        props.navigation.setParams({
            ...props.route.params,
            isHeaderDropdownVisible: !isDropdownVisible,
        });
    }, [props.route, props.navigation]);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleDropdownVisibility}
        >
            <View style={styles.textWrap}>
                <Text style={styles.text}>{props.title}</Text>
                <View style={styles.iconWrap}>
                    <Icon
                        name={props.route.params?.isHeaderDropdownVisible ? "chevron-up" : "chevron-down"}
                        type="material-community"
                        color="rgba(255, 255, 255, 0.7)"
                        size={14}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconWrap: {
        marginTop: 2,
        marginLeft: 3
    }
});
