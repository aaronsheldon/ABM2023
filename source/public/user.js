(
    async () => {
        window.addEventListener(
            "load",
            (_) => {

                // Element handles
                const emailinput = document.getElementById("emailinput");
                const passwordinput = document.getElementById("passwordinput");
                const submitinput = document.getElementById("submitinput");
                const statusoutput = document.getElementById("statusoutput");

                // Handle email credential inputs
                submitinput.addEventListener(
                    'click',
                    (event) => {

                        // Sanity check email before posting to api
                        const payload = {
                            email: emailinput.value || "",
                            password: passwordinput.value || ""
                        };

                        // Build the fetch
                        const options = {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify(payload)
                        };

                        // Dispatch to api
                        fetch("api/users", options)
                        .then((response) => { return response.json();})
                        .then(
                            (data) => {
                                statusoutput.appendChild(document.createElement("p").appendChild(document.createTextNode(data.status)));
                            }
                        )
                    }
                )
            }
        );
    }
)();
