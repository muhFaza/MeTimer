import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput as PaperInput,
  Button as PaperButton,
  DefaultTheme,
} from "react-native-paper";
import Validator from "../helper/validators";
import { useMainStore } from "../stores/mainStore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const login = useMainStore((state) => state.login);
  const loading = useMainStore((state) => state.loading);
  const specialSetter = useMainStore((state) => state.specialSetter);
  const [loginError, setLoginError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onLoginPressed = async () => {
    specialSetter("loading", true);
    const emailError = Validator.emailValidator(email.value);
    const passwordError = Validator.passwordValidator(password.value);
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    if (emailError || passwordError) {
      specialSetter("loading", false);
      return;
    }

    try {
      await login({
        email: email.value,
        password: password.value,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "LandingPageTabs" }],
      });
      setLoginError("");
      // Alert.alert("Login successful.");
    } catch (error) {
      console.log(error);
      // Alert.alert("Error", error.response.data.message);
      setLoginError(error.response.data.message);
    } finally {
      specialSetter("loading", false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container_bg} behavior="adjustPan">
      <Text style={styles.header}>Welcome back.</Text>

      {/* EMAIL INPUT */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ ...email, value: text })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        {email.error ? (
          <Text style={styles.description}>{email.error}</Text>
        ) : null}
      </View>

      {/* PASSWORD INPUT */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ ...password, value: text })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!passwordVisible}
          onSubmitEditing={onLoginPressed}
          right={
            <PaperInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        {password.error ? (
          <Text style={styles.error}>{password.error}</Text>
        ) : null}
      </View>

      {/* ERROR TEXT */}
      {loginError ? <Text style={styles.errorLogin}>{loginError}</Text> : null}

      {/* LOGIN BUTTON */}
      <PaperButton
        style={[styles.button]}
        labelStyle={styles.text}
        mode={"contained"}
        onPress={onLoginPressed}
        disabled={loading}
        loading={loading}
      >
        Login
      </PaperButton>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignupPage")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
    color: DefaultTheme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: DefaultTheme.colors.primary,
  },
  header: {
    fontSize: 21,
    color: DefaultTheme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  button: {
    width: "100%",
    marginVertical: 14,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  container: {
    width: "100%",
    marginVertical: 8,
  },
  container_bg: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: DefaultTheme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: DefaultTheme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
  },
  errorLogin: {
    marginLeft: 3,
    fontSize: 13,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: DefaultTheme.colors.surface,
  },
});
