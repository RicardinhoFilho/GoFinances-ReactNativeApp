import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";

import { HighlightCard } from "../../Components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  LoadContainer,
  Loader,
  Container,
  Header,
  HighlightCards,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expenseSum = 0;
    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        if (item.type === "positive") {
          entriesSum += Number(item.amount);
        }

        if (item.type === "negative") {
          expenseSum += Number(item.amount);
        }
        const date = new Date(item.date);
        const dateFormated = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount: amount,
          type: item.type,
          category: item.category,
          date: dateFormated,
        };
      }
    );
    setHighlightData({
      entries: {
        total: entriesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        total: expenseSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        total: (entriesSum - expenseSum).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    setData(transactionsFormated);
    setLoading(false)
  }

  useEffect(() => {
    loadTransactions();
    // const getData = async () => {
    //   const data = await AsyncStorage.getItem("@gofinances:transactions");
    //   console.log(JSON.parse(data!));
    // };
    // const deleteData = async () => {
    //   const data = await AsyncStorage.removeItem("@gofinances:transactions");
    // };
    // //deleteData()
    // getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  if (loading) {
    return (
      <LoadContainer>
        <Loader />
      </LoadContainer>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/74803287?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Ricardo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title={"Entradas"}
          amount={highlightData.entries.total}
          lastTransaction={"Última entrada dia 13 de abril"}
          type={"up"}
        />
        <HighlightCard
          title={"Saídas"}
          amount={highlightData.expensives.total}
          lastTransaction={"Última saída dia 03 de abril"}
          type={"down"}
        />
        <HighlightCard
          title={"Total"}
          amount={highlightData.total.total}
          lastTransaction={"01 à 16 de abril"}
          type={"total"}
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
