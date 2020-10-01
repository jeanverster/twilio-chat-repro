import { Buffer } from "buffer";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Client from "twilio-chat";

global.Buffer = Buffer; // very important

const ngrokConfiguration = require("./config.json").ngrok;
const tokenHost = "https://" + ngrokConfiguration.subdomain + ".ngrok.io";
const tokenBasicAuth = ngrokConfiguration.basicAuth;

export default function App() {
  const identity = "jean@sovtech.com";

  const headers = new Headers({
    Authorization: `Basic ${Buffer.from(
      `${tokenBasicAuth.username}:${tokenBasicAuth.password}`
    ).toString("base64")}`,
  });

  React.useEffect(() => {
    async function init() {
      const res = await fetch(`${tokenHost}/token?identity=${identity}`, {
        headers,
      });
      const token = await res.text();
      try {
        const client = await Client.create(token);
        console.log("init -> client", client);
      } catch (error) {
        console.log("init -> error", error);
      }
    }
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
