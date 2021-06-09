import React, { useState, useEffect, useCallback } from "react";

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
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

function lastTransaction(
  transactions: DataListProps[],
  option: "positive" | "negative" | "total"
): string {
  if (option === "total") {
    const last = new Date(
      Math.max.apply(
        Math,
        transactions.map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    const first = new Date(
      Math.min.apply(
        Math,
        transactions.map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${first.getDate()} à ${last.getDate()} de ${last.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  const date = new Date(
    Math.max.apply(
      Math,
      transactions
        .filter((transaction: DataListProps) => transaction.type === option)
        .map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
    )
  );

  return `Última ${
    option === "positive" ? "entrada" : "saída"
  } dia ${date.getDate()} de ${date.toLocaleString("pt-BR", {
    month: "long",
  })}`;
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

    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expenseSum = 0;
    const transactionsFormated = transactions.map((item: DataListProps) => {
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
    });

    const lastTransactionEntries = lastTransaction(transactions, "positive");
    const lastTransactionExpense = lastTransaction(transactions, "negative");
    const totalInterval = lastTransaction(transactions, "total");

    setHighlightData({
      entries: {
        total: entriesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),

        lastTransaction: lastTransactionEntries,
      },
      expensives: {
        total: expenseSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionExpense,
      },
      total: {
        total: (entriesSum - expenseSum).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setData(transactionsFormated);
    setLoading(false);
  }

  useEffect(() => {
    loadTransactions();
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
          lastTransaction={highlightData.entries.lastTransaction}
          type={"up"}
        />
        <HighlightCard
          title={"Saídas"}
          amount={highlightData.expensives.total}
          lastTransaction={highlightData.expensives.lastTransaction}
          type={"down"}
        />
        <HighlightCard
          title={"Total"}
          amount={highlightData.total.total}
          lastTransaction={highlightData.total.lastTransaction}
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
