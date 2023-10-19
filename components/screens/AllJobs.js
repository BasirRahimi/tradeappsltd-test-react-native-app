import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setCurrentJobId } from "../../Store.js";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import JobCard from "../JobCard.js";

export default function AllJobs({ navigation }) {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs);
    const [jobsRefreshing, setJobsRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchJobs());
    }, []);

    const jobPressedHandler = (id) => {
        dispatch(setCurrentJobId(id));
        navigation.navigate("SingleJob");
    };

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={() => {
                    setJobsRefreshing(true);
                    dispatch(fetchJobs()).then(() => {
                        setJobsRefreshing(false);
                    });
                }}
                refreshing={jobsRefreshing}
                data={jobs}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <TouchableOpacity
                        onPress={() => {
                            jobPressedHandler(item.item.id);
                        }}
                    >
                        <JobCard item={item.item} />
                    </TouchableOpacity>
                )}
            />

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("CreateJob")}
                >
                    <Text style={styles.buttonText}>Add New Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        gap: 10,
        marginBottom: 200,
    },
    button: {
        backgroundColor: "#0052cc",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
