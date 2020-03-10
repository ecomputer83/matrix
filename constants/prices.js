const DailyPrices = [
    {Id:1, Product: "PMS", Price: 141.00, Unit: "ltr"},
    {Id:2, Product: "DPK", Price: 220.00, Unit: "ltr"},
    {Id:3, Product: "AGO", Price: 210.00, Unit: "ltr"},
    {Id:3, Product: "ATK", Price: 156.00, Unit: "ltr"},
    {Id:4, Product: "Bitumen", Price: 47000.00, Unit: "drum"},
    {Id:5, Product: "LPG", Price: 3000.00, Unit: "kg"}
]

const Depots = [{Id: 1, Name: "Lagos"}, {Id: 2, Name: "Warri"}]

const Orders = [{OrderId: "56:34:54:65:43", Quantity: 50000, ProductId: 1, ProductName: "PMS", Depot: 1, DepotName: "Lagos", Status:"In Progress",
 Programing: [{TruckNo: "KYF34534", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Waybill"},
 {TruckNo: "WER23D3", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Dispatch"},
 {TruckNo: "GDR5642", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Ticket"},
 {TruckNo: "DSX5467", Quantity: 5000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Programmed"}]},
 {OrderId: "56:34:54:65:44", Quantity: 50000, ProductId: 2, ProductName: "DPK", Depot: 2, DepotName: "Lagos", Status: "Closed",
 Programing: []}]

export default {DailyPrices, Depots, Orders}
