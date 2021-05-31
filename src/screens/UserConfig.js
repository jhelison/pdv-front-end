import React, { useState } from "react"
import { StyleSheet, View, Text, Button } from "react-native"

import commonStyle from "../commonStyle"
import CustomHeader from "../components/customHeader"

import NetworkDiscoverer from "../utils/NetworkDiscoverer"

const networkDiscoverer = new NetworkDiscoverer(40, [5000])

export default (props) => {
    const [results, setResults] = useState([])
    const [checkingDevice, setCheckingDevice] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [newDevice, setNewDevice] = useState()

    const setDefault = () => {
        setCheckingDevice(null)
        setErrorMsg("")
        setLoading(false)
    }

    const getLocalDevices = () => {
        networkDiscoverer.getLocalDevices(
            setResults,
            setCheckingDevice,
            setLoading,
            setErrorMsg,
            setNewDevice,
            setDefault
        )
    }

    const cancelDiscovering = () => {
        networkDiscoverer.cancelDiscovering(setDefault)
    }

    return (
        <View style={styles.mainContainer}>
            <CustomHeader title={"Minhas configurações"} />
            <Button title="wow" onPress={() => {
                setDefault()
                getLocalDevices()
                }} />
            <Button title="cancel" onPress={() => cancelDiscovering()} />
            {results ? results.map((result, index) => {
                return (
                    result && (
                        <View style={styles.item} key={index}>
                            <Text>
                                New device has been found: {result.ipAddress}:
                                {result.port}
                            </Text>
                        </View>
                    )
                )
            }) : null}
            <Text>
                {checkingDevice
                    ? checkingDevice.ipAddress + ":" + checkingDevice.port
                    : null}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: commonStyle.colors.background,
    },
    tittleText: {
        fontFamily: commonStyle.fontFamily,
        fontSize: commonStyle.fontSize.pageTitle * 1.4,
        fontWeight: "bold",
        marginHorizontal: commonStyle.spacers.margin.horizontal,
        marginVertical: commonStyle.spacers.margin.vertical,
    },
})
