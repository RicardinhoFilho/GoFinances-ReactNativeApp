import React, { useState, useEffect } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Button } from "../../Components/Forms/Button";
import { CategorySelectButton } from "../../Components/Forms/CategorySelectButton";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { InputForm } from "../../Components/Forms/ImputForm";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { TransactionTypeButton } from "../../Components/Forms/TransactionTypeButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("Informe um valor númerico"),
});

export function Register() {
  const { user } = useAuth();
  const dataKey = `@gofinances:transactions_user:${user.id}`;
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("up");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigation = useNavigation();

  const handleTransactionTypeSelect = (option: "up" | "down") => {
    setTransactionType(option);
  };

  const handleOpenSelectCategory = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação!");
    if (category.key === "category")
      return Alert.alert("Selecione uma categoria!");

    const newData = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType === "up" ? "positive" : "negative",
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert(`Não foi possivel salvar ${newData.name}`);
    }
  };

  //  useEffect(() => {
  //    const getData = async () => {
  //      const data = await AsyncStorage.getItem(dataKey);
  //      console.log(JSON.parse(data!));
  //    };
  //   const deleteData = async () => {
  //       const data = await AsyncStorage.removeItem(dataKey);
  //     };
  //     deleteData();
  //  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === "up"}
                onPress={() => {
                  handleTransactionTypeSelect("up");
                }}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                isActive={transactionType === "down"}
                onPress={() => {
                  handleTransactionTypeSelect("down");
                }}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>
          <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
