import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../Components/HistoryCard";

import { categories } from "../../Utils/categories";
import { FlatList } from "react-native";

import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, Title, Content, ChartContent } from "./styles";

interface ITransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];
    const totalByCategory: CategoryData[] = [];
    const expensives = responseFormated.filter(
      (expensive: ITransactionData) => expensive.type === "negative"
    );
    const expensivesTotal: number = expensives.reduce(
      (acc: number, expensive: ITransactionData) => {
        return acc + Number(expensive.amount);
      },
      0
    );

    console.log(expensivesTotal);

    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: ITransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-Br", {
          style: "currency",
          currency: "BRL",
        });

        const percent = categorySum / expensivesTotal;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormated: total,
          percent: percent,
          percentFormatted: `${(percent * 100).toFixed(0)}%`,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    console.log(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <Content>
        <ChartContent>
          <VictoryPie
            data={totalByCategories}
            x="percentFormatted"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: { fontSize: RFValue(18), fontWeight: "bold", fill:'white' },
            }}
            labelRadius={RFValue(50)}
            height={300}
            
          />
        </ChartContent>
        <FlatList
          data={totalByCategories}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <HistoryCard
              title={item.name}
              amount={item.totalFormated}
              color={item.color}
            />
          )}
        />
      </Content>
    </Container>
  );
}
