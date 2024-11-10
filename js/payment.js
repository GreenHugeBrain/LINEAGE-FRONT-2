window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical",
      color: "gold",
      label: "paypal",
    },
    message: {
      amount: 100,
    },

    async createOrder() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch("https://lineage-api.onrender.com/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            cart: [
              {
                id: "2",
                quantity: "20",
              },
            ],
          }),
        });

        const orderData = await response.json();

        if (orderData.id) {
          return orderData.id;
        }
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      } catch (error) {
        console.error(error);
        resultMessage(`Could not initiate PayPal Checkout... You are not logged in!<br><br>${error}`);
      }
    },

    async onApprove(data, actions) {
      try {
        const response = await fetch(`https://lineage-api.onrender.com/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          return actions.restart();
        } else if (errorDetail) {
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
          
          // Show a SweetAlert2 alert for a successful transaction
          Swal.fire({
            title: 'Payment Successful!',
            text: `Transaction ID: ${transaction.id}\nStatus: ${transaction.status}`,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'swal2-confirm',
            },
          });
          
          console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
        }
      } catch (error) {
        console.error(error);
        resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`);
      }
    },
  })
  .render("#paypal-button-container");

// Example function to show a result to the user.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}