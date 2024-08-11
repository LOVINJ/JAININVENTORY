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
            option.value = vehicle;
            option.text = vehicle;
            dropdown.add(option);
        });
    });

    itemDropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="ALL">ALL</option>'; // Add ALL option
        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
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
        alert("Invalid login credentials!");
    }
}

function logout() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
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
    // Sample data for the report (You would generate this dynamically based on filters)
    const data = [
        { Date: "01/01/2024", Owner: "Owner 1", VehicleNo: "Vehicle 1", Item: "Item 1", Quantity: 10 },
        { Date: "01/01/2024", Owner: "Owner 2", VehicleNo: "Vehicle 2", Item: "Item 2", Quantity: 5 }
    ];

    // Create a new workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Report");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "report.xlsx");
}

function showVehicleMaster() {
    document.getElementById('vehicle-master').style.display = 'block';
    document.getElementById('item-master').style.display = 'none';
    document.getElementById('user-master').style.display = 'none';
}

function showItemMaster() {
    document.getElementById('vehicle-master').style.display = 'none';
    document.getElementById('item-master').style.display = 'block';
    document.getElementById('user-master').style.display = 'none';
}

function showUserMaster() {
    document.getElementById('vehicle-master').style.display = 'none';
    document.getElementById('item-master').style.display = 'none';
    document.getElementById('user-master').style.display = 'block';
}

function addVehicle() {
    const vehicleNo = document.getElementById('vehicle-no-master').value;
    const ownerName = document.getElementById('owner-name').value;
    alert(`Vehicle Added: ${vehicleNo}, Owner: ${ownerName}`);
}

function addItem() {
    const itemName = document.getElementById('item-name-master').value;
    alert(`Item Added: ${itemName}`);
}

function addUser() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    alert(`User Added: ${newUsername}`);
}

// Event listener for login
document.getElementById('login-form').addEventListener('submit', login);
