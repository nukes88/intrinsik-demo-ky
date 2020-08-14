import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

function ImageWithLoader(props) {

    let [loading, setLoading] = useState(true);

    return (
        <View>
            <Image
                onLoadEnd={() => setLoading(false)}
                style={loading ? styles.loading : props.style}
                source={{
                    uri: props.source
                }}
            />
            <ActivityIndicator
                size={props.loaderSize}
                style={!loading ? styles.loading : null}
            />
        </View>
    )
}

export default ImageWithLoader;

const styles = StyleSheet.create({
    loading: {
        display: 'none'
    }

})