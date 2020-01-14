pragma solidity ^0.5.16;
contract Ewaste{
// Variables
uint public U_ID = 1000;
uint public P_ID = 1;
// Structs
struct Products{
  string productName;
  string category;
  string description;
  uint manufactureId;
  uint price;
  uint recyclerID;
  bool status;
}
struct Users{
 address payable userAddress;
 string userName;
 string contactAddress;
 uint accountType;
//  uint MyProducts;
}
// Mappings
mapping(uint => Products)public Product;
mapping(uint => Users) public User;
mapping (address => uint) public UserID;
//Modifiers
modifier onlyMan() {
  require(User[UserID[msg.sender]].userAddress == msg.sender && User[UserID[msg.sender]].accountType == 1,'only Manufacture');
  _;
}
modifier onlyRec() {
  require(User[UserID[msg.sender]].userAddress == msg.sender && User[UserID[msg.sender]].accountType == 2,'only Recycler');
  _;
}
modifier recycler(uint pID) {
  require(Product[pID].recyclerID == 0 && Product[pID].status == true,'Recycler Already Asigned ');
  _;
}
modifier buyProduct(uint pID) {
  require(Product[pID].manufactureId == UserID[msg.sender],'its Not your Product');
  require(Product[pID].status == false,'Not a Waste');
  _;
}
//Functons
function Registration (string memory userName,string memory contactAddress,uint accountType) public{
    require(UserID[msg.sender]==0,'User Already Registred');
    require(accountType == 1 || accountType == 2 , ' Invalid accountType');
  User[U_ID].userAddress = msg.sender;
  User[U_ID].userName = userName;
  User[U_ID].contactAddress = contactAddress;
  User[U_ID].accountType = accountType;
  UserID[msg.sender] = U_ID;
  U_ID++;
}
function CreateProduct (string calldata _name,string calldata _category,string calldata _description,uint _price) external onlyMan() {
  Product[P_ID].manufactureId = UserID[msg.sender];
  Product[P_ID].productName = _name;
  Product[P_ID].category = _category;
  Product[P_ID].description = _description;
  Product[P_ID].price = _price;
  Product[P_ID].status = true;
  P_ID++;
} 
function SortRecycler(uint _P_ID) public onlyRec() recycler(_P_ID)  {
  Product[_P_ID].recyclerID = UserID[msg.sender];
  Product[_P_ID].price = div(Product[_P_ID].price,3);
  Product[_P_ID].status = false;
}
function BuyProduct(uint _P_ID) public payable onlyMan() buyProduct(_P_ID){
  require(Product[_P_ID].price == msg.value,'Incorret Price');
  User[Product[_P_ID].recyclerID].userAddress.transfer(Product[_P_ID].price);
  Product[_P_ID].recyclerID = 0;
  Product[_P_ID].status = true;
}

function div(uint256 a, uint256 b) internal pure returns (uint256) {
  require(b > 0, "division by zero");
  uint256 c = a / b;
  return c;
}
}