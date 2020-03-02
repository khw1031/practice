import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function HomeScreen({ route, navigation }) {
  useEffect(() => {
    if (route.params?.post) {
      // post updated, do something with `route.params.post`
      // for example, send the post to the server
      console.log(route.params.post);
    }
  }, [route.params]);
  return (
    <View style={[styles.container]}>
      <Text>Home Screen</Text>
      <Text style={{ color: "#fff" }}>Light Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "something",
          })
        }
      />
      <Button
        title="Update post"
        onPress={() => {
          navigation.setParams({
            post: "wow",
          });
        }}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Update!" })}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { otherParam } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#ecf0f1" }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Details Screen</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {otherParam}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Push Details on Stack"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </SafeAreaView>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "#fff" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // pass params back to home screen
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "Home",
            headerStyle: {
              backgroundColor: "#6a51ae",
            },
            headerTintColor: "#fff",
            headerLeft: () => (
              <Button
                title="Settings"
                color="#fff"
                onPress={() => alert("Settings!")}
              />
            ),
            headerRight: () => (
              <Button
                title="Info"
                color="#fff"
                onPress={() => alert("This is a button!")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42 }}
          options={({ route }) => ({
            headerBackTitle: "GO HOME",
            title: route.params.itemId,
          })}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
