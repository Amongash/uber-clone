import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
	{
		id: "Uber-X",
		title: "UberX",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https://links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

const SURGE_CHARGE_RATE = 40;

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("NavigateCard")}
					style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					Select a Ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>

			<View>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item: { id, title, multiplier, image }, item }) => (
						<TouchableOpacity
							onPress={() => setSelected(item)}
							style={tw`flex-row justify-between items-center px-10 ${
								id === selected?.id && "bg-gray-200"
							}`}
						>
							<Image
								style={{ width: 80, height: 70, resizeMode: "contain" }}
								source={{
									uri: image,
								}}
							/>
							<View style={tw`-ml-6`}>
								<Text style={tw`text-xl font-semibold`}>{title}</Text>
								<Text>{travelTimeInformation?.duration?.text}</Text>
							</View>
							<Text style={tw`text-xl`}>
								{new Intl.NumberFormat("en-gb", {
									style: "currency",
									currency: "KES",
								}).format(
									(travelTimeInformation?.duration?.value *
										SURGE_CHARGE_RATE *
										multiplier) /
										100
								)}
							</Text>
						</TouchableOpacity>
					)}
				/>

				<View>
					<TouchableOpacity
						disbaled={!selected}
						style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
					>
						<Text style={tw`text-center text-white text-xl`}>
							Choose {selected?.title}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
