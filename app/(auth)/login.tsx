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

const LoginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Must be valid email")
    .required("Email required"),
  password: Yup.string().required("Password Required"),
});




type LoginValues = {
  email: string;
  password: string;
};

function getFirebaseError(error: unknown) {
  if (
    typeof error === "object" &&
    error != null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Email used is invalid";
      case "auth/invalidcredentials":
        return "Email or Password used are incorrect";
      case "auth/user-not-found":
        return "No account registered under email";
      case "auth/wrong-password":
        return "Email or Password used are incorrect";
      case "auth/too-many-requests":
        return "tried to login too many times. Try again later";
      default:
        return "Login failed, please try again";
    }
  }
  return "Login failed, please try again";
}

export default function LoginScreen() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(values: LoginValues) {
    setServerError(null);

    try {
      await login(values.email, values.password);
    } catch (err) {
      setServerError(getFirebaseError(err));
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back!!</Text>
          <Text style={styles.subtitle}>Please Sign-in</Text>

          <Formik<LoginValues>
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <View>
                <View style={styles.card}>
                  <Text>Email:</Text>
                  <TextInput
                    style={styles.inputBorder}
                    placeholder="example@gmail.com"
                    autoCorrect={false}
                    autoCapitalize="none"
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
                  <Text>Password:</Text>
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

                {serverError ? (
                  <Text style={styles.errorRed}>{serverError}</Text>
                ) : null}

                <View>
                  <Pressable
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                      <ActivityIndicator color={"#fff"} />
                    ) : (
                      <Text style={styles.textBold}>Sign-in</Text>
                    )}
                  </Pressable>
                </View>

                <Text style={[styles.subtext, styles.card]}>
                  If you do not have an account.{" "}
                  <Link
                    href="/(auth)/register"
                    style={[styles.linktext, styles.subtext]}
                    >
                    Click here to register
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
  
  card: { 
    padding: 10, 
    gap: 8 },
  
  button: {
    borderRadius: 5,
    alignSelf: "center",
    padding: 8,
    backgroundColor:colors.secondary_orange,
    alignItems: "center",
    minWidth: 100,
  },

  title: { 
    color: colors.main_nav,
    fontSize: 24, 
    fontWeight: "bold" },

  subtitle: { color: colors.main_nav,fontSize: 18, fontWeight: "bold" },
  subtext: { fontSize: 11 },
  linktext: { color: "#7595B0", textDecorationLine: "underline" },

  inputBorder: { 
    borderWidth: 1, 
    borderColor: colors.main_nav, 
    padding: 10, 
    borderRadius: 5 },

  textBold: { fontWeight: "bold" },
  errorRed: { color: "#f55" },
});
