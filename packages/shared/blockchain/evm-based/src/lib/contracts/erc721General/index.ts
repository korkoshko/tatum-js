import { Abi, ContractAbi } from '../common.contracts'

const abi: Abi[] = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      { internalType: 'string', name: 'symbol_', type: 'string' },
      {
        internalType: 'bool',
        name: 'publicMint',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'to', type: 'address[]' },
      {
        internalType: 'uint256[]',
        name: 'tokenId',
        type: 'uint256[]',
      },
      { internalType: 'string[]', name: 'uri', type: 'string[]' },
    ],
    name: 'mintMultiple',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      { internalType: 'string', name: 'uri', type: 'string' },
    ],
    name: 'mintWithTokenURI',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
]

const bytecode =
  '60806040523480156200001157600080fd5b5060405162003248380380620032488339810160408190526200003491620002b3565b82826200004133620000ea565b60016200004f8382620003c6565b5060026200005e8282620003c6565b5050600c805460ff1916905550620000786000336200013a565b620000a47f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6336200013a565b620000d07f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336200013a565b600e805460ff191691151591909117905550620004929050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6200014682826200014a565b5050565b6000828152600d602090815260408083206001600160a01b038516845290915290205460ff1662000146576000828152600d602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001aa3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200021657600080fd5b81516001600160401b0380821115620002335762000233620001ee565b604051601f8301601f19908116603f011681019082821181831017156200025e576200025e620001ee565b816040528381526020925086838588010111156200027b57600080fd5b600091505b838210156200029f578582018301518183018401529082019062000280565b600093810190920192909252949350505050565b600080600060608486031215620002c957600080fd5b83516001600160401b0380821115620002e157600080fd5b620002ef8783880162000204565b945060208601519150808211156200030657600080fd5b50620003158682870162000204565b925050604084015180151581146200032c57600080fd5b809150509250925092565b600181811c908216806200034c57607f821691505b6020821081036200036d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620003c157600081815260208120601f850160051c810160208610156200039c5750805b601f850160051c820191505b81811015620003bd57828155600101620003a8565b5050505b505050565b81516001600160401b03811115620003e257620003e2620001ee565b620003fa81620003f3845462000337565b8462000373565b602080601f831160018114620004325760008415620004195750858301515b600019600386901b1c1916600185901b178555620003bd565b600085815260208120601f198616915b82811015620004635788860151825594840194600190910190840162000442565b5085821015620004825787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b612da680620004a26000396000f3fe60806040526004361061020f5760003560e01c80636352211e11610118578063a22cb465116100a0578063d547741f1161006f578063d547741f146105fa578063e63ab1e91461061a578063e985e9c51461064e578063eb79554914610697578063f2fde38b146106b757600080fd5b8063a22cb46514610573578063b88d4fde14610593578063c87b56dd146105a6578063d5391393146105c657600080fd5b80638462151c116100e75780638462151c146104de5780638da5cb5b1461050b57806391d148541461052957806395d89b4114610549578063a217fddf1461055e57600080fd5b80636352211e1461047457806370a0823114610494578063715018a6146104b45780638456cb59146104c957600080fd5b806336568abe1161019b57806342966c681161016a57806342966c68146103dc5780634f6ccce7146103fc57806350bb4e7f1461041c5780635a9c9eb81461043c5780635c975abb1461045c57600080fd5b806336568abe146103745780633f4ba83a14610394578063423f6cef146103a957806342842e0e146103c957600080fd5b806318160ddd116101e257806318160ddd146102c557806323b872dd146102e4578063248a9ca3146103045780632f2ff15d146103345780632f745c591461035457600080fd5b806301ffc9a71461021457806306fdde0314610249578063081812fc1461026b578063095ea7b3146102a3575b600080fd5b34801561022057600080fd5b5061023461022f366004612392565b6106d7565b60405190151581526020015b60405180910390f35b34801561025557600080fd5b5061025e6106e8565b60405161024091906123ff565b34801561027757600080fd5b5061028b610286366004612412565b61077a565b6040516001600160a01b039091168152602001610240565b3480156102af57600080fd5b506102c36102be366004612447565b610807565b005b3480156102d157600080fd5b506009545b604051908152602001610240565b3480156102f057600080fd5b506102c36102ff366004612471565b61091c565b34801561031057600080fd5b506102d661031f366004612412565b6000908152600d602052604090206001015490565b34801561034057600080fd5b506102c361034f3660046124ad565b61094e565b34801561036057600080fd5b506102d661036f366004612447565b6109dd565b34801561038057600080fd5b506102c361038f3660046124ad565b610a73565b3480156103a057600080fd5b506102c3610aed565b3480156103b557600080fd5b506102c36103c4366004612447565b610b3d565b6102c36103d7366004612471565b610b58565b3480156103e857600080fd5b506102c36103f7366004612412565b610b73565b34801561040857600080fd5b506102d6610417366004612412565b610bed565b34801561042857600080fd5b50610234610437366004612598565b610c80565b34801561044857600080fd5b506102346104573660046126fe565b610cf1565b34801561046857600080fd5b50600c5460ff16610234565b34801561048057600080fd5b5061028b61048f366004612412565b610de5565b3480156104a057600080fd5b506102d66104af3660046127d8565b610e5c565b3480156104c057600080fd5b506102c3610ee3565b3480156104d557600080fd5b506102c3610f47565b3480156104ea57600080fd5b506104fe6104f93660046127d8565b610f95565b60405161024091906127f3565b34801561051757600080fd5b506000546001600160a01b031661028b565b34801561053557600080fd5b506102346105443660046124ad565b611055565b34801561055557600080fd5b5061025e611080565b34801561056a57600080fd5b506102d6600081565b34801561057f57600080fd5b506102c361058e366004612837565b61108f565b6102c36105a1366004612873565b611153565b3480156105b257600080fd5b5061025e6105c1366004612412565b61118b565b3480156105d257600080fd5b506102d67f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b34801561060657600080fd5b506102c36106153660046124ad565b611196565b34801561062657600080fd5b506102d67f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b34801561065a57600080fd5b506102346106693660046128ef565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b3480156106a357600080fd5b506102c36106b2366004612919565b611216565b3480156106c357600080fd5b506102c36106d23660046127d8565b611258565b60006106e282611320565b92915050565b6060600180546106f7906129a0565b80601f0160208091040260200160405190810160405280929190818152602001828054610723906129a0565b80156107705780601f1061074557610100808354040283529160200191610770565b820191906000526020600020905b81548152906001019060200180831161075357829003601f168201915b5050505050905090565b600061078582611345565b6107eb5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600560205260409020546001600160a01b031690565b600061081282610de5565b9050806001600160a01b0316836001600160a01b03160361087f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016107e2565b336001600160a01b038216148061089b575061089b8133610669565b61090d5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016107e2565b6109178383611362565b505050565b610927335b826113d0565b6109435760405162461bcd60e51b81526004016107e2906129da565b6109178383836114ba565b6000828152600d602052604090206001015461096b905b33611055565b6109cf5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201526e0818591b5a5b881d1bc819dc985b9d608a1b60648201526084016107e2565b6109d98282611665565b5050565b60006109e883610e5c565b8210610a4a5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016107e2565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b6001600160a01b0381163314610ae35760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016107e2565b6109d982826116eb565b610b177f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33611055565b610b335760405162461bcd60e51b81526004016107e290612a2b565b610b3b611752565b565b6109d9338383604051806020016040528060008152506117e5565b61091783838360405180602001604052806000815250611153565b610b7c33610921565b610be15760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201526f1b995c881b9bdc88185c1c1c9bdd995960821b60648201526084016107e2565b610bea81611818565b50565b6000610bf860095490565b8210610c5b5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016107e2565b60098281548110610c6e57610c6e612a7a565b90600052602060002001549050919050565b600e5460009060ff16610cd357610cb77f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633611055565b610cd35760405162461bcd60e51b81526004016107e290612a90565b610cdd8484611821565b610ce7838361183b565b5060019392505050565b600e5460009060ff16610d4457610d287f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633611055565b610d445760405162461bcd60e51b81526004016107e290612a90565b60005b8451811015610dda57610d8c858281518110610d6557610d65612a7a565b6020026020010151858381518110610d7f57610d7f612a7a565b6020026020010151611821565b610dc8848281518110610da157610da1612a7a565b6020026020010151848381518110610dbb57610dbb612a7a565b602002602001015161183b565b80610dd281612af4565b915050610d47565b506001949350505050565b6000818152600360205260408120546001600160a01b0316806106e25760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016107e2565b60006001600160a01b038216610ec75760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016107e2565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b03163314610f3d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107e2565b610b3b60006118bf565b610f717f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33611055565b610f8d5760405162461bcd60e51b81526004016107e290612a2b565b610b3b61190f565b60606000610fa283610e5c565b67ffffffffffffffff811115610fba57610fba6124d9565b604051908082528060200260200182016040528015610fe3578160200160208202803683370190505b50905060005b610ff284610e5c565b81101561104e576001600160a01b0384166000908152600760209081526040808320848452909152902054825183908390811061103157611031612a7a565b60209081029190910101528061104681612af4565b915050610fe9565b5092915050565b6000918252600d602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600280546106f7906129a0565b336001600160a01b038316036110e75760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016107e2565b3360008181526006602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61115d33836113d0565b6111795760405162461bcd60e51b81526004016107e2906129da565b611185848484846117e5565b50505050565b60606106e28261198a565b6000828152600d60205260409020600101546111b190610965565b610ae35760405162461bcd60e51b815260206004820152603060248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201526f2061646d696e20746f207265766f6b6560801b60648201526084016107e2565b61118533858585858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506117e592505050565b6000546001600160a01b031633146112b25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107e2565b6001600160a01b0381166113175760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016107e2565b610bea816118bf565b60006001600160e01b03198216637965db0b60e01b14806106e257506106e282611af8565b6000908152600360205260409020546001600160a01b0316151590565b600081815260056020526040902080546001600160a01b0319166001600160a01b038416908117909155819061139782610de5565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006113db82611345565b61143c5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016107e2565b600061144783610de5565b9050806001600160a01b0316846001600160a01b031614806114825750836001600160a01b03166114778461077a565b6001600160a01b0316145b806114b257506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166114cd82610de5565b6001600160a01b0316146115355760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016107e2565b6001600160a01b0382166115975760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016107e2565b6115a2838383611b1d565b6115ad600082611362565b6001600160a01b03831660009081526004602052604081208054600192906115d6908490612b0d565b90915550506001600160a01b0382166000908152600460205260408120805460019290611604908490612b20565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b61166f8282611055565b6109d9576000828152600d602090815260408083206001600160a01b03851684529091529020805460ff191660011790556116a73390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6116f58282611055565b156109d9576000828152600d602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600c5460ff1661179b5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016107e2565b600c805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6117f08484846114ba565b6117fc84848484611b6e565b6111855760405162461bcd60e51b81526004016107e290612b33565b610bea81611c64565b6109d9828260405180602001604052806000815250611ca4565b61184482611345565b6118a75760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016107e2565b6000828152600b602052604090206109178282612bd3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600c5460ff16156119555760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016107e2565b600c805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586117c83390565b606061199582611345565b6119fb5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b60648201526084016107e2565b6000828152600b602052604081208054611a14906129a0565b80601f0160208091040260200160405190810160405280929190818152602001828054611a40906129a0565b8015611a8d5780601f10611a6257610100808354040283529160200191611a8d565b820191906000526020600020905b815481529060010190602001808311611a7057829003601f168201915b505050505090506000611aab60408051602081019091526000815290565b90508051600003611abd575092915050565b815115611aef578082604051602001611ad7929190612c93565b60405160208183030381529060405292505050919050565b6114b284611cd7565b60006001600160e01b0319821663780e9d6360e01b14806106e257506106e282611daf565b600c5460ff1615611b635760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016107e2565b610917838383611dff565b60006001600160a01b0384163b15610dda57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611bb2903390899088908890600401612cc2565b6020604051808303816000875af1925050508015611bed575060408051601f3d908101601f19168201909252611bea91810190612cff565b60015b611c4a573d808015611c1b576040519150601f19603f3d011682016040523d82523d6000602084013e611c20565b606091505b508051600003611c425760405162461bcd60e51b81526004016107e290612b33565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506114b2565b611c6d81611eb7565b6000818152600b602052604090208054611c86906129a0565b159050610bea576000818152600b60205260408120610bea9161232e565b611cae8383611f5e565b611cbb6000848484611b6e565b6109175760405162461bcd60e51b81526004016107e290612b33565b6060611ce282611345565b611d465760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016107e2565b6000611d5d60408051602081019091526000815290565b90506000815111611d7d5760405180602001604052806000815250611da8565b80611d878461209d565b604051602001611d98929190612c93565b6040516020818303038152906040525b9392505050565b60006001600160e01b031982166380ac58cd60e01b1480611de057506001600160e01b03198216635b5e139f60e01b145b806106e257506301ffc9a760e01b6001600160e01b03198316146106e2565b6001600160a01b038316611e5a57611e5581600980546000838152600a60205260408120829055600182018355919091527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0155565b611e7d565b816001600160a01b0316836001600160a01b031614611e7d57611e7d838261219e565b6001600160a01b038216611e94576109178161223b565b826001600160a01b0316826001600160a01b0316146109175761091782826122ea565b6000611ec282610de5565b9050611ed081600084611b1d565b611edb600083611362565b6001600160a01b0381166000908152600460205260408120805460019290611f04908490612b0d565b909155505060008281526003602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b038216611fb45760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016107e2565b611fbd81611345565b1561200a5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016107e2565b61201660008383611b1d565b6001600160a01b038216600090815260046020526040812080546001929061203f908490612b20565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6060816000036120c45750506040805180820190915260018152600360fc1b602082015290565b8160005b81156120ee57806120d881612af4565b91506120e79050600a83612d32565b91506120c8565b60008167ffffffffffffffff811115612109576121096124d9565b6040519080825280601f01601f191660200182016040528015612133576020820181803683370190505b5090505b84156114b257612148600183612b0d565b9150612155600a86612d46565b612160906030612b20565b60f81b81838151811061217557612175612a7a565b60200101906001600160f81b031916908160001a905350612197600a86612d32565b9450612137565b600060016121ab84610e5c565b6121b59190612b0d565b600083815260086020526040902054909150808214612208576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b60095460009061224d90600190612b0d565b6000838152600a60205260408120546009805493945090928490811061227557612275612a7a565b90600052602060002001549050806009838154811061229657612296612a7a565b6000918252602080832090910192909255828152600a909152604080822084905585825281205560098054806122ce576122ce612d5a565b6001900381819060005260206000200160009055905550505050565b60006122f583610e5c565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b50805461233a906129a0565b6000825580601f1061234a575050565b601f016020900490600052602060002090810190610bea91905b808211156123785760008155600101612364565b5090565b6001600160e01b031981168114610bea57600080fd5b6000602082840312156123a457600080fd5b8135611da88161237c565b60005b838110156123ca5781810151838201526020016123b2565b50506000910152565b600081518084526123eb8160208601602086016123af565b601f01601f19169290920160200192915050565b602081526000611da860208301846123d3565b60006020828403121561242457600080fd5b5035919050565b80356001600160a01b038116811461244257600080fd5b919050565b6000806040838503121561245a57600080fd5b6124638361242b565b946020939093013593505050565b60008060006060848603121561248657600080fd5b61248f8461242b565b925061249d6020850161242b565b9150604084013590509250925092565b600080604083850312156124c057600080fd5b823591506124d06020840161242b565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612518576125186124d9565b604052919050565b600067ffffffffffffffff83111561253a5761253a6124d9565b61254d601f8401601f19166020016124ef565b905082815283838301111561256157600080fd5b828260208301376000602084830101529392505050565b600082601f83011261258957600080fd5b611da883833560208501612520565b6000806000606084860312156125ad57600080fd5b6125b68461242b565b925060208401359150604084013567ffffffffffffffff8111156125d957600080fd5b6125e586828701612578565b9150509250925092565b600067ffffffffffffffff821115612609576126096124d9565b5060051b60200190565b600082601f83011261262457600080fd5b81356020612639612634836125ef565b6124ef565b82815260059290921b8401810191818101908684111561265857600080fd5b8286015b84811015612673578035835291830191830161265c565b509695505050505050565b600082601f83011261268f57600080fd5b8135602061269f612634836125ef565b82815260059290921b840181019181810190868411156126be57600080fd5b8286015b8481101561267357803567ffffffffffffffff8111156126e25760008081fd5b6126f08986838b0101612578565b8452509183019183016126c2565b60008060006060848603121561271357600080fd5b833567ffffffffffffffff8082111561272b57600080fd5b818601915086601f83011261273f57600080fd5b8135602061274f612634836125ef565b82815260059290921b8401810191818101908a84111561276e57600080fd5b948201945b83861015612793576127848661242b565b82529482019490820190612773565b975050870135925050808211156127a957600080fd5b6127b587838801612613565b935060408601359150808211156127cb57600080fd5b506125e58682870161267e565b6000602082840312156127ea57600080fd5b611da88261242b565b6020808252825182820181905260009190848201906040850190845b8181101561282b5783518352928401929184019160010161280f565b50909695505050505050565b6000806040838503121561284a57600080fd5b6128538361242b565b91506020830135801515811461286857600080fd5b809150509250929050565b6000806000806080858703121561288957600080fd5b6128928561242b565b93506128a06020860161242b565b925060408501359150606085013567ffffffffffffffff8111156128c357600080fd5b8501601f810187136128d457600080fd5b6128e387823560208401612520565b91505092959194509250565b6000806040838503121561290257600080fd5b61290b8361242b565b91506124d06020840161242b565b6000806000806060858703121561292f57600080fd5b6129388561242b565b935060208501359250604085013567ffffffffffffffff8082111561295c57600080fd5b818701915087601f83011261297057600080fd5b81358181111561297f57600080fd5b88602082850101111561299157600080fd5b95989497505060200194505050565b600181811c908216806129b457607f821691505b6020821081036129d457634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6020808252602f908201527f546174756d47656e6572616c3732313a206d757374206861766520706175736560408201526e7220726f6c6520746f20706175736560881b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b6020808252602e908201527f546174756d47656e6572616c3732313a206d7573742068617665206d696e746560408201526d1c881c9bdb19481d1bc81b5a5b9d60921b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600060018201612b0657612b06612ade565b5060010190565b818103818111156106e2576106e2612ade565b808201808211156106e2576106e2612ade565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b601f82111561091757600081815260208120601f850160051c81016020861015612bac5750805b601f850160051c820191505b81811015612bcb57828155600101612bb8565b505050505050565b815167ffffffffffffffff811115612bed57612bed6124d9565b612c0181612bfb84546129a0565b84612b85565b602080601f831160018114612c365760008415612c1e5750858301515b600019600386901b1c1916600185901b178555612bcb565b600085815260208120601f198616915b82811015612c6557888601518255948401946001909101908401612c46565b5085821015612c835787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008351612ca58184602088016123af565b835190830190612cb98183602088016123af565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612cf5908301846123d3565b9695505050505050565b600060208284031215612d1157600080fd5b8151611da88161237c565b634e487b7160e01b600052601260045260246000fd5b600082612d4157612d41612d1c565b500490565b600082612d5557612d55612d1c565b500690565b634e487b7160e01b600052603160045260246000fdfea264697066735822122062de8c36bd12bcef5eaecb892d4a4ccf152ea77a3d7f738f41c4a02fd6a5894564736f6c63430008120033'

export const Erc721Token_General: ContractAbi = {
  abi,
  bytecode,
}
