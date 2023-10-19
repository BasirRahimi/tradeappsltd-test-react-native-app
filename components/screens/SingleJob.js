import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { formatSalary } from "../../helpers.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "../../Store.js";

export default function SingleJob({ navigation }) {
    const job = useSelector((state) =>
        state.jobs.find((job) => job.id === state.currentJobId)
    );

    const dispatch = useDispatch();

    const deleteJobHandler = (id) => {
        dispatch(deleteJob(id));
        navigation.navigate("AllJobs");
    };

    return (
        <View style={styles.container}>
            <View style={styles.jobDetails}>
                <Text style={styles.title}>Role: {job.title}</Text>
                {job.location && (
                    <Text style={styles.location}>City: {job.location}</Text>
                )}
                {job.salary && (
                    <Text style={styles.salary}>
                        Salary: {formatSalary(job.salary)}
                    </Text>
                )}
                {job.company && (
                    <Text style={styles.company}>Company: {job.company}</Text>
                )}
                {job.description && (
                    <Text style={styles.description}>{job.description}</Text>
                )}
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("EditJob")}
                >
                    <Text style={styles.buttonText}>Edit Job</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDanger}
                    onPress={() => deleteJobHandler(job.id)}
                >
                    <Text style={styles.buttonText}>Delete Job</Text>
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    button: {
        backgroundColor: "#0052cc",
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
    },
    buttonDanger: {
        backgroundColor: "#cc0000",
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
        gap: 10,
    },
    jobDetails: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
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
    company: {
        fontSize: 16,
    },
    description: {
        fontSize: 16,
    },
});
