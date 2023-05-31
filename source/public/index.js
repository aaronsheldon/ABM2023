/*(
    async () => {
        window.addEventListener(
            "load",
            (_) => {

                // Element handles
                const pushnumbers = document.getElementById("pushnumbers").tBodies[0];
                const pushnumber = document.getElementById("pushnumber");

                // Handle number change
                pushnumber.addEventListener(
                    "change",
                    (event) => {

                        // Sanity check only numbers before posting to api
                        if (isFinite(event.target.value)) {
                            const options = {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ value: event.target.value })
                            };

                            // Dispatch to api
                            fetch("api/number", options)
                            .then((response) => { return response.json(); })
                            .then(
                                (data) => {
                                    while (pushnumbers.firstChild) { pushnumbers.removeChild(pushnumbers.firstChild); }
                                    data.values.forEach((v) => { pushnumbers.insertRow().insertCell().append(v.toString()); });
                                }
                            );
                        }
                    }
                );

                // Initial data load
                fetch("api/numbers")
                .then((response) => { return response.json(); })
                .then((data) => { data.values.forEach((v) => { pushnumbers.insertRow().insertCell().append(v.toString()); }); });
            }
        );
    }
)();*/
