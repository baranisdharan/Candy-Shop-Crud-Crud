async function saveToCrudCrud(event) {
    try {
        event.preventDefault();
        let form = document.getElementById('form');
        let candyname = event.target.candyname.value
        let description = event.target.description.value;
        let sellingprice = event.target.sellingprice.value;
        let quantity = event.target.quantity.value;
        let products = {
            candyname,
            description,
            sellingprice,
            quantity
        };
        const response = await axios.post("https://crudcrud.com/api/77341febf1d14946a7952e2a2f35f8a2/products", products);
        showExpenseDetailsOnScreen(response.data);
    } catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>";
        console.log(err);
    }
}

async function showExpenseDetailsOnScreen(products) {
    try {
        let parent = document.getElementById('list-of-items');
        let child = document.createElement('li');
        child.textContent = `${products.candyname}---${products.description}---${products.sellingprice}---${products.quantity}`;

        let BuyOne = createBuyButton(products, 1);
        let BuyTwo = createBuyButton(products, 2);
        let BuyThree = createBuyButton(products, 3);

        parent.appendChild(child);
        child.appendChild(BuyOne);
        child.appendChild(BuyTwo);
        child.appendChild(BuyThree);
        child.classList = "list-group-item fw-bold";
        parent.classList = "mb-3 mt-3 fs-4";
        form.reset();
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(products) {
    try {
        const productId = products._id;
        const response = await axios.put(`https://crudcrud.com/api/77341febf1d14946a7952e2a2f35f8a2/products/${productId}`, products);
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createBuyButton(products, quantityToBuy) {
    let button = document.createElement('input');
    button.type = 'button';
    button.value = `Buy ${quantityToBuy}`;
    button.classList = "btn btn-danger ms-2 rounded-pill";
    button.onclick = async () => {
        if (products.quantity >= quantityToBuy) {
            products.quantity -= quantityToBuy;
            await updateProduct(products);
            button.parentNode.textContent = `${products.candyname}---${products.description}---${products.sellingprice}---${products.quantity}`;
            if (products.quantity === 0) {
                button.disabled = true;
            }
        }
    };
    return button;
}

window.addEventListener("DOMContentLoaded", async (e) => {
    try {
        let response = await axios.get("https://crudcrud.com/api/77341febf1d14946a7952e2a2f35f8a2/products");
        for (let i = 0; i < response.data.length; i++) {
            showExpenseDetailsOnScreen(response.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
});
