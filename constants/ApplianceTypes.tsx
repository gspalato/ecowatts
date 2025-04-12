import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const APPLIANCES = [
  {
    name: "Televisão",
    icon: (props: any) => (
      <Ionicons name="tv" size={24} color="black" {...props} />
    ),
    type: "television",
    displayName: "Televisão",
  },
  {
    name: "Geladeira",
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="fridge-variant"
        size={24}
        color="black"
        {...props}
      />
    ),
    type: "refrigerator",
    displayName: "Geladeira",
  },
  {
    name: "Microondas",
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="microwave"
        size={24}
        color="black"
        {...props}
      />
    ),
    type: "microwave",
    displayName: "Microondas",
  },
  {
    name: "Roteador",
    icon: (props: any) => (
      <MaterialIcons name="router" size={24} color="black" {...props} />
    ),
    type: "router",
    displayName: "Roteador",
  },
  {
    name: "Máquina de Café",
    icon: (props: any) => (
      <MaterialIcons name="coffee-maker" size={24} color="black" {...props} />
    ),
    type: "coffee-machine",
    displayName: "Máquina de Café",
  },
];
