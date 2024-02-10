import { Link } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Button, Heading, Input, Label, Text, View, YStack } from "tamagui";
import * as yup from "yup";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const CreateAccountForm = () => {
  const initialValues: IFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        isValid,
        errors,
      }: any) => (
        <YStack margin={"$10"} gap={"$6"}>
          <Heading size={"$9"}>Create Account</Heading>
          <YStack gap={"$2"}>
            <View>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                br={4}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
              {errors.firstName && (
                <Text color="$red11" mt={"$1"}>
                  {errors.firstName}
                </Text>
              )}
            </View>
            <View>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                br={4}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
              {errors.lastName && (
                <Text color="$red11" mt={"$1"}>
                  {errors.lastName}
                </Text>
              )}
            </View>

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
            <View>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                br={4}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text color="$red11" mt={"$1"}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </YStack>
          <Text>
            {" "}
            Already have an account?{" "}
            <Link
              href={"/sign-in"}
              style={{ color: "#3457b1", textDecorationLine: "underline" }}
            >
              Sign In
            </Link>
          </Text>
          <Button
            bg={"#3e6ae1"}
            br={4}
            w={"100%"}
            size={"$5"}
            color={"#F2F2F2"}
            pressStyle={{ bg: "#3457b1" }}
            disabled={!isValid}
            onPress={handleSubmit}
          >
            Create Account
          </Button>
        </YStack>
      )}
    </Formik>
  );
};
