import { CreateAccountForm } from "@/components/auth";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

export default function CreateAccount() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <CreateAccountForm />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
