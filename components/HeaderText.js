import React from 'react'
import { Text, StyleSheet } from 'react-native'

function HeaderText(props) {
    return (
        <Text style={styles.headerText}>
            {props.text}
        </Text>
    )
}

export default HeaderText;

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20
    }
})