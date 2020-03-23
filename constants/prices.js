const DailyPrices = [
    {Id:1, Product: "PMS", Price: 141.00, Unit: "ltr"},
    {Id:2, Product: "DPK", Price: 220.00, Unit: "ltr"},
    {Id:3, Product: "AGO", Price: 210.00, Unit: "ltr"},
    {Id:3, Product: "ATK", Price: 156.00, Unit: "ltr"},
    {Id:4, Product: "Bitumen", Price: 47000.00, Unit: "drum"},
    {Id:5, Product: "LPG", Price: 3000.00, Unit: "kg"}
]

const Depots = [{Id: 1, Name: "Lagos"}, {Id: 2, Name: "Warri"}]

const Orders = [{OrderId: "PO68876", Quantity: 33000, Price: 6550500.00, ProductId: 1, ProductName: "PMS", DepositDate: '12/03/2020', Depot: 1, DepotName: "Lagos", Status:"Unconifrmed",
 Programing: [{TruckNo: "KYF34534", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Waybill"},
 {TruckNo: "WER23D3", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Dispatch"},
 {TruckNo: "GDR5642", Quantity: 10000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Ticket"},
 {TruckNo: "DSX5467", Quantity: 5000, Destination: "24, Old Yaba road, Yaba, Lagos", Status: "Programmed"}]},
 {OrderId: "PO84465", Quantity: 33000,  Price: 8550500.00, ProductId: 2, ProductName: "DPK", Depot: 2, DepositDate: '16/03/2020', DepotName: "Lagos", Status: "Confirmed",
 Programing: []},
 {OrderId: "PO80965", Quantity: 33000,  Price: 6550500.00, ProductId: 2, ProductName: "AGO", Depot: 2, DepositDate: '21/03/2020', DepotName: "Lagos", Status: "Unconfirmed",
 Programing: []},
 {OrderId: "PO84224", Quantity: 33000,  Price: 8550500.00, ProductId: 2, ProductName: "LPG", Depot: 2, DepositDate: '18/03/2020', DepotName: "Lagos", Status: "Confirmed",
 Programing: []},
 {OrderId: "PO74465", Quantity: 33000,  Price: 6750500.00, ProductId: 2, ProductName: "ATK", Depot: 2, DepositDate: '20/03/2020', DepotName: "Lagos", Status: "Unconfirmed",
 Programing: []},
 {OrderId: "PO74467", Quantity: 33000,  Price: 6750500.00, ProductId: 2, ProductName: "AGO", Depot: 2, DepositDate: '22/03/2020', DepotName: "Lagos", Status: "Unconfirmed",
 Programing: []},
 {OrderId: "PO74460", Quantity: 33000,  Price: 6750500.00, ProductId: 2, ProductName: "PMS", Depot: 2, DepositDate: '22/03/2020', DepotName: "Lagos", Status: "Unconfirmed",
 Programing: []}]

 const Filters = [{Name: "All", Status: 1}, {Name: "Unconfirmed", Status: 0}, {Name: "Confirmed", Status: 0}]
export default {DailyPrices, Depots, Orders, Filters}
