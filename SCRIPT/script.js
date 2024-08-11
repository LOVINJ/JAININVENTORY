const adminUser = { username: "ADMIN", password: "LOVIN" };
let currentStock = 0;
const activities = []; // To keep track of today's activities

// Sample data for dropdowns
const vehicles = ["Vehicle 1", "Vehicle 2"];
const items = ["Item 1", "Item 2"];

function populateDropdowns() {
    const vehicleDropdowns = document.querySelectorAll('#vehicle-no, #vehicle-no-out, #report-filter-vehicle');
    const itemDropdowns = document.querySelectorAll('#item-name, #item-name-out, #report-filter-item');

    vehicleDropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="ALL">ALL</option>'; // Add ALL option
        vehicles.forEach(vehicle => {
            const option = document.createElement("option");
            option.text = vehicle;
            dropdown.add(option);
        });
    });

    itemDropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="ALL">ALL</option>'; // Add ALL option
        items.forEach(item => {
            const option = document.createElement("option");
            option.text = item;
            dropdown.add(option);
        });
    });
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUser.username && password === adminUser.password) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
        populateDropdowns();
        document.getElementById('current-date').innerText = getCurrentDate();
    } else {
        alert('Invalid login credentials.');
    }
}

function logout() {
    document.getElementById('app-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

function showStockIn() {
    document.getElementById('stock-in-form').style.display = 'block';
    document.getElementById('stock-out-form').style.display = 'none';
}

function showStockOut() {
    document.getElementById('stock-in-form').style.display = 'none';
    document.getElementById('stock-out-form').style.display = 'block';
}

function addStock(type) {
    const vehicleNo = document.getElementById(type === 'in' ? 'vehicle-no' : 'vehicle-no-out').value;
    const itemName = document.getElementById(type === 'in' ? 'item-name' : 'item-name-out').value;
    const quantity = document.getElementById(type === 'in' ? 'quantity' : 'quantity-out').value;

    if (vehicleNo === 'ALL' || itemName === 'ALL' || quantity <= 0) {
        alert("Please fill out all fields.");
        return;
    }

    currentStock += type === 'in' ? parseInt(quantity) : -parseInt(quantity);
    document.getElementById('current-stock-info').innerText = currentStock;

    activities.push({ type, itemName, quantity, vehicleNo, date: getCurrentDate() });
    updateActivityLog();

    document.getElementById('stock-in-form').style.display = 'none';
    document.getElementById('stock-out-form').style.display = 'none';
}

function updateActivityLog() {
    const activityList = document.getElementById('todays-activity');
    activityList.innerHTML = '';
    activities.forEach(activity => {
        if (activity.date === getCurrentDate()) {
            const listItem = document.createElement('li');
            listItem.innerText = `${activity.type === 'in' ? 'Stock In' : 'Stock Out'} - Item: ${activity.itemName}, Quantity: ${activity.quantity}, Vehicle No.: ${activity.vehicleNo}`;
            activityList.appendChild(listItem);
        }
    });
}

function generateReport(type) {
    document.getElementById('report-options').style.display = 'block';
    document.getElementById('single-day-options').style.display = type === 'day' ? 'block' : 'none';
    document.getElementById('month-options').style.display = type === 'month' ? 'block' : 'none';
    document.getElementById('custom-options').style.display = type === 'custom' ? 'block' : 'none';
}

function downloadReport() {
    // Sample data for the report (Replace with actual data based on filters)
    const data = [
        { Date: "01/01/2024", Owner: "Owner 1", VehicleNo: "Vehicle 1", Item: "Item 1", Quantity: 10 },
        { Date: "01/01/2024", Owner: "Owner 2", VehicleNo: "Vehicle 2", Item: "Item 2", Quantity: 5 }
    ];

    // Create a new workbook and add a worksheet
    const wb = XLS
