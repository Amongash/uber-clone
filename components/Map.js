import React, { useCallback, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import MapViewDirections from "react-native-maps-directions";
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from "../slices/navSlice";
import { GOOGLE_MAPS_API_KEY } from "@env";
import mapStyle from "../config/mapStyle.json";
const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;
		markersRef(mapRef.current);
	}, [origin, destination]);

	const markersRef = useCallback((node) => {
		if (node !== null) {
			node.fitToSuppliedMarkers(["origin", "destination"], {
				animated: true,
				edgePadding: {
					top: 50,
					bottom: 50,
					right: 50,
					left: 50,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`
			)
				.then((res) => res.json())
				.then((data) => {
					dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
				});
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_API_KEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			onLayout={() => markersRef(mapRef.current)}
			customMapStyle={mapStyle}
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_API_KEY}
					strokeWidth={3}
					strokeColor="black"
					lineDashPattern={[0]}
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Pickup"
					description={origin.description}
					identifier="origin"
				/>
			)}

			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Dropoff"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;
