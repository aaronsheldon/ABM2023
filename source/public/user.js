(
    async () => {
        window.addEventListener(
            "load",
            (_) => {
                //Element handles
                const emailinput = document.getElementById("emailinput");
                const passwordinput = document.getElementById("passwordinput");

                //Handle email credential inputs
                emailinput.addEventListener(
                    'click',
                    (event) => {
                        //Sanity check email before posting to api
                        const options = {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify({value1: event.target.value})
                        }

                        //Dispatch to api
                        fetch("api/users", options)
                        .then((response) => { return response.json();})
                        .then(
                            (data) => {
                                while (emailinput.firstChild) {emailinput.removeChild(emailinput.firstChild);}
                                data.email.foreach((v) => {emailinput.insertRow().insertCell().append(v.toString());});
                            }
                        )

                    }
                )

                //Handle password credential inputs
                passwordinput.addEventListener(
                    'click',
                    (event) => {
                        //Sanity check password before posting to api
                        const options = {
                            mehtod: "POST",
                            headers: {
                                "Accept": "application/json",
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify({value2: event.target.value})
                        }

                        //Dispatch to api
                        fetch("api/users", options)
                        .then((response) => { return response.json();})
                        .then(
                            (data) => {
                                while (passwordinput.firstChild) {passwordinput.removeChild(passwordinput.firstChild);}
                                data.password.foreach((v) => {passwordinput.insertRow().insertCell().append(v.toString());})
                            }
                        );

                    }
                )
            }
        );
    }
)();
