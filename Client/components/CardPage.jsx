import { ImageBackground, View } from "react-native";
import { Card, Text, IconButton, MD3Colors } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function CardPage({ item, index }) {
    const serverUrl = useMainStore((state) => state.serverUrl);

    const [sound, setSound] = useState();
    const playSound = async () => {
        const urlMusic = `${serverUrl}/public/music/${item?.voiceFile}`;
        console.log(urlMusic);
        const { sound } = await Audio.Sound.createAsync({ uri: urlMusic });
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return sound
            ? () => {
                  console.log("Unloading Sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    return (
        <>
            {index === 1 && item !== undefined ? (
                <Card style={styles.card}>
                    <ImageBackground
                        source={{
                            uri: "https://images.unsplash.com/photo-1472149110793-7aa262859995?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8MTk3NzMwMnx8ZW58MHx8fHx8"
                        }}
                        style={styles.imageBackground}>
                        <Card.Content style={{ width: 345, height: 170 }}>
                            <View style={styles.textContainer}>
                                <Text variant="bodyMedium" style={{ paddingTop: 10, color: "white" }}>
                                    {item?.response}
                                </Text>
                            </View>
                        </Card.Content>
                    </ImageBackground>
                </Card>
            ) : (
                <Card style={styles.card}>
                    <ImageBackground
                        source={{
                            uri: "https://images.unsplash.com/photo-1472149110793-7aa262859995?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8MTk3NzMwMnx8ZW58MHx8fHx8"
                        }}
                        style={styles.imageBackground}>
                        <Card.Content style={{ width: 345, height: 170 }}>
                            <View style={styles.textContainer}>
                                <Text style={{ letterSpacing: 1, fontSize: 20, fontWeight: "600" }}>Quote</Text>
                                <Text variant="bodyMedium" style={{ paddingTop: 10, color: "white" }}>
                                    {item?.quote}
                                </Text>
                            </View>
                            <View style={{ width: "auto" }}>
                                <IconButton
                                    icon="play-circle-outline"
                                    iconColor={MD3Colors.error99}
                                    size={27}
                                    onPress={playSound}
                                    style={{ alignSelf: "flex-end" }}
                                />
                            </View>
                        </Card.Content>
                    </ImageBackground>
                </Card>
            )}
        </>
    );
}

const styles = {
    card: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        margin: 16
    },
    imageBackground: {
        resizeMode: "cover",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 3)"
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    }
};
