import { applianceTypeMap } from "@/lib/inmetro";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

enum ManualInputFields {
  Label = 0,
  Location = 1,
  Brand = 2,
  Model = 3,
  Power = 4,
  MonthlyPowerConsumption = 5,
  DailyUse = 6,
}

export const APPLIANCES = [
  {
    name: "Televisão",
    icon: (props: any) => (
      <Ionicons name="tv" size={24} color="black" {...props} />
    ),
    type: "television",
    displayName: "Televisão",
    inmetroCode: applianceTypeMap['television'],
    manualInputOnly: false,
    manualInput: {
      only: false,
      fields: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Insira o nome da televisão.",
          attributeTo: "name",
          optional: false,
        },
        {
          label: "Localização",
          type: "text",
          placeholder: "Insira a localização da televisão.",
          attributeTo: "location",
          optional: true,
        },
        {
          label: "Marca",
          type: "text",
          placeholder: "Insira a marca da televisão.",
          attributeTo: "brand",
          optional: true,
        },
        {
          label: "Modelo",
          type: "text",
          placeholder: "Insira o modelo da televisão.",
          attributeTo: "model",
          optional: true,
        },
        {
          label: "Potência de consumo",
          type: "text",
          placeholder: "Insira a potência de consumo da televisão.",
          attributeTo: "powerConsumption",
          optional: false,
        },
        {
          label: "Consumo médio mensal de energia (kWh)",
          type: "text",
          placeholder: "Insira o consumo médio mensal da televisão.",
          attributeTo: "monthlyPowerConsumption",
          optional: true,
        },
        {
          label: "Tempo médio de uso diário",
          type: "text",
          placeholder: "Insira o tempo médio de uso diário da televisão.",
          attributeTo: "dailyUseTime",
          optional: false,
        },
      ],
    },
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
    inmetroCode: applianceTypeMap['fridge'],
    manualInput: {
      only: false,
      fields: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Insira o nome da geladeira.",
          attributeTo: "name",
          optional: false,
        },
        {
          label: "Localização",
          type: "text",
          placeholder: "Insira a localização da geladeira.",
          attributeTo: "location",
          optional: true,
        },
        {
          label: "Consumo médio mensal de energia (kWh)",
          type: "text",
          placeholder: "Insira o consumo médio mensal da geladeira.",
          attributeTo: "monthlyPowerConsumption",
          optional: false,
        },
      ],
    },
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
    inmetroCode: applianceTypeMap['microwave'],
    manualInput: {
      only: false,
      fields: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Insira o nome do microondas.",
          attributeTo: "name",
          optional: false,
        },
        {
          label: "Localização",
          type: "text",
          placeholder: "Insira a localização do microondas.",
          attributeTo: "location",
          optional: true,
        },
        {
          label: "Consumo médio mensal de energia (kWh)",
          type: "text",
          placeholder: "Insira o consumo médio mensal do microondas.",
          attributeTo: "monthlyPowerConsumption",
          optional: false,
        },
      ],
    },
  },
  {
    name: "Roteador",
    icon: (props: any) => (
      <MaterialIcons name="router" size={24} color="black" {...props} />
    ),
    type: "router",
    displayName: "Roteador",
    //inmetroCode: applianceTypeMap['router'],
    manualInput: {
      only: false,
      fields: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Insira o nome do roteador.",
          attributeTo: "name",
          optional: false,
        },
        {
          label: "Localização",
          type: "text",
          placeholder: "Insira a localização do roteador.",
          attributeTo: "location",
          optional: true,
        },
        {
          label: "Potência de consumo",
          type: "text",
          placeholder: "Insira a potência de consumo do roteador.",
          attributeTo: "powerConsumption",
          optional: false,
        },
      ],
    },
  },
  {
    name: "Computador",
    icon: (props: any) => (
      <MaterialIcons name="computer" size={24} color="black" {...props} />
    ),
    type: "computer",
    displayName: "Computador",
    //inmetroCode: applianceTypeMap['computer'],
    manualInputOnly: true,
    manualInput: {
      only: true,
      fields: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Insira o nome do computador.",
          attributeTo: "name",
          optional: false,
        },
        {
          label: "Localização",
          type: "text",
          placeholder: "Insira a localização do computador.",
          attributeTo: "location",
          optional: true,
        },
        {
          label: "Potência da fonte",
          type: "text",
          placeholder: "Insira a potência da fonte do computador.",
          attributeTo: "power",
          optional: false,
        },
        {
          label: "Tempo médio de uso diário",
          type: "text",
          placeholder: "Insira o tempo de uso diário do computador.",
          attributeTo: "dailyUseTime",
          optional: false,
        },
      ],
    },
  },
];
