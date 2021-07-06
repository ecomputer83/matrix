const DailyPrices = [
    {id:1, product: "PMS", price: 141.00, unit: "ltr"},
    {id:2, product: "DPK", price: 220.00, unit: "ltr"},
    {id:3, product: "AGO", price: 210.00, unit: "ltr"},
    {id:3, product: "ATK", price: 156.00, unit: "ltr"},
    {id:5, product: "LPG", price: 300000.00, unit: "tonne"},
    {id:6, product: "Bitumen", price: 350000.00, unit: "tonne"}
]

const Depots = [{id: 2, name: "Lagos"}, {id: 3, name: "Warri"}]

const Orders = [{orderNo: "PO68876", account: 'ACT00001', quantity: 35000, totalAmount: 6550500.00, ProductId: 1, productName: "PMS", orderDate: '12/03/2020', Depot: 2, depotName: "Lagos", status:1,
 programs: [{truckNo: "KYF34534", quantity: 10000, company: "ABC Company", destination: "24, Old Yaba road, Yaba, Lagos", programDate: '12/03/2020', loadingDate: '14/03/2020', loadingTicketNo: 125, dispatchDate: '15/03/2020', quantityShipped: 10000, waybillDate: '15/03/2020', waybillNo: '6543435'},
 {truckNo: "WER23D3", quantity: 10000,  company: "GHD Company", destination: "24, Old Yaba road, Yaba, Lagos",  programDate: '12/03/2020', loadingDate: '14/03/2020', loadingTicketNo: 143, dispatchDate: '15/03/2020', quantityShipped: 10000},
 {truckNo: "GDR5642", quantity: 10000, company: "DHF Company", destination: "24, Old Yaba road, Yaba, Lagos", programDate: '12/03/2020', loadingDate: '14/03/2020', loadingTicketNo: 343},
 {truckNo: "DSX5467", quantity: 5000, company: "XYZ Company", destination: "24, Old Yaba road, Yaba, Lagos", programDate: '12/03/2020'}], credit: {creditType: 'Bank Deposit'}},
 {orderNo: "PO84465", quantity: 33000, company: "BBA Company",  totalAmount: 8550500.00, ProductId: 2, productName: "DPK", Depot: 2, orderDate: '16/03/2020', depotName: "Lagos", status: 1,
 programs: [], credit: {creditType: 'Bank Deposit'}},
 {orderNo: "PO80965", account: 'ACT00002', quantity: 33000,  totalAmount: 6550500.00, ProductId: 2, productName: "AGO", Depot: 2, orderDate: '21/03/2020', depotName: "Lagos", status: 0,
 programs: []},
 {orderNo: "PO84224", account: 'ACT00003', quantity: 33000,  totalAmount: 8550500.00, ProductId: 2, productName: "LPG", Depot: 2, orderDate: '18/03/2020', depotName: "Lagos", status: 1,
 programs: [], credit: {creditType: 'Credit'}},
 {orderNo: "PO74465", account: 'ACT00001', quantity: 33000,  totalAmount: 6750500.00, ProductId: 2, productName: "ATK", Depot: 2, orderDate: '20/03/2020', depotName: "Lagos", status: 0,
 programs: []},
 {orderNo: "PO74467", account: 'ACT00002', quantity: 33000,  totalAmount: 6750500.00, ProductId: 2, productName: "AGO", Depot: 2, orderDate: '22/03/2020', depotName: "Lagos", status: 0,
 programs: []},
 {orderNo: "PO74460", account: 'ACT00003', quantity: 33000,  totalAmount: 6750500.00, ProductId: 2, productName: "PMS", Depot: 2, orderDate: '22/03/2020', depotName: "Lagos", status: 0,
 programs: []}]

 const Filters = [{Name: "All", Status: 1}, {Name: "Unconfirmed", Status: 0}, {Name: "Confirmed", Status: 0}]

 const Locations = [{Id: 1, Name: "Nigeria"}, {Id: 2, Name: "Ghana"}]

 const Marketers = [{Name: "BKO Olatunde Enterprises", Quantity: 233000}, {Name: "HARTIZ Global", Quantity: 203000},{Name: "Fuel4All International", Quantity: 183000},{Name: "Olaoluwa & Sons", Quantity: 166000},{Name: "God is Good Energy Services", Quantity: 124000}]

 const Accounts = [{key: "ACT00001", label: "A-Z Oil and Gas Services", creditBalance: 4000000, creditLimit: 9000000, stock: 567800.34},{key: "ACT00002", label: "A-Z Oil and Gas Limited", creditBalance: 7000000, creditLimit: 10000000, stock: 578200.86},{key: "ACT00003", label: "A-Z Oil and Gas Nigeria", creditBalance: 4530000, creditLimit: 8000000, stock: 554300.25}]
 export default {DailyPrices, Depots, Orders, Filters, Marketers, Accounts, Locations}
