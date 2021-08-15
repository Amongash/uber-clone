import React from "react";
import { Image, StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { GOOGLE_MAPS_API_KEY } from "@env";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{ width: 80, height: 80, resizeMode: "contain" }}
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder="Where From?"
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					returnkeyType={"search"}
					enablePoweredByContainer={false}
					minLength={2}
					styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
					query={{ key: GOOGLE_MAPS_API_KEY, language: "en" }}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
