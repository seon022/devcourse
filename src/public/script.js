document
    .getElementById("customerForm")
    ?.addEventListener("submit", async (e) => {
        const nameEl = document.getElementById("name");
        const addressEl = document.getElementById("address");
        const emailEl = document.getElementById("email");
        const msgEl = document.getElementById("msg");
        msgEl.classList.remove("mt30");
        const customerData = {
            name: nameEl.value,
            address: addressEl.value,
            email: emailEl.value,
        };
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/customers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(customerData),
                }
            );

            if (!response.ok) {
                throw new Error("에러입니다.");
            }
            const result = await response.json();
            console.log("회원정보 등록: ", result);
            if (msgEl) {
                msgEl.classList.add("mt30");
                msgEl.textContent = "회원 등록되었습니다.";
                setTimeout(() => {
                    msgEl.classList.remove("mt30");
                }, 3000);
            }

            //  clear
            const formInput = document.querySelectorAll("#customerForm input");
            formInput.value = "";
        } catch (error) {
            console.error("회원 등록 중 에러:", error);
            if (msgEl) {
                msgEl.textContent =
                    "회원 등록 중 에러가 발생했습니다. 다시 등록해주세요.";
            }
        }
    });
