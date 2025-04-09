import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps;

export const Input: React.FC<Props> = (props) => {
    const { ...rest } = props;

    return (
        <TextInput style={[styles.input]} placeholderTextColor="#bbb" {...rest}></TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        padding: 10,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#00000011',
        borderRadius: 10,
   }
})