import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";

export default function Chart() {
  const recordChart = useMainStore((state) => state.recordChart);
  return (
    <>
      {recordChart.length != 0 && (
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Mood Chart</Text>
          
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: recordChart,
                },
              ],
            }}
            width={Dimensions.get("window").width - 32} // from react-native
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#6a3093",
              backgroundGradientFrom: "#9370DB", // Medium Purple
              backgroundGradientTo: "#6A5ACD", // Slate Blue
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#6a3093",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 10,
            }}
          />
        </View>
      )}
    </>
  );
}
