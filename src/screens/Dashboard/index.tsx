import React from "react";
import { HighlightCard } from "../../Components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";

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
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      title: "Desenvolvimento de Site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
      type: "positive",
    },
    {
      id: "2",
      title: "Pizza",
      amount: "R$ 300,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "13/04/2020",
      type: "negative",
    },
    {
      id: "3",
      title: "Aluguel",
      amount: "R$ 2.000,00",
      category: { name: "Casa", icon: "shopping-bag" },
      date: "13/04/2020",
      type: "negative",
    },
  ];

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
          <Icon name="power" />
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
