import { StyleSheet, Text, View } from "react-native";
import { formatSalary } from "../helpers";
export default function JobCard(item, navigation) {
    item = item.item;
    return (
        <View style={styles.jobCard}>
            <Text style={styles.title}>{item.title}</Text>
            {item.location && (
                <Text style={styles.location}>City: {item.location}</Text>
            )}
            {item.salary && (
                <Text style={styles.salary}>
                    Salary: {formatSalary(item.salary)}
                </Text>
            )}
            {item.company && (
                <Text style={styles.company}>Company: {item.company}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    jobCard: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
    },
    salary: {
        fontSize: 16,
    },
    company: {
        fontSize: 16,
    },
});
