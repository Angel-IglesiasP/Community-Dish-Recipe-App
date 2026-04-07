import { useAuth } from "@/src/context/AuthContext";
import { Link } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import ScreenContainer from "../../components/ScreenContainer";
import { colors } from "../../constants/colors";

const RegisterSchema = Yup.object({
  name: Yup.string().required("Please enter a username"),
  email: Yup.string()
    .trim()
    .email("Please use valid email")
    .required("Valid email required"),
  password: Yup.string().required("Please enter password"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

type RegisterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function getFirebaseErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "That email is already in use.";
      case "auth/invalid-email":
        return "That email address is invalid.";
      case "auth/weak-password":
        return "That password is too weak.";
      default:
        return "Failed to create account. Please try again.";
    }
  }

  return "Failed to create account. Please try again.";
}

export default function RegisterScreen() {
  const { register } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(values: RegisterValues) {
    setServerError(null);

    try {
      await register(values.email, values.password);
    } catch (err) {
      setServerError(getFirebaseErrorMessage(err));
    }
  }

  return (
  <ScreenContainer>

    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Welcome to Community Dish</Text>

        <Formik<RegisterValues>
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <View>
              <View style={styles.card}>
                <Text>Username</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="Create unique name"
                  autoCorrect={false}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  />
                {touched.name && errors.name ? (
                  <Text style={styles.errorRed}>{errors.name}</Text>
                ) : null}
              </View>

              <View style={styles.card}>
                <Text>Email</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="example@gmail.com"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  />
                {touched.email && errors.email ? (
                  <Text style={styles.errorRed}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.card}>
                <Text>Password</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="type password here"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  />
                {touched.password && errors.password ? (
                  <Text style={styles.errorRed}>{errors.password}</Text>
                ) : null}
              </View>

              <View style={styles.card}>
                <Text>Confirm Password</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="Confirm password here"
                  secureTextEntry
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={styles.errorRed}>{errors.confirmPassword}</Text>
                ) : null}
              </View>

              {serverError ? (
                <Text style={styles.errorRed}>{serverError}</Text>
              ) : null}

              <Pressable
                style={styles.button}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                >
                {isSubmitting ? (
                  <ActivityIndicator color="#ddd" />
                ) : (
                  <Text style={styles.textBold}>Register Account</Text>
                )}
              </Pressable>

              <Text style={[styles.subtext, styles.card]}>
                Already have an account.{" "}
                <Link href={"/(auth)/login"} style={styles.linktext}>
                  Click here to return to login page
                </Link>
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  form: { 
    borderWidth: 3,
    borderColor:colors.main_nav,
    gap: 8, 
    padding: 10, 
    borderRadius: 10, 
    backgroundColor: colors.accent },
  
  card: { padding: 10, gap: 8 },
  
  button: {
    borderRadius:5,
    alignSelf: "center",
    padding: 8,
    backgroundColor: colors.secondary_orange,
    alignItems: "center",
    minWidth: 100,
  },

  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, fontWeight: "bold" },
  subtext: { fontSize: 11 },
  linktext: { color: "#7595B0", textDecorationLine: "underline" },

  inputBorder: { 
    borderWidth: 1, 
    borderColor: colors.main_nav, 
    padding: 10,
    borderRadius: 5  },

  textBold: { fontWeight: "bold" },
  errorRed: { color: "#f55" },
});
