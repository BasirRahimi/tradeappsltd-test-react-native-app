import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { createJob, setCurrentJobId } from "../../Store.js";

export default function CreateJob({ navigation }) {
    const [job, setJob] = useState({
        title: "",
        location: "",
        salary: "",
        company: "",
        description: "",
    });

    const dispatch = useDispatch();

    const saveHandler = () => {
        // validate inputs
        if (!job.title) {
            alert("Role name cannot be empty");
            return;
        }
        if (job.salary && isNaN(job.salary)) {
            alert("Salary must be a number");
            return;
        }

        dispatch(createJob(job)).then((data) => {
            // remove current page from stack
            navigation.pop();

            // navigate to the new job page
            dispatch(setCurrentJobId(data.id));
            navigation.navigate("SingleJob");
        });
    };

    const inputChangeHandler = (text, field) => {
        setJob({ ...job, [field]: text });
    };

    return (
        <View style={styles.container}>
            <View style={styles.jobDetails}>
                <Text style={styles.title}>Creating Role: {job.title}</Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.label}>Role Name: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={job.title}
                                onChangeText={(text) =>
                                    inputChangeHandler(text, "title")
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Location: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={job.location}
                                onChangeText={(text) =>
                                    inputChangeHandler(text, "location")
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Salary (£): </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={job.salary}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    inputChangeHandler(text, "salary")
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Company: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={job.company}
                                onChangeText={(text) =>
                                    inputChangeHandler(text, "company")
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Description: </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={job.description}
                                multiline={true}
                                onChangeText={(text) =>
                                    inputChangeHandler(text, "description")
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => saveHandler()}
                >
                    <Text style={styles.buttonText}>Save</Text>
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
    form: {
        gap: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
    },
    inputContainer: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    input: {
        margin: 0,
        fontSize: 16,
    },
});
