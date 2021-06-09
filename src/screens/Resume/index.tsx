import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../Components/HistoryCard";

import { categories } from "../../Utils/categories";

import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContent,
  MonthSelector,
  SelectIcon,
  MonthSelectorButton,
  Month,
  LoadContainer,
  Loader,
} from "./styles";

import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  async function loadData() {
    setLoading(true);
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];
    const totalByCategory: CategoryData[] = [];
    const expensives = responseFormated.filter(
      (expensive: ITransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
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
    setLoading(false);
    //console.log(totalByCategory);
  }
  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    }
    if (action === "prev") {
      setSelectedDate(subMonths(selectedDate, 1));
    }

    //console.log(selectedDate)
  }
  useEffect(() => {
    loadData();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      setSelectedDate(new Date());
      loadData();
    }, [])
  );

  if (loading) {
    return (
      <>
        <Header>
          <Title>Resumo</Title>
        </Header>
        <LoadContainer>
          <Loader />
        </LoadContainer>
      </>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: useBottomTabBarHeight(),
          paddingHorizontal: RFValue(24),
        }}
      >
        <MonthSelector>
          <MonthSelectorButton>
            <SelectIcon
              name="chevron-left"
              onPress={() => handleDateChange("prev")}
            />
          </MonthSelectorButton>

          <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>

          <MonthSelectorButton onPress={() => handleDateChange("next")}>
            <SelectIcon name="chevron-right" />
          </MonthSelectorButton>
        </MonthSelector>
        <ChartContent>
          <VictoryPie
            data={totalByCategories}
            x="percentFormatted"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: "white",
              },
            }}
            labelRadius={RFValue(50)}
            height={RFValue(400)}
          />
        </ChartContent>
        {totalByCategories.map((item) => (
          <HistoryCard
            title={item.name}
            amount={item.totalFormated}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
