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

export default function SignupPage({ navigation }) {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const register = useMainStore((state) => state.register);
  const [loginError, setLoginError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loading = useMainStore((state) => state.loading);
  const specialSetter = useMainStore((state) => state.specialSetter);

  const onSignUpPressed = async () => {
    specialSetter("loading", true);
    const firstNameError = Validator.firstnameValidator(firstName.value);
    const lastNameError = Validator.lastnameValidator(lastName.value);
    const emailError = Validator.emailValidator(email.value);
    const passwordError = Validator.passwordValidator(password.value);
    setFirstName({ ...firstName, error: firstNameError });
    setLastName({ ...lastName, error: lastNameError });
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });

    // INTERCEPT IF ANY VALIDATION FAILS
    if (firstNameError || lastNameError || emailError || passwordError) {
      specialSetter("loading", false);
      return;
    }
    try {
      await register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Dashboard" }],
      // });
      Alert.alert("Account created successfully. Please login to continue.");
      navigation.replace("LoginPage");
      setLoginError("");
    } catch (error) {
      // Alert.alert("Error", error.response.data.message);
      setLoginError(error.response.data.message);
    } finally {
      specialSetter("loading", false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container_bg} behavior="adjustPan">
      <Text style={styles.header}>Create Account</Text>

      {/* FIRST NAME */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="First Name*"
          returnKeyType="next"
          value={firstName.value}
          onChangeText={(text) => setFirstName({ ...firstName, value: text })}
          error={!!firstName.error}
          errorText={firstName.error}
        />
        {firstName.error ? (
          <Text style={styles.description}>{firstName.error}</Text>
        ) : null}
      </View>

      {/* LAST NAME */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="Last Name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setLastName({ ...lastName, value: text })}
          error={!!lastName.error}
          errorText={lastName.error}
        />
        {lastName.error ? (
          <Text style={styles.description}>{lastName.error}</Text>
        ) : null}
      </View>

      {/* EMAIL */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="Email*"
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

      {/* PASSWORD */}
      <View style={styles.container}>
        <PaperInput
          style={styles.input}
          selectionColor={DefaultTheme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          label="Password*"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ ...password, value: text })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!passwordVisible}
          right={
            <PaperInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        {password.error ? (
          <Text style={styles.description}>{password.error}</Text>
        ) : null}
      </View>

      {/* ERROR TEXT */}
      {loginError ? <Text style={styles.errorLogin}>{loginError}</Text> : null}

      <PaperButton
        mode="contained"
        onPress={onSignUpPressed}
        style={[{ marginTop: 24 }, styles.button]}
        labelStyle={styles.text}
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </PaperButton>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginPage")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  errorLogin: {
    marginLeft: 3,
    fontSize: 13,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
    textAlign: "left",
    alignSelf: "flex-start",
  },
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
    marginVertical: 10,
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
    color: (DefaultTheme.colors.secondary = "red"),
    paddingTop: 5,
  },
  error: {
    fontSize: 13,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: DefaultTheme.colors.surface,
  },
});
