const DailyPrices = [
    {Id:1, Product: "Gasoline", Price: 141.00, Unit: "ltr"},
    {Id:2, Product: "Gas Oil/Diesel", Price: 229.00, Unit: "ltr"},
    {Id:3, Product: "Kerosene", Price: 156.00, Unit: "ltr"},
    {Id:4, Product: "Bitumen 60/70", Price: 47000.00, Unit: "drum"},
    {Id:5, Product: "LPG", Price: 300.00, Unit: "kg"}
]

const Depots = [{Id: 1, Name: "Apapa"}, {Id: 2, Name: "Delta"}, {Id: 3, Name: "Abuja"}]

const Orders = [{OrderId: "56:34:54:65:43", Quantity: 50000, ProductId: 1, ProductName: "", Depot: 1, DepotName: "", Status:"In Progress",
 Programing: [{TruckNo: "KYF34534", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Waybill"},
 {TruckNo: "KYF34534", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Dispatch"},
 {TruckNo: "KYF34534", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Ticket"},
 {TruckNo: "KYF34534", Quantity: 5000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Programmed"}]},
 {OrderId: "56:34:54:65:44", Quantity: 50000, ProductId: 1, Depot: 1, Status: "Closed",
 Programing: []}]

export default {DailyPrices, Depots, Orders}
