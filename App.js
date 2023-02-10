import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from "react-native"

const Width = Dimensions.get('window').width;

export default App = () => {
    const [quote, setQuote] = useState({
        quote: "Press the Get Quote button for quotes.",
        character: "Developer"
    })
    const [loading, setLoading] = useState(false)

    const fetchQuote = async () => {
        setQuote(null)
        setLoading(true)
        await fetch("https://animechan.vercel.app/api/random")
            .then(response => response.json())
            .then(data => setQuote(data))
            .catch(error => console.log(error))
        setLoading(false)
    }

    return (
        <ImageBackground source={require("./assets/bg.jpg")} resizeMode="cover" style={styles.image}>
            <View style={styles.quoteContainer}>
                {
                    loading ? <ActivityIndicator color={"#fff"} /> : null
                }
                {
                    quote ? <Text style={styles.quote}>
                        {quote.quote} -{quote.character}
                    </Text>
                        : null
                }
            </View>
            <TouchableOpacity onPress={fetchQuote} style={styles.button}>
                <Text style={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
                    Get Quote
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    quoteContainer: {
        width: Width * 0.9,
        minHeight: 125,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    quote: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: "orangered",
        marginTop: 24,
    }
})


