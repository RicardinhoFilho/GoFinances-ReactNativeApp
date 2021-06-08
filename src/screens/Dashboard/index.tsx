import React, { useState, useEffect, useCallback } from "react";
import { HighlightCard } from "../../Components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
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

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        console.log("ee", item.amount);
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = new Date(item.date);
        const dateFormated = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        console.log(item);
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

    setData(transactionsFormated);
    console.log("testeadsadsasd", data);
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

 useFocusEffect(useCallback(()=>{
   loadTransactions();
 },[]));

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
          amount={"R$ 17.400,00"}
          lastTransaction={"Última entrada dia 13 de abril"}
          type={"up"}
        />
        <HighlightCard
          title={"Saídas"}
          amount={"R$ 1.259,00"}
          lastTransaction={"Última saída dia 03 de abril"}
          type={"down"}
        />
        <HighlightCard
          title={"Entradas"}
          amount={"R$ 16.141,00"}
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
