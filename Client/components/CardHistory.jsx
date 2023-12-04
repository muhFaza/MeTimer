import { Card, Chip } from "react-native-paper";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import moodsRatingInitial from "../data/moodsRatingInitial";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export default function CardHistory({ data }) {
    console.log(data, "ini data cardhist");
    const navigation = useNavigation();
    const navigateToDetailRecord = () => {
        navigation.navigate("DetailRecord", { id: data._id });
    };
    function formatDate(date) {
        const now = new Date();
        const inputDate = new Date(date);
        const diffInDays = Math.round((now - inputDate) / (1000 * 60 * 60 * 24));
        const diffInMonths = now.getMonth() - inputDate.getMonth() + 12 * (now.getFullYear() - inputDate.getFullYear());
        let hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = hours < 10 ? "0" + hours : hours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

        if (diffInDays === 0) {
            return `Today, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
        } else if (diffInDays === 1) {
            return `Yesterday, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
        } else if (diffInDays < 30) {
            const diffInWeeks = Math.round(diffInDays / 7);
            return `${diffInWeeks} weeks ago, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
        } else {
            return `${diffInMonths} months ago, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
        }
    }

    return (
        <Pressable onPress={navigateToDetailRecord}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.cardContentWrapper}>
                        <View style={{ width: "15%" }}>
                            <MaterialCommunityIcons
                                name={moodsRatingInitial[data.rateMood - 1].emote}
                                size={50}
                                color={moodsRatingInitial[data.rateMood - 1].color}
                            />
                        </View>
                        <View style={{ flexDirection: "column", width: "80%", marginLeft: 10 }}>
                            <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: "bold" }}>
                                {data.Journal[0].title}
                            </Text>
                            <Text numberOfLines={2} style={{ fontSize: 12, alignSelf: "flex-start" }}>
                                {data.Journal[0].content}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardFooter}>
                        <ScrollView style={styles.chipScroll} horizontal>
                            {data.moods.map((el, index) => {
                                return (
                                    <Chip key={index + "chip"} style={{ marginRight: 5 }}>
                                        {el}
                                    </Chip>
                                );
                            })}
                        </ScrollView>
                        <Text style={{ fontSize: 15, textAlign: "right" }}>{formatDate(data.date)}</Text>
                    </View>
                </Card.Content>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardFooter: {
        flexDirection: "row"
    },
    chipScroll: {
        width: "55%",
        marginRight: 7
    },
    card: {
        backgroundColor: "#ffffff",
        width: "100%",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5
    },
    cardContentWrapper: {
        flexDirection: "row",
        // justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10
    }
});
