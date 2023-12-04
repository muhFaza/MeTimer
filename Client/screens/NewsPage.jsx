import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Card, Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsCard from "../components/NewsCard";

export default function NewsPage() {
  const news = [
    {
      title:
        "Minister warned about mental pressure of benefits system after applicant kills himself",
      content:
        "A coroner has written to work and pensions secretary Mel Stride warning that the workings of the benefit system can worsen symptoms of mental illness, after a man killed himself amid fears over his application for universal credit.",
      image:
        "https://i.guim.co.uk/img/media/c8a915c1f1ad67b65df2e83a268d49186b9f2c9a/0_387_6192_3715/master/6192.jpg?width=620&dpr=2&s=none",
      link: "https://www.theguardian.com/society/2023/nov/18/minister-warned-about-mental-pressure-of-benefits-system-after-applicant-kills-himself",
    },
    {
      title: "TV soap actress: I was sexually assaulted as a child",
      content:
        "An actress in Welsh-language TV soap Pobol y Cwm has said she was sexually assaulted as a young child. Sera Cracroft, who plays Eileen Probert in the S4C drama, said she was sharing her story to help others.",
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/6FDB/production/_131753682_pobl.jpg.webp",
      link: "https://www.bbc.com/news/uk-wales-67448424",
    },
    {
      title: "More illness among young affecting work ability",
      content:
        'Millions of workers in the UK are struggling with ill-health that is affecting their ability at work. The Health Foundation analysis found 12% of people in work - 3.7 million - had a "work-limiting" condition.',
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/DCC2/production/_129741565_illness_index1_getty.jpg.webp",
      link: "https://www.bbc.com/news/health-67443189",
    },
    {
      title: "'Much needed' Swindon mental health unit given go ahead",
      content:
        'A specialist mental health unit has received permission to build an extension which will be used as a calming space for patients. The "much-needed" unit at Marlborough House in Swindon will offer a "low-stimulus environment" for distressed patients to recover in.',
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/465E/production/_131741081_marlboroughhouse.jpg.webp",
      link: "https://www.bbc.com/news/uk-england-wiltshire-67437653",
    },
    {
      title: "Berkshire: Waiting list for No5 counselling trebled since 2020",
      content: `About 1,000 young people are currently waiting for counselling after a charity's wait time more than trebled since 2020. Berkshire mental health charity No5 said increased awareness, Covid and the cost of living crisis all contributed to increase demand for its services.`,
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/D6DC/production/_131740055_c0b0ea73e0a7c7595ad41961294ad7feea37f02b.jpg.webp",
      link: "https://www.bbc.com/news/uk-england-berkshire-67436941",
    },
    {
      title: "Birmingham mental health patient sent home before flat fall",
      content: `A man who jumped out of the window of his flat while believing "he could fly" had been sent home three times by mental health services. Lion Allamby's family said they were concerned it could happen, despite him posing a danger to himself and others.`,
      image:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/F9B5/production/_131652936_lion.jpg.webp",
      link: "https://www.bbc.com/news/uk-england-birmingham-67359213",
    },
  ];
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.newsTopText}>News Section</Text>

        {news.map((el, index) => {
          return <NewsCard key={index + "news"} news={el} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newsTopText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
});
