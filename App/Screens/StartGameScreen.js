import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

//File import
import Card from "../components/Card";
import Colors from "../utils/constants/colors";
import Input from "../components/Input";
import NumberView from "../components/NumberView";
import MainButton from "../components/PlatformSpecificFile/MainButton";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setIsSelectedNumber] = useState("");
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 3
  );

  let confirmedOutput;

  const inputNumberHandler = (enterNumber) => {
    setEnteredNumber(enterNumber.replace(/[^0-9]/g, ""));
  };

  const removeKeyboard = () => {
    Keyboard.dismiss();
  };

  const removeHandler = () => {
    setEnteredNumber("");
    setIsConfirmed(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Guess Number",
        "Number has to be a number between 1 to 99.",
        [{ text: "Ok", style: "destructive", onPress: removeHandler }]
      );

      return;
    }

    setIsConfirmed(true);
    setIsSelectedNumber(parseInt(chosenNumber));
    setEnteredNumber("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    const changeOrientations = () => {
      setButtonWidth(Dimensions.get("window").width / 3);
    };
    Dimensions.addEventListener("change", changeOrientations);
    return () => {
      Dimensions.removeEventListener("change", changeOrientations);
    };
  });

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summeryContainer}>
        <Text>You selected</Text>
        <View>
          <NumberView>{selectedNumber}</NumberView>
        </View>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          {"Start Game"}
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={40}>
        <TouchableWithoutFeedback onPress={removeKeyboard}>
          <View style={styles.Screen}>
            <Text style={styles.textContainer}> Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text>Enter a number</Text>
              <Input
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={inputNumberHandler}
                value={enteredNumber}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="RESET"
                    onPress={removeHandler}
                    color={Colors.secondary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="CONFIRM"
                    onPress={confirmHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },

  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "90%",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  textContainer: {
    fontSize: 20,
    color: Colors.black,
    marginVertical: 10,
  },

  /*button: {
    width: Dimensions.get("window").width / 3,
    //width: 100,
    marginTop: 5,
  }, */

  input: {
    width: 50,
    textAlign: "center",
  },

  summeryContainer: {
    marginVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartGameScreen;
