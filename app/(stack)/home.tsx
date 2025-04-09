import { PageContainer } from "@/components/PageContainer";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    return (
        <SafeAreaView>
            <PageContainer>
                <Text>home</Text>
            </PageContainer>
        </SafeAreaView>
    );
}

export default Home;