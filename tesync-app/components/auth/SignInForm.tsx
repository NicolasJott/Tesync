import { Link } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Button, Heading, Input, Label, Text, View, YStack } from "tamagui";
import * as yup from "yup";

interface IFormData {
  email: string;
  password: string;
}

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = () => {
  const initialValues: IFormData = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: IFormData) => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isvalid,
      }: any) => (
        <YStack margin={"$10"} gap={"$6"}>
          <Heading size={"$9"}>Sign In</Heading>
          <YStack gap={"$2"}>
            <View>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                br={4}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text color="$red11" mt={"$1"}>
                  {errors.email}
                </Text>
              )}
            </View>
            <View>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                br={4}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && (
                <Text color="$red11" mt={"$1"}>
                  {errors.password}
                </Text>
              )}
            </View>
          </YStack>
          <Text>
            Don't have an account?{" "}
            <Link
              href={"/create-account"}
              style={{ color: "#3457b1", textDecorationLine: "underline" }}
            >
              Create Account
            </Link>
          </Text>
          <Button
            bg={"#3e6ae1"}
            br={4}
            w={"100%"}
            size={"$5"}
            color={"#F2F2F2"}
            pressStyle={{ bg: "#3457b1" }}
            onPress={handleSubmit}
            disabled={!isvalid}
          >
            Sign In
          </Button>
        </YStack>
      )}
    </Formik>
  );
};
